import type * as React from 'react'

import { cn } from '../../lib/cn'
import { Button } from '../button/button'

/** Flexible toolbar container for filter controls and active-filter chips. */
export function FilterBar({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="filter-bar"
      className={cn('flex flex-wrap items-center gap-2', className)}
      {...props}
    />
  )
}

/** Groups related filter controls inside FilterBar. */
export function FilterGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="filter-group"
      className={cn('flex flex-wrap items-center gap-2', className)}
      {...props}
    />
  )
}

/** Labels a group of currently active filters for assistive technology. */
export function ActiveFilters({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="active-filters"
      aria-label="Filtros activos"
      className={cn('flex flex-wrap items-center gap-1.5', className)}
      {...props}
    />
  )
}

/** An active filter button. `onRemove` must update the application-owned filter state. */
export function FilterChip({
  children,
  onRemove,
  ...props
}: Omit<React.ComponentProps<typeof Button>, 'children' | 'onPress'> & {
  children: React.ReactNode
  onRemove: () => void
}) {
  return (
    <Button size="sm" variant="outline" onPress={onRemove} {...props}>
      {children} ×
    </Button>
  )
}
