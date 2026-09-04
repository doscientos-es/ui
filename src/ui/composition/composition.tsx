import type * as React from 'react'

import { cn } from '../../lib/cn'
import { Button } from '../button/button'
import { DrawerContent, DrawerFooter, DrawerHeader } from '../sheet/sheet'

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

/** Announces the selected item count and displays application-owned bulk actions. */
export function SelectionToolbar({
  count,
  className,
  children,
  ...props
}: React.ComponentProps<'div'> & { count: number }) {
  return (
    <div
      data-slot="selection-toolbar"
      className={cn(
        'flex flex-wrap items-center justify-between gap-2 rounded-lg border bg-muted/40 p-2',
        className,
      )}
      {...props}
    >
      <output aria-live="polite" className="text-sm font-medium">
        {count} seleccionados
      </output>
      <div className="flex items-center gap-2">{children}</div>
    </div>
  )
}

/** Responsive semantic list for read-only record details. */
export function DescriptionList({ className, ...props }: React.ComponentProps<'dl'>) {
  return (
    <dl
      data-slot="description-list"
      className={cn('grid gap-x-6 gap-y-4 sm:grid-cols-2', className)}
      {...props}
    />
  )
}
export function DescriptionItem({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="description-item" className={cn('min-w-0', className)} {...props} />
}
export function DescriptionTerm({ className, ...props }: React.ComponentProps<'dt'>) {
  return (
    <dt
      data-slot="description-term"
      className={cn('text-xs font-medium text-muted-foreground', className)}
      {...props}
    />
  )
}
export function DescriptionDetails({ className, ...props }: React.ComponentProps<'dd'>) {
  return (
    <dd
      data-slot="description-details"
      className={cn('mt-1 wrap-break-word text-sm', className)}
      {...props}
    />
  )
}

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

/** Responsive layout container for MetricCard items. */
export function MetricGrid({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="metric-grid"
      className={cn('grid gap-4 sm:grid-cols-2 xl:grid-cols-4', className)}
      {...props}
    />
  )
}

/** Drawer content frame for record details; compose it inside an open Drawer. */
export function DetailDrawer({ children, ...props }: React.ComponentProps<typeof DrawerContent>) {
  return <DrawerContent {...props}>{children}</DrawerContent>
}
export function DetailDrawerBody({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="detail-drawer-body"
      className={cn('min-h-0 flex-1 overflow-y-auto px-4', className)}
      {...props}
    />
  )
}
export { DrawerFooter as DetailDrawerFooter, DrawerHeader as DetailDrawerHeader }
