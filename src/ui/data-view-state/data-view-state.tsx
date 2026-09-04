import type * as React from 'react'

import { cn } from '../../lib/cn'

/** Composable empty, loading, or recoverable state for a data view. */
export function DataViewState({ className, ...props }: React.ComponentProps<'section'>) {
  return (
    <section
      data-slot="data-view-state"
      className={cn(
        'flex min-h-40 flex-col items-center justify-center gap-3 rounded-xl border p-6 text-center',
        className,
      )}
      {...props}
    />
  )
}
export function DataViewStateTitle({ children, className, ...props }: React.ComponentProps<'h2'>) {
  return (
    <h2 data-slot="data-view-state-title" className={cn('font-semibold', className)} {...props}>
      {children}
    </h2>
  )
}
export function DataViewStateDescription({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      data-slot="data-view-state-description"
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
}
export function DataViewStateActions({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="data-view-state-actions"
      className={cn('flex items-center gap-2', className)}
      {...props}
    />
  )
}
