import type { VariantProps } from 'class-variance-authority'
import type * as React from 'react'

import { cn } from '../../lib/cn'
import { emptyStateMediaVariants } from './empty-state-variants'

/** Composes an informative empty result with optional media and a recovery action. */
export function EmptyState({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="empty-state"
      className={cn(
        'flex min-h-44 w-full min-w-0 flex-1 flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-border p-6 text-center text-balance',
        className,
      )}
      {...props}
    />
  )
}

export function EmptyStateHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="empty-state-header"
      className={cn('flex max-w-sm flex-col items-center gap-2', className)}
      {...props}
    />
  )
}

export function EmptyStateMedia({
  className,
  variant = 'default',
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof emptyStateMediaVariants>) {
  return (
    <div
      data-slot="empty-state-media"
      data-variant={variant}
      className={cn(emptyStateMediaVariants({ variant }), className)}
      {...props}
    />
  )
}

export function EmptyStateTitle({ className, children, ...props }: React.ComponentProps<'h3'>) {
  return (
    <h3
      data-slot="empty-state-title"
      className={cn('text-sm font-medium tracking-tight text-foreground', className)}
      {...props}
    >
      {children}
    </h3>
  )
}

export function EmptyStateDescription({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      data-slot="empty-state-description"
      className={cn(
        'max-w-sm text-sm/relaxed text-muted-foreground [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary',
        className,
      )}
      {...props}
    />
  )
}

export function EmptyStateContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="empty-state-content"
      className={cn(
        'flex w-full max-w-sm min-w-0 flex-col items-center gap-2.5 text-sm',
        className,
      )}
      {...props}
    />
  )
}
