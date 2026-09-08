import type * as React from 'react'

import { cn } from '../../lib/cn'

export type BrandMarkProps = React.ComponentProps<'span'> & {
  /** Small supporting line shown beside the product name. */
  name?: string
  /** Visual scale for shell headers and compact contexts. */
  size?: 'sm' | 'md'
}

/** A quiet, consistent product lockup for Doscientos applications. */
export function BrandMark({ className, name, size = 'md', ...props }: BrandMarkProps) {
  return (
    <span
      data-slot="brand-mark"
      data-size={size}
      className={cn('inline-flex items-center gap-2 font-semibold tracking-tight', className)}
      {...props}
    >
      <span
        aria-hidden="true"
        className={cn(
          'flex shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm',
          size === 'sm' ? 'size-7 text-xs' : 'size-8 text-sm',
        )}
      >
        ◌
      </span>
      {name ? <span>{name}</span> : null}
    </span>
  )
}

export type EyebrowProps = React.ComponentProps<'p'>

/** Uppercase section label used to create calm navigation and page hierarchy. */
export function Eyebrow({ className, ...props }: EyebrowProps) {
  return (
    <p
      data-slot="eyebrow"
      className={cn(
        'text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground',
        className,
      )}
      {...props}
    />
  )
}
