import { renderHook } from '@testing-library/react'
import { act } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { useDebouncedValue } from './use-debounced-value'

describe('useDebouncedValue', () => {
  it('only exposes a changed value after the configured delay', async () => {
    vi.useFakeTimers()
    const { result, rerender } = renderHook(({ value }) => useDebouncedValue(value, 200), {
      initialProps: { value: 'a' },
    })
    rerender({ value: 'ab' })
    expect(result.current).toBe('a')
    await act(async () => {
      await vi.advanceTimersByTimeAsync(200)
    })
    expect(result.current).toBe('ab')
    vi.useRealTimers()
  })
})
