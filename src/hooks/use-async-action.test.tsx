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
})
