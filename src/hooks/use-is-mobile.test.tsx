import { renderHook } from '@testing-library/react'
import { act } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { useIsMobile } from './use-is-mobile'

type ChangeListener = (event: { matches: boolean }) => void

function stubMatchMedia(initialMatches: boolean) {
  let matches = initialMatches
  const listeners = new Set<ChangeListener>()
  vi.stubGlobal('matchMedia', (query: string) => ({
    matches,
    media: query,
    addEventListener: (_event: string, listener: ChangeListener) => listeners.add(listener),
    removeEventListener: (_event: string, listener: ChangeListener) => listeners.delete(listener),
  }))
  return {
    setMatches(next: boolean) {
      matches = next
      for (const listener of listeners) listener({ matches: next })
    },
  }
}

afterEach(() => vi.unstubAllGlobals())

describe('useIsMobile', () => {
  it('returns false on desktop viewports', () => {
    stubMatchMedia(false)
    const { result } = renderHook(() => useIsMobile())
    expect(result.current).toBe(false)
  })

  it('returns true when the viewport matches the mobile query', () => {
    stubMatchMedia(true)
    const { result } = renderHook(() => useIsMobile())
    expect(result.current).toBe(true)
  })

  it('updates when the viewport crosses the breakpoint', () => {
    const media = stubMatchMedia(false)
    const { result } = renderHook(() => useIsMobile())

    act(() => media.setMatches(true))
    expect(result.current).toBe(true)

    act(() => media.setMatches(false))
    expect(result.current).toBe(false)
  })
})
