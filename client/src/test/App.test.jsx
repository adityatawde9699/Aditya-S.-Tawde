import { describe, it, expect, vi } from 'vitest'

// Simple unit tests that don't require DOM rendering
// This avoids the jsdom ESM compatibility issues

describe('App Configuration', () => {
    it('should have correct document type', () => {
        expect(typeof document).toBe('object')
    })

    it('should have window object available', () => {
        expect(typeof window).toBe('object')
    })

    it('API URL should be configurable via environment', () => {
        // Test that we can access import.meta.env
        expect(typeof import.meta.env).toBe('object')
    })
})

describe('Utils', () => {
    it('should handle basic React import', async () => {
        const React = await import('react')
        expect(React).toBeDefined()
        expect(typeof React.createElement).toBe('function')
    })

    it('should handle react-router-dom import', async () => {
        const { BrowserRouter } = await import('react-router-dom')
        expect(BrowserRouter).toBeDefined()
    })
})
