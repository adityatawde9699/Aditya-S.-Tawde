import axios from 'axios';

// API Base URL
const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL && import.meta.env.PROD) {
    console.error('VITE_API_URL is not set. API calls will fail.');
}

// Development fallback only
const BASE_URL = API_URL || 'http://127.0.0.1:8000/api';

// Create axios instance with default config
const api = axios.create({
    baseURL: BASE_URL,
    timeout: 15000, // 15 second timeout
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

// ============================================
// Request Interceptor - Logging & Token Injection
// ============================================
api.interceptors.request.use(
    (config) => {
        // Log requests in development
        if (import.meta.env.DEV) {
            console.log(`🚀 [API] ${config.method?.toUpperCase()} ${config.url}`);
        }
        return config;
    },
    (error) => {
        console.error('❌ [API] Request Error:', error);
        return Promise.reject(error);
    }
);

// ============================================
// Response Interceptor - Error Handling & Retry
// ============================================
const MAX_RETRIES = 2;
const RETRY_DELAY = 1000; // 1 second

api.interceptors.response.use(
    (response) => {
        // Log successful responses in development
        if (import.meta.env.DEV) {
            console.log(`✅ [API] ${response.config.method?.toUpperCase()} ${response.config.url} - ${response.status}`);
        }
        return response;
    },
    async (error) => {
        const config = error.config;

        // Initialize retry count
        config.__retryCount = config.__retryCount || 0;

        // Check if we should retry (only for network errors or 5xx)
        const shouldRetry =
            config.__retryCount < MAX_RETRIES &&
            (error.code === 'ECONNABORTED' ||
                error.code === 'ERR_NETWORK' ||
                (error.response && error.response.status >= 500));

        if (shouldRetry) {
            config.__retryCount += 1;

            if (import.meta.env.DEV) {
                console.log(`🔄 [API] Retry ${config.__retryCount}/${MAX_RETRIES} for ${config.url}`);
            }

            // Wait before retrying
            await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * config.__retryCount));

            return api(config);
        }

        // Transform error for consistent handling
        const enhancedError = {
            message: getErrorMessage(error),
            status: error.response?.status,
            data: error.response?.data,
            isNetworkError: !error.response,
            original: error,
        };

        if (import.meta.env.DEV) {
            console.error('❌ [API] Error:', enhancedError.message);
        }

        return Promise.reject(enhancedError);
    }
);

// ============================================
// Error Message Helper
// ============================================
function getErrorMessage(error) {
    if (error.code === 'ECONNABORTED') {
        return 'Request timed out. Please check your connection.';
    }
    if (error.code === 'ERR_NETWORK' || !error.response) {
        return 'Network error. Please check your internet connection.';
    }
    if (error.response) {
        const status = error.response.status;
        const data = error.response.data;

        // Helper to extract string from various error formats
        const extractMessage = (value) => {
            if (!value) return null;
            if (typeof value === 'string') return value;
            if (Array.isArray(value)) return value.join(', ');
            if (typeof value === 'object') {
                const messages = Object.entries(value)
                    .map(([key, val]) => {
                        const msg = Array.isArray(val) ? val.join(', ') : val;
                        return `${key}: ${msg}`;
                    })
                    .join('; ');
                return messages || null;
            }
            return String(value);
        };

        const errorMsg = extractMessage(data?.error);
        if (errorMsg) return errorMsg;

        const message = extractMessage(data?.message);
        if (message) return message;

        const detail = extractMessage(data?.detail);
        if (detail) return detail;

        const nonFieldErrors = extractMessage(data?.non_field_errors);
        if (nonFieldErrors) return nonFieldErrors;

        switch (status) {
            case 400: return 'Invalid request. Please check your input.';
            case 401: return 'Unauthorized. Please log in again.';
            case 403: return 'Access denied.';
            case 404: return 'Resource not found.';
            case 429: return 'Too many requests. Please wait a moment.';
            case 500: return 'Server error. Please try again later.';
            default: return `Request failed (${status}).`;
        }
    }
    return 'An unexpected error occurred.';
}

const normalizeCollectionResponse = (response) => ({
    ...response,
    data: Array.isArray(response.data?.results) ? response.data.results : response.data,
});

// ============================================
// API Methods
// ============================================

// Portfolio endpoints
export const getProjects = (params = {}) => api.get('/portfolio/projects/', { params }).then(normalizeCollectionResponse);
export const getFeaturedProjects = () => api.get('/portfolio/projects/', { params: { featured: 'true' } }).then(normalizeCollectionResponse);
export const getSkills = () => api.get('/portfolio/skills/');
export const getTechStack = () => api.get('/portfolio/tech-stack/');
export const getCertifications = () => api.get('/portfolio/certifications/');
export const getEducation = () => api.get('/portfolio/education/');
export const getExperience = () => api.get('/portfolio/experience/');

// Contact endpoint
export const sendContact = (data) => api.post('/contact/', data);

// Export the configured axios instance
export default api;
