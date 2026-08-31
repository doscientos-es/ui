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
})
