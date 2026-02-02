import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, waitFor, act } from '@testing-library/react';
import { useApi, useMutation } from '../hooks/useApi';

// Mock API functions
const mockApiSuccess = vi.fn(() => Promise.resolve({ data: { id: 1, name: 'Test' } }));
const mockApiError = vi.fn(() => Promise.reject({ message: 'Network error' }));
const mockApiDelayed = vi.fn(() => new Promise(resolve =>
    setTimeout(() => resolve({ data: { delayed: true } }), 100)
));

describe('useApi Hook', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should start with loading state when immediate is true', () => {
        const { result } = renderHook(() => useApi(mockApiSuccess));

        expect(result.current.loading).toBe(true);
        expect(result.current.data).toBe(null);
        expect(result.current.error).toBe(null);
    });

    it('should not fetch immediately when immediate is false', () => {
        const { result } = renderHook(() => useApi(mockApiSuccess, { immediate: false }));

        expect(result.current.loading).toBe(false);
        expect(mockApiSuccess).not.toHaveBeenCalled();
    });

    it('should fetch data successfully', async () => {
        const { result } = renderHook(() => useApi(mockApiSuccess));

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(result.current.data).toEqual({ id: 1, name: 'Test' });
        expect(result.current.error).toBe(null);
        expect(mockApiSuccess).toHaveBeenCalledTimes(1);
    });

    it('should handle API errors', async () => {
        const { result } = renderHook(() => useApi(mockApiError));

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(result.current.data).toBe(null);
        expect(result.current.error).toBe('Network error');
    });

    it('should call onSuccess callback on successful fetch', async () => {
        const onSuccess = vi.fn();
        const { result } = renderHook(() =>
            useApi(mockApiSuccess, { onSuccess })
        );

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(onSuccess).toHaveBeenCalledWith({ id: 1, name: 'Test' });
    });

    it('should call onError callback on failed fetch', async () => {
        const onError = vi.fn();
        const { result } = renderHook(() =>
            useApi(mockApiError, { onError })
        );

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(onError).toHaveBeenCalled();
    });

    it('should support refetch', async () => {
        const { result } = renderHook(() => useApi(mockApiSuccess));

        await waitFor(() => {
            expect(result.current.loading).toBe(false);
        });

        expect(mockApiSuccess).toHaveBeenCalledTimes(1);

        // Trigger refetch
        act(() => {
            result.current.refetch();
        });

        await waitFor(() => {
            expect(mockApiSuccess).toHaveBeenCalledTimes(2);
        });
    });

    it('should reset state correctly', async () => {
        const { result } = renderHook(() => useApi(mockApiSuccess));

        await waitFor(() => {
            expect(result.current.data).not.toBe(null);
        });

        act(() => {
            result.current.reset();
        });

        expect(result.current.data).toBe(null);
        expect(result.current.error).toBe(null);
        expect(result.current.loading).toBe(false);
    });
});

describe('useMutation Hook', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should start with idle state', () => {
        const { result } = renderHook(() => useMutation(mockApiSuccess));

        expect(result.current.loading).toBe(false);
        expect(result.current.data).toBe(null);
        expect(result.current.error).toBe(null);
    });

    it('should execute mutation and update state', async () => {
        const { result } = renderHook(() => useMutation(mockApiSuccess));

        let mutationResult;
        await act(async () => {
            mutationResult = await result.current.mutate({ payload: 'test' });
        });

        expect(result.current.loading).toBe(false);
        expect(result.current.data).toEqual({ id: 1, name: 'Test' });
        expect(mutationResult).toEqual({ id: 1, name: 'Test' });
    });

    it('should handle mutation errors', async () => {
        const { result } = renderHook(() => useMutation(mockApiError));

        await act(async () => {
            try {
                await result.current.mutate({ payload: 'test' });
            } catch (e) {
                // Expected to throw
            }
        });

        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe('Network error');
    });

    it('should call onSuccess callback after mutation', async () => {
        const onSuccess = vi.fn();
        const { result } = renderHook(() =>
            useMutation(mockApiSuccess, { onSuccess })
        );

        await act(async () => {
            await result.current.mutate({ payload: 'test' });
        });

        expect(onSuccess).toHaveBeenCalledWith({ id: 1, name: 'Test' });
    });

    it('should reset mutation state', async () => {
        const { result } = renderHook(() => useMutation(mockApiSuccess));

        await act(async () => {
            await result.current.mutate({ payload: 'test' });
        });

        expect(result.current.data).not.toBe(null);

        act(() => {
            result.current.reset();
        });

        expect(result.current.data).toBe(null);
        expect(result.current.error).toBe(null);
        expect(result.current.loading).toBe(false);
    });
});
