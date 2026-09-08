import type * as React from 'react'

import { cn } from '../../lib/cn'

type MarqueeDirection = 'left' | 'right' | 'up' | 'down'
type MarqueeStyle = React.CSSProperties & Record<'--marquee-duration', string>

export type MarqueeProps = React.ComponentPropsWithRef<'div'> & {
  /** Duration, in seconds, of one complete pass. */
  duration?: number
  /** Pauses motion while the marquee or one of its controls has focus. */
  pauseOnHover?: boolean
  /** Direction of the continuous motion. */
  direction?: MarqueeDirection
  /** Applies a soft fade to the leading and trailing edges. */
  fade?: boolean
  /** Percentage of each edge covered by the fade, from 0 to 50. */
  fadeAmount?: number
}

function clamp(value: number, minimum: number, maximum: number) {
  return Number.isFinite(value) ? Math.min(Math.max(value, minimum), maximum) : minimum
}

/**
 * Continuously scrolls decorative content. The duplicate track is hidden from
 * assistive technology, so provide the meaningful content only once.
 */
export function Marquee({
  children,
  className,
  direction = 'left',
  duration = 20,
  fade = true,
  fadeAmount = 10,
  pauseOnHover = false,
  style,
  ...props
}: MarqueeProps) {
  const isVertical = direction === 'up' || direction === 'down'
  const safeDuration = clamp(duration, 0.01, Number.MAX_SAFE_INTEGER)
  const safeFadeAmount = clamp(fadeAmount, 0, 50)
  const fadeDirection = isVertical ? 'to bottom' : 'to right'
  const fadeMask = `linear-gradient(${fadeDirection}, transparent 0%, black ${safeFadeAmount}%, black ${100 - safeFadeAmount}%, transparent 100%)`
  const marqueeStyle: MarqueeStyle = {
    ...style,
    ...(fade ? { maskImage: fadeMask, WebkitMaskImage: fadeMask } : {}),
    '--marquee-duration': `${safeDuration}s`,
  }

  return (
    <div
      data-direction={direction}
      data-fade={fade || undefined}
      data-fade-amount={safeFadeAmount}
      data-slot="marquee"
      {...props}
      className={cn('w-full overflow-hidden', className)}
      style={marqueeStyle}
    >
      <div
        data-slot="marquee-track"
        className={cn(
          'flex w-max min-w-full shrink-0 transform-gpu will-change-transform',
          isVertical ? 'flex-col motion-safe:animate-marquee-y' : 'motion-safe:animate-marquee-x',
          direction === 'right' || direction === 'down'
            ? 'motion-safe:[animation-direction:reverse]'
            : '',
          pauseOnHover
            ? 'motion-safe:hover:[animation-play-state:paused] motion-safe:focus-within:[animation-play-state:paused]'
            : '',
        )}
      >
        <div className={cn('flex shrink-0', isVertical && 'flex-col')}>{children}</div>
        <div aria-hidden="true" className={cn('flex shrink-0', isVertical && 'flex-col')} inert>
          {children}
        </div>
      </div>
    </div>
  )
}
