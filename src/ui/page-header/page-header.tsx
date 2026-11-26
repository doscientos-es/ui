import type * as React from 'react'

import { cn } from '../../lib/cn'

/** Establishes the shared vertical rhythm between a page header and its sections. */
export function PageStack({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="page-stack"
      className={cn('flex min-w-0 flex-col gap-(--ui-content-gap,1.5rem)', className)}
      {...props}
    />
  )
}

export type PageHeaderProps = React.ComponentProps<'header'> & {
  /** Page title. Omit when composing the individual heading parts yourself. */
  heading?: React.ReactNode
  /** Supporting text shown below the heading. */
  description?: React.ReactNode
  /** Primary and secondary page actions. */
  actions?: React.ReactNode
}

/** Page-level heading layout; use props for the common case or compose its parts. */
export function PageHeader({
  className,
  heading,
  description,
  actions,
  children,
  ...props
}: PageHeaderProps) {
  return (
    <header
      data-slot="page-header"
      className={cn('flex flex-wrap items-center justify-between gap-x-6 gap-y-4 py-3', className)}
      {...props}
    >
      {heading != null && (
        <PageHeaderHeading>
          <PageHeaderTitle>{heading}</PageHeaderTitle>
          {description != null && <PageHeaderDescription>{description}</PageHeaderDescription>}
        </PageHeaderHeading>
      )}
      {actions != null && <PageHeaderActions>{actions}</PageHeaderActions>}
      {children}
    </header>
  )
}
export function PageHeaderHeading({ className, ...props }: React.ComponentProps<'div'>) {
  // basis-64: the heading keeps at least 16rem; actions wrap to their own row instead of squeezing it.
  return (
    <div
      data-slot="page-header-heading"
      className={cn('min-w-0 flex-1 basis-64', className)}
      {...props}
    />
  )
}
export function PageHeaderTitle({ className, children, ...props }: React.ComponentProps<'h1'>) {
  return (
    <h1
      data-slot="page-header-title"
      className={cn('truncate text-2xl font-semibold tracking-[-0.03em] md:text-3xl', className)}
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
      className={cn('text-muted-foreground mt-1 text-sm', className)}
      {...props}
    />
  )
}
export function PageHeaderMeta({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="page-header-meta"
      className={cn(
        'text-muted-foreground mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs',
        className,
      )}
      {...props}
    />
  )
}
export function PageHeaderActions({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="page-header-actions"
      className={cn('flex flex-wrap items-center gap-2', className)}
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
export function SectionHeaderTitle({ className, children, ...props }: React.ComponentProps<'h2'>) {
  return (
    <h2
      data-slot="section-header-title"
      className={cn('text-base font-semibold tracking-tight', className)}
      {...props}
    >
      {children}
    </h2>
  )
}
export function SectionHeaderDescription({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      data-slot="section-header-description"
      className={cn('text-muted-foreground mt-1 text-sm', className)}
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
