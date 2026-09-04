import { AlertCircle } from 'lucide-react'
import type * as React from 'react'

import { cn } from '../../lib/cn'

/** Presentational, accessible error state that applications can pair with a retry action. */
export function ErrorState({ className, ...props }: React.ComponentProps<'section'>) {
  return (
    <section
      data-slot="error-state"
      role="alert"
      className={cn(
        'flex min-h-32 flex-col items-center justify-center gap-3 rounded-xl border border-destructive/30 bg-destructive/5 p-6 text-center',
        className,
      )}
      {...props}
    />
  )
}
export function ErrorStateIcon({
  className,
  ...props
}: Omit<React.ComponentProps<typeof AlertCircle>, 'children'>) {
  return (
    <AlertCircle
      data-slot="error-state-icon"
      aria-hidden="true"
      className={cn('size-6 text-destructive', className)}
      {...props}
    />
  )
}
export function ErrorStateTitle({ className, ...props }: React.ComponentProps<'h2'>) {
  return (
    <h2
      data-slot="error-state-title"
      className={cn('font-semibold text-foreground', className)}
      {...props}
    />
  )
}
export function ErrorStateDescription({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      data-slot="error-state-description"
      className={cn('max-w-md text-sm text-muted-foreground', className)}
      {...props}
    />
  )
}
export function ErrorStateActions({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="error-state-actions"
      className={cn('flex items-center gap-2', className)}
      {...props}
    />
  )
}
