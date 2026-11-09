import type * as React from 'react'

import { cn } from '../../lib/cn'

/** Decorative placeholder displayed while content is loading. */
export function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      aria-hidden="true"
      data-slot="skeleton"
      className={cn('motion-safe:animate-pulse rounded-md bg-muted', className)}
      {...props}
    />
  )
}
