import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { useFormFeedback } from './use-form-feedback'

afterEach(() => vi.useRealTimers())

describe('useFormFeedback', () => {
  it('resets success after the default delay and exposes pending state', () => {
    vi.useFakeTimers()
    const { result } = renderHook(() => useFormFeedback())
    expect(result.current.state).toEqual({ status: 'idle' })
    act(() => result.current.setPending())
    expect(result.current.pending).toBe(true)
    act(() => result.current.setSuccess('Cambios guardados'))
    expect(result.current.pending).toBe(false)
    expect(result.current.state).toEqual({ status: 'success', message: 'Cambios guardados' })
    act(() => vi.advanceTimersByTime(2499))
    expect(result.current.state.status).toBe('success')
    act(() => vi.advanceTimersByTime(1))
    expect(result.current.state).toEqual({ status: 'idle' })
  })

  it.each(['pending', 'error', 'reset'] as const)('cancels stale success timers on %s', (next) => {
    vi.useFakeTimers()
    const { result } = renderHook(() => useFormFeedback({ successResetMs: 100 }))
    act(() => result.current.setSuccess())
    act(() => {
      if (next === 'pending') result.current.setPending()
      else if (next === 'error') result.current.setError('No se pudo guardar')
      else result.current.reset()
    })
    expect(vi.getTimerCount()).toBe(0)
    act(() => vi.advanceTimersByTime(200))
    expect(result.current.state.status).toBe(next === 'reset' ? 'idle' : next)
    if (next === 'error') expect(result.current.state.message).toBe('No se pudo guardar')
  })

  it('restarts the success delay instead of letting an earlier save clear newer feedback', () => {
    vi.useFakeTimers()
    const { result, unmount } = renderHook(() => useFormFeedback({ successResetMs: 100 }))
    act(() => result.current.setSuccess('Primer guardado'))
    act(() => vi.advanceTimersByTime(50))
    act(() => result.current.setSuccess('Segundo guardado'))
    act(() => vi.advanceTimersByTime(50))
    expect(result.current.state.message).toBe('Segundo guardado')
    unmount()
    expect(vi.getTimerCount()).toBe(0)
  })

  it('keeps success visible when automatic reset is disabled', () => {
    vi.useFakeTimers()
    const { result } = renderHook(() => useFormFeedback({ successResetMs: 0 }))
    act(() => result.current.setSuccess())
    expect(vi.getTimerCount()).toBe(0)
    act(() => vi.advanceTimersByTime(10_000))
    expect(result.current.state.status).toBe('success')
    act(() => result.current.reset())
    expect(result.current.state.status).toBe('idle')
  })
})
