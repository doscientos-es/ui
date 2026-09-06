import { act, renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { useAsyncAction } from './use-async-action'

describe('useAsyncAction', () => {
  it('prevents duplicate pending actions and exposes success', async () => {
    let resolve!: (value: string) => void
    const action = vi.fn(
      () =>
        new Promise<string>((done) => {
          resolve = done
        }),
    )
    const { result } = renderHook(() => useAsyncAction(action))

    let first!: Promise<string | null>
    await act(async () => {
      first = result.current.run()
    })
    await act(async () => {
      await result.current.run()
    })
    expect(action).toHaveBeenCalledOnce()

    await act(async () => {
      resolve('ok')
      await first
    })
    expect(result.current.status).toBe('success')
    expect(result.current.data).toBe('ok')
  })

  it('does not hide a pending action when reset is requested', async () => {
    let finish!: (value: string) => void
    const action = vi.fn(() => new Promise<string>((resolve) => { finish = resolve }))
    const { result } = renderHook(() => useAsyncAction(action))
    let pending!: Promise<string | null>
    act(() => { pending = result.current.run() })
    act(() => { result.current.reset() })
    expect(result.current.isPending).toBe(true)
    await act(async () => { finish('ok'); await pending })
    act(() => { result.current.reset() })
    expect(result.current.status).toBe('idle')
  })

  it('clears an old success when a new action fails', async () => {
    const action = vi.fn().mockResolvedValueOnce('old').mockRejectedValueOnce(new Error('failed'))
    const { result } = renderHook(() => useAsyncAction(action))
    await act(async () => { await result.current.run() })
    await act(async () => { await result.current.run() })
    expect(result.current.status).toBe('error')
    expect(result.current.data).toBeNull()
  })
})
