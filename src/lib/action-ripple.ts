'use client'

import { cva } from 'class-variance-authority'
import { createElement, useState } from 'react'

type RipplePosition = {
  x: string
  y: string
}

type Ripple = {
  id: number
  position: RipplePosition
}

type RippleEvent = {
  pointerType?: string
  x?: number
  y?: number
}

const centeredRipplePosition: RipplePosition = { x: '50%', y: '50%' }

/**
 * Provides the clipping and stacking context for a transient action ripple.
 */
export const actionRipple = cva('relative isolate overflow-hidden')

function getRipplePosition(event: RippleEvent): RipplePosition {
  if (event.pointerType === 'keyboard' || event.pointerType === 'virtual') {
    return centeredRipplePosition
  }

  if (event.x === undefined || event.y === undefined) {
    return centeredRipplePosition
  }

  return { x: `${event.x}px`, y: `${event.y}px` }
}

/** Provides a pointer-positioned ripple for pressable action controls. */
export function useActionRipple(enabled = true) {
  const [ripple, setRipple] = useState<Ripple | null>(null)

  function triggerRipple(event: RippleEvent) {
    if (!enabled) return

    setRipple((currentRipple) => ({
      id: (currentRipple?.id ?? 0) + 1,
      position: getRipplePosition(event),
    }))
  }

  const rippleElement = ripple
    ? createElement('span', {
        key: ripple.id,
        'aria-hidden': true,
        'data-slot': 'action-ripple',
        className:
          'animate-ui-ripple pointer-events-none absolute aspect-square w-full rounded-full motion-reduce:hidden',
        style: { left: ripple.position.x, top: ripple.position.y },
        onAnimationEnd: () =>
          setRipple((currentRipple) => (currentRipple?.id === ripple.id ? null : currentRipple)),
      })
    : null

  return { ripple: rippleElement, triggerRipple }
}
