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
export function PageHeaderTitle({ className, children, ...props }: React.ComponentProps<'h1'>) {
  return (
    <h1
      data-slot="page-header-title"
      className={cn('truncate text-xl font-semibold tracking-tight md:text-2xl', className)}
      {...props}
    >
      {children}
    </h1>
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

/** Section-level heading layout for panels and cards. */
export function SectionHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="section-header"
      className={cn('flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between', className)}
      {...props}
    />
  )
}
export function SectionHeaderHeading({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="section-header-heading" className={cn('min-w-0', className)} {...props} />
}
export function SectionHeaderTitle({ className, ...props }: React.ComponentProps<'h2'>) {
  return (
    <h2
      data-slot="section-header-title"
      className={cn('text-base font-semibold tracking-tight', className)}
      {...props}
    />
  )
}
export function SectionHeaderDescription({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      data-slot="section-header-description"
      className={cn('mt-1 text-sm text-muted-foreground', className)}
      {...props}
    />
  )
}
export function SectionHeaderActions({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="section-header-actions"
      className={cn('flex shrink-0 items-center gap-2', className)}
      {...props}
    />
  )
}
