import { renderHook } from '@testing-library/react'
import { act } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { useAutosave } from './use-autosave'

afterEach(() => vi.useRealTimers())

describe('useAutosave', () => {
  it('allows an explicit initial save and cancels queued work after unmount', async () => {
    vi.useFakeTimers()
    let finish!: () => void
    const onSave = vi.fn().mockImplementationOnce(
      () =>
        new Promise<void>((resolve) => {
          finish = resolve
        }),
    )
    const { result, rerender, unmount } = renderHook(
      ({ data }) => useAutosave({ data, onSave, debounceMs: 100 }),
      { initialProps: { data: 'initial' } },
    )
    let pending!: Promise<void>
    await act(async () => {
      pending = result.current.saveNow()
      await vi.advanceTimersByTimeAsync(0)
    })
    expect(onSave).toHaveBeenCalledWith('initial')
    rerender({ data: 'edited' })
    await act(async () => {
      await vi.advanceTimersByTimeAsync(100)
    })
    unmount()
    await act(async () => {
      finish()
      await pending
      await vi.advanceTimersByTimeAsync(0)
    })
    expect(onSave).toHaveBeenCalledTimes(1)
  })
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

  it('serializes writes and continues with the latest value after a failure', async () => {
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
    })
    expect(onSave).toHaveBeenCalledTimes(1)
    await act(async () => {
      rejectFirst(new Error('La primera petición falló.'))
      await vi.advanceTimersByTimeAsync(0)
    })
    expect(onSave).toHaveBeenNthCalledWith(2, 'second')
    await act(async () => {
      resolveSecond()
      await vi.advanceTimersByTimeAsync(0)
    })

    expect(result.current.status).toBe('saved')
    expect(result.current.error).toBeNull()
  })

  it('saveNow cancels a pending debounce instead of saving twice', async () => {
    vi.useFakeTimers()
    const onSave = vi.fn().mockResolvedValue(undefined)
    const { result, rerender } = renderHook(
      ({ data }) => useAutosave({ data, onSave, debounceMs: 100 }),
      { initialProps: { data: 'initial' } },
    )
    rerender({ data: 'edited' })
    await act(async () => {
      await result.current.saveNow()
    })
    await act(async () => {
      await vi.advanceTimersByTimeAsync(100)
    })
    expect(onSave).toHaveBeenCalledTimes(1)
  })

  it('persists a revert to the initial value after an in-flight write', async () => {
    vi.useFakeTimers()
    let finish!: () => void
    const onSave = vi
      .fn()
      .mockImplementationOnce(
        () =>
          new Promise<void>((resolve) => {
            finish = resolve
          }),
      )
      .mockResolvedValue(undefined)
    const { rerender } = renderHook(({ data }) => useAutosave({ data, onSave, debounceMs: 100 }), {
      initialProps: { data: 'initial' },
    })
    rerender({ data: 'edited' })
    await act(async () => {
      await vi.advanceTimersByTimeAsync(100)
    })
    rerender({ data: 'initial' })
    await act(async () => {
      await vi.advanceTimersByTimeAsync(100)
    })
    await act(async () => {
      finish()
      await vi.advanceTimersByTimeAsync(0)
    })
    expect(onSave.mock.calls.map(([value]) => value)).toEqual(['edited', 'initial'])
  })
})
