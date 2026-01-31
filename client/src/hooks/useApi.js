import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Custom hook for API data fetching with loading, error, and caching support.
 * 
 * @param {Function} apiFunction - The API function to call (e.g., getProjects)
 * @param {Object} options - Configuration options
 * @param {any} options.params - Parameters to pass to the API function
 * @param {boolean} options.immediate - Whether to fetch immediately (default: true)
 * @param {number} options.cacheTime - Cache duration in ms (default: 0, no cache)
 * @param {Function} options.onSuccess - Callback on successful fetch
 * @param {Function} options.onError - Callback on error
 * 
 * @returns {Object} { data, loading, error, refetch, reset }
 */
export function useApi(apiFunction, options = {}) {
    const {
        params = null,
        immediate = true,
        cacheTime = 0,
        onSuccess,
        onError,
    } = options;

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(immediate);
    const [error, setError] = useState(null);

    const cacheRef = useRef({ data: null, timestamp: 0 });
    const mountedRef = useRef(true);

    const fetchData = useCallback(async (fetchParams = params) => {
        // Check cache validity
        if (cacheTime > 0) {
            const now = Date.now();
            if (cacheRef.current.data && (now - cacheRef.current.timestamp) < cacheTime) {
                setData(cacheRef.current.data);
                setLoading(false);
                return cacheRef.current.data;
            }
        }

        setLoading(true);
        setError(null);

        try {
            const response = fetchParams
                ? await apiFunction(fetchParams)
                : await apiFunction();

            const responseData = response.data;

            if (mountedRef.current) {
                setData(responseData);
                setLoading(false);

                // Update cache
                if (cacheTime > 0) {
                    cacheRef.current = { data: responseData, timestamp: Date.now() };
                }

                onSuccess?.(responseData);
            }

            return responseData;
        } catch (err) {
            if (mountedRef.current) {
                const errorMessage = err.message || 'An error occurred';
                setError(errorMessage);
                setLoading(false);
                onError?.(err);
            }
            throw err;
        }
    }, [apiFunction, params, cacheTime, onSuccess, onError]);

    // Reset state
    const reset = useCallback(() => {
        setData(null);
        setError(null);
        setLoading(false);
        cacheRef.current = { data: null, timestamp: 0 };
    }, []);

    // Initial fetch
    useEffect(() => {
        mountedRef.current = true;

        if (immediate) {
            fetchData();
        }

        return () => {
            mountedRef.current = false;
        };
    }, [immediate, fetchData]);

    return {
        data,
        loading,
        error,
        refetch: fetchData,
        reset,
    };
}

/**
 * Hook for mutations (POST, PUT, DELETE) with loading and error states.
 * 
 * @param {Function} mutationFunction - The API mutation function
 * @param {Object} options - Configuration options
 * 
 * @returns {Object} { mutate, data, loading, error, reset }
 */
export function useMutation(mutationFunction, options = {}) {
    const { onSuccess, onError } = options;

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const mutate = useCallback(async (params) => {
        setLoading(true);
        setError(null);

        try {
            const response = await mutationFunction(params);
            const responseData = response.data;

            setData(responseData);
            setLoading(false);
            onSuccess?.(responseData);

            return responseData;
        } catch (err) {
            const errorMessage = err.message || 'An error occurred';
            setError(errorMessage);
            setLoading(false);
            onError?.(err);
            throw err;
        }
    }, [mutationFunction, onSuccess, onError]);

    const reset = useCallback(() => {
        setData(null);
        setError(null);
        setLoading(false);
    }, []);

    return {
        mutate,
        data,
        loading,
        error,
        reset,
    };
}

export default useApi;
