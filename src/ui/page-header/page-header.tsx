import type * as React from 'react'

import { cn } from '../../lib/cn'

/** Page-level heading layout with optional description and actions. */
export function PageHeader({ className, ...props }: React.ComponentProps<'header'>) {
  return (
    <header
      data-slot="page-header"
      className={cn(
        'flex flex-col gap-4 py-2 sm:flex-row sm:items-center sm:justify-between',
        className,
      )}
      {...props}
    />
  )
}
export function PageHeaderHeading({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="page-header-heading" className={cn('min-w-0', className)} {...props} />
}
export function PageHeaderTitle({ className, ...props }: React.ComponentProps<'h1'>) {
  return (
    <h1
      data-slot="page-header-title"
      className={cn('truncate text-xl font-semibold tracking-tight md:text-2xl', className)}
      {...props}
    />
  )
}
export function PageHeaderDescription({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      data-slot="page-header-description"
      className={cn('mt-1 text-sm text-muted-foreground', className)}
      {...props}
    />
  )
}
export function PageHeaderActions({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="page-header-actions"
      className={cn('flex shrink-0 items-center gap-2', className)}
      {...props}
    />
  )
}
