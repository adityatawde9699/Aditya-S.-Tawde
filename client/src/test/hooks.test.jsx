import React, { useEffect } from 'react';
import { act } from 'react';
import { createRoot } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useApi, useMutation } from '../hooks/useApi';

const mockApiSuccess = vi.fn(() => Promise.resolve({ data: { id: 1, name: 'Test' } }));
const mockApiError = vi.fn(() => Promise.reject({ message: 'Network error' }));

let container;
let root;

const HookHarness = ({ hook, onRender }) => {
  const value = hook();

  useEffect(() => {
    onRender(value);
  }, [value, onRender]);

  return null;
};

beforeEach(() => {
  vi.clearAllMocks();
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(async () => {
  await act(async () => {
    root.unmount();
  });
  container.remove();
});

describe('useApi Hook', () => {
  it('fetches data successfully', async () => {
    const snapshots = [];

    await act(async () => {
      root.render(<HookHarness hook={() => useApi(mockApiSuccess)} onRender={(value) => snapshots.push(value)} />);
    });

    await act(async () => {
      await Promise.resolve();
    });

    const latest = snapshots.at(-1);
    expect(latest.loading).toBe(false);
    expect(latest.data).toEqual({ id: 1, name: 'Test' });
    expect(latest.error).toBe(null);
    expect(mockApiSuccess).toHaveBeenCalledTimes(1);
  });

  it('handles API errors', async () => {
    const snapshots = [];

    await act(async () => {
      root.render(<HookHarness hook={() => useApi(mockApiError, { immediate: false })} onRender={(value) => snapshots.push(value)} />);
    });

    const latest = snapshots.at(-1);

    await act(async () => {
      await expect(latest.refetch()).rejects.toEqual({ message: 'Network error' });
    });

    const updated = snapshots.at(-1);
    expect(updated.loading).toBe(false);
    expect(updated.data).toBe(null);
    expect(updated.error).toBe('Network error');
  });
});

describe('useMutation Hook', () => {
  it('executes mutation and updates state', async () => {
    const snapshots = [];

    await act(async () => {
      root.render(<HookHarness hook={() => useMutation(mockApiSuccess)} onRender={(value) => snapshots.push(value)} />);
    });

    const latest = snapshots.at(-1);

    await act(async () => {
      await latest.mutate({ payload: 'test' });
    });

    const updated = snapshots.at(-1);
    expect(updated.loading).toBe(false);
    expect(updated.data).toEqual({ id: 1, name: 'Test' });
    expect(updated.error).toBe(null);
  });

  it('handles mutation errors', async () => {
    const snapshots = [];

    await act(async () => {
      root.render(<HookHarness hook={() => useMutation(mockApiError)} onRender={(value) => snapshots.push(value)} />);
    });

    const latest = snapshots.at(-1);

    await act(async () => {
      await expect(latest.mutate({ payload: 'test' })).rejects.toEqual({ message: 'Network error' });
    });

    const updated = snapshots.at(-1);
    expect(updated.loading).toBe(false);
    expect(updated.error).toBe('Network error');
  });
});
