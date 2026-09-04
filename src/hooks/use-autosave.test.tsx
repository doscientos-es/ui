import { renderHook } from '@testing-library/react'
import { act } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { useAutosave } from './use-autosave'

afterEach(() => vi.useRealTimers())

describe('useAutosave', () => {
  it('does not save the initial payload and debounces subsequent changes', async () => {
    vi.useFakeTimers()
    const onSave = vi.fn().mockResolvedValue(undefined)
    const { result, rerender } = renderHook(
      ({ data }) => useAutosave({ data, onSave, debounceMs: 100 }),
      { initialProps: { data: 'initial' } },
    )

    rerender({ data: 'edited' })
    expect(onSave).not.toHaveBeenCalled()
    await act(async () => {
      await vi.advanceTimersByTimeAsync(100)
    })

    expect(onSave).toHaveBeenCalledWith('edited')
    expect(result.current.status).toBe('saved')
  })

  it('ignores a stale failure after a newer save succeeds', async () => {
    vi.useFakeTimers()
    let rejectFirst!: (error: Error) => void
    let resolveSecond!: () => void
    const firstSave = new Promise<void>((_, reject) => {
      rejectFirst = reject
    })
    const secondSave = new Promise<void>((resolve) => {
      resolveSecond = resolve
    })
    const onSave = vi.fn((data: string) => (data === 'first' ? firstSave : secondSave))
    const { result, rerender } = renderHook(
      ({ data }) => useAutosave({ data, onSave, debounceMs: 100 }),
      { initialProps: { data: 'initial' } },
    )

    rerender({ data: 'first' })
    await act(async () => {
      await vi.advanceTimersByTimeAsync(100)
    })
    rerender({ data: 'second' })
    await act(async () => {
      await vi.advanceTimersByTimeAsync(100)
      resolveSecond()
      await Promise.resolve()
    })

    rejectFirst(new Error('La primera petición falló tarde.'))
    await act(async () => {
      await Promise.resolve()
    })

    expect(result.current.status).toBe('saved')
    expect(result.current.error).toBeNull()
  })
})
