import { act, renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { useClipboard } from './use-clipboard'

describe('useClipboard', () => {
  it('copies text and resets its visual state', async () => {
    vi.useFakeTimers()
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText } })
    const { result } = renderHook(() => useClipboard({ resetMs: 100 }))

    await act(async () => {
      expect(await result.current.copy('Hola')).toBe(true)
    })
    expect(writeText).toHaveBeenCalledWith('Hola')
    expect(result.current.status).toBe('copied')

    await act(async () => {
      await vi.advanceTimersByTimeAsync(100)
    })
    expect(result.current.status).toBe('idle')
    vi.useRealTimers()
  })
})
