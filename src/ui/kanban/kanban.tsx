import type * as React from 'react'

import { cn } from '../../lib/cn'

const columnSize = {
  compact: 'w-56',
  default: 'w-72',
  wide: 'w-80',
} as const

export type KanbanColumnSize = keyof typeof columnSize

/** Horizontally scrollable layout for independently managed Kanban columns. */
export function KanbanViewport({
  children,
  className,
  contentClassName,
  ...props
}: React.ComponentProps<'div'> & { contentClassName?: string }) {
  return (
    <div
      data-slot="kanban-viewport"
      className={cn('-mx-1 overflow-x-auto pb-3', className)}
      {...props}
    >
      <div
        data-slot="kanban-viewport-content"
        className={cn('flex min-w-max items-start gap-3 px-1', contentClassName)}
      >
        {children}
      </div>
    </div>
  )
}

/** Presentational column shell. Drag-and-drop behaviour remains owned by consumers. */
export function KanbanColumn({
  className,
  size = 'default',
  ...props
}: React.ComponentProps<'section'> & { size?: KanbanColumnSize }) {
  return (
    <section
      data-slot="kanban-column"
      data-size={size}
      className={cn('shrink-0 rounded-lg border border-border/70 p-2', columnSize[size], className)}
      {...props}
    />
  )
}

export function KanbanColumnHeader({ className, ...props }: React.ComponentProps<'header'>) {
  return (
    <header
      data-slot="kanban-column-header"
      className={cn('mb-2 flex items-center justify-between gap-2 px-1 py-1', className)}
      {...props}
    />
  )
}

export function KanbanColumnTitle({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="kanban-column-title"
      className={cn(
        'text-foreground truncate text-[11px] font-semibold tracking-wide uppercase',
        className,
      )}
      {...props}
    />
  )
}

export function KanbanColumnBody({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="kanban-column-body" className={cn('space-y-2', className)} {...props} />
}

export function KanbanEmpty({
  className,
  compact = false,
  ...props
}: React.ComponentProps<'p'> & { compact?: boolean }) {
  return (
    <p
      data-slot="kanban-empty"
      data-compact={compact || undefined}
      className={cn(
        'border-border text-muted-foreground rounded-md border border-dashed py-6 text-center',
        compact ? 'px-2 text-[11px]' : 'px-3 text-xs',
        className,
      )}
      {...props}
    />
  )
}
