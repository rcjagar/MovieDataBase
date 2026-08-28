import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useMovieSearch } from '../../hooks/useMovieSearch';

describe('useMovieSearch', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with empty state', () => {
    const { result } = renderHook(() => useMovieSearch());

    expect(result.current.query).toBe('');
    expect(result.current.movies).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('should update query', () => {
    const { result } = renderHook(() => useMovieSearch());

    act(() => {
      result.current.setQuery('test');
    });

    expect(result.current.query).toBe('test');
  });

  it('should handle successful movie search', async () => {
    const mockMovies = [
      { id: 1, title: 'Test Movie', poster_path: '/test.jpg', overview: 'Test' },
    ];

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ results: mockMovies }),
      })
    );

    const { result } = renderHook(() => useMovieSearch());

    await act(async () => {
      await result.current.searchMovies('test');
    });

    expect(result.current.movies).toEqual(mockMovies);
    expect(result.current.error).toBe(null);
  });

  it('should handle empty search query', async () => {
    const { result } = renderHook(() => useMovieSearch());

    await act(async () => {
      await result.current.searchMovies('');
    });

    expect(result.current.movies).toEqual([]);
  });

  it('should handle API error', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        status: 500,
      })
    );

    const { result } = renderHook(() => useMovieSearch());

    await act(async () => {
      await result.current.searchMovies('test');
    });

    expect(result.current.error).toBeTruthy();
    expect(result.current.movies).toEqual([]);
  });

  it('should set isLoading state during search', async () => {
    global.fetch = vi.fn(() =>
      new Promise(resolve => setTimeout(() => resolve({
        ok: true,
        json: () => Promise.resolve({ results: [] }),
      }), 100))
    );

    const { result } = renderHook(() => useMovieSearch());

    const searchPromise = act(async () => {
      await result.current.searchMovies('test');
    });

    expect(result.current.isLoading).toBe(true);

    await searchPromise;

    expect(result.current.isLoading).toBe(false);
  });
});
