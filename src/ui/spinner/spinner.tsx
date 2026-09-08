import { useId, type ComponentPropsWithRef } from 'react'

import { cn } from '../../lib/cn'

type SpinnerSize = 'sm' | 'default' | 'md' | 'lg'
type SpinnerSpeed = 'slow' | 'normal' | 'fast'

const sizeClasses: Record<SpinnerSize, string> = {
  sm: 'size-4',
  default: 'size-5',
  md: 'size-6',
  lg: 'size-8',
}

const speedClasses: Record<SpinnerSpeed, string> = {
  slow: 'motion-safe:animate-[spin_2s_linear_infinite]',
  normal: 'motion-safe:animate-spin',
  fast: 'motion-safe:animate-[spin_0.5s_linear_infinite]',
}

export type SpinnerProps = Omit<ComponentPropsWithRef<'output'>, 'children'> & {
  /** Accessible text announced while the related content is loading. */
  label?: string
  /** Visual scale of the indicator. */
  size?: SpinnerSize
  /** Rotation speed of the indicator. */
  speed?: SpinnerSpeed
}

/** Compact loading status that respects the user's reduced-motion preference. */
export function Spinner({
  className,
  label = 'Cargando',
  size = 'md',
  speed = 'normal',
  ...props
}: SpinnerProps) {
  const id = useId()

  return (
    <output
      aria-label={label}
      data-size={size}
      data-slot="spinner"
      {...props}
      className={cn('inline-flex shrink-0', sizeClasses[size], className)}
    >
      <svg
        aria-hidden="true"
        className={cn('size-full', speedClasses[speed])}
        focusable="false"
        viewBox="0 0 24 24"
      >
        <defs>
          <linearGradient id={`gradient-1-${id}`} x1="50%" x2="50%" y1="5.271%" y2="91.793%">
            <stop offset="0%" stopColor="currentColor" />
            <stop offset="100%" stopColor="currentColor" stopOpacity={0.55} />
          </linearGradient>
          <linearGradient id={`gradient-2-${id}`} x1="50%" x2="50%" y1="15.24%" y2="87.15%">
            <stop offset="0%" stopColor="currentColor" stopOpacity={0} />
            <stop offset="100%" stopColor="currentColor" stopOpacity={0.55} />
          </linearGradient>
        </defs>
        <g fill="none">
          <path
            d="M8.749.021a1.5 1.5 0 0 1 .497 2.958A7.5 7.5 0 0 0 3 10.375a7.5 7.5 0 0 0 7.5 7.5v3c-5.799 0-10.5-4.7-10.5-10.5C0 5.23 3.726.865 8.749.021"
            fill={`url(#gradient-1-${id})`}
            transform="translate(1.5 1.625)"
          />
          <path
            d="M15.392 2.673a1.5 1.5 0 0 1 2.119-.115A10.48 10.48 0 0 1 21 10.375c0 5.8-4.701 10.5-10.5 10.5v-3a7.5 7.5 0 0 0 5.007-13.084a1.5 1.5 0 0 1-.115-2.118"
            fill={`url(#gradient-2-${id})`}
            transform="translate(1.5 1.625)"
          />
        </g>
      </svg>
    </output>
  )
}
