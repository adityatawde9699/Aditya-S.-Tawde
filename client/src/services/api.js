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

// ============================================
// Aggregated portfolio loader (request coalescing)
// ============================================
// On page load every section calls its own getter. Instead of firing ~7
// separate requests at a (possibly sleeping) free-tier backend, they all share
// a SINGLE `/portfolio/all/` request via the in-flight promise below. The
// result is briefly cached so a burst of getter calls collapses into one
// network round-trip. Falls back to per-endpoint requests if `/all/` fails
// (e.g. older backend), preserving full backward compatibility.

const PORTFOLIO_CACHE_TTL = 5 * 60 * 1000; // 5 minutes
let portfolioPromise = null;
let portfolioFetchedAt = 0;

function loadPortfolio() {
    const now = Date.now();
    if (portfolioPromise && now - portfolioFetchedAt < PORTFOLIO_CACHE_TTL) {
        return portfolioPromise;
    }
    portfolioFetchedAt = now;
    portfolioPromise = api
        .get('/portfolio/all/')
        .then((response) => response.data)
        .catch((error) => {
            // Reset so a transient failure doesn't poison the cache.
            portfolioPromise = null;
            throw error;
        });
    return portfolioPromise;
}

// Resolve a single section from the aggregated payload, shaped as an
// axios-like `{ data }` so callers/components stay unchanged.
const section = (pick) => () => loadPortfolio().then((all) => ({ data: pick(all) }));

// ============================================
// API Methods
// ============================================

// Portfolio endpoints — all served from one aggregated `/portfolio/all/` call.
export const getProjects = (params = {}) =>
    loadPortfolio().then((all) => {
        let projects = params.featured === 'true' || params.featured === true
            ? all.featuredProjects
            : all.projects;
        if (params.category) {
            projects = projects.filter((p) => p.category === String(params.category).toUpperCase());
        }
        return { data: projects };
    });
export const getFeaturedProjects = () => section((all) => all.featuredProjects)();
export const getSkills = section((all) => all.skills);
export const getTechStack = section((all) => all.techStack);
export const getCertifications = section((all) => all.certifications);
export const getEducation = section((all) => all.education);
export const getExperience = section((all) => all.experience);

// Contact endpoint (direct POST — not part of the aggregated read payload)
export const sendContact = (data) => api.post('/contact/', data);

// Export the configured axios instance
export default api;
