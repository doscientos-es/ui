import type * as React from 'react'

import { cn } from '../../lib/cn'

/** Presentational table primitives. Sorting, pagination and data state stay in the application. */
export function Table({ className, ...props }: React.ComponentProps<'table'>) {
  return (
    <div data-slot="table-container" className="relative w-full overflow-x-auto">
      <table
        data-slot="table"
        className={cn('w-full caption-bottom text-sm', className)}
        {...props}
      />
    </div>
  )
}

export function TableHeader({ className, ...props }: React.ComponentProps<'thead'>) {
  return <thead data-slot="table-header" className={cn('[&_tr]:border-b', className)} {...props} />
}
export function TableBody({ className, ...props }: React.ComponentProps<'tbody'>) {
  return (
    <tbody
      data-slot="table-body"
      className={cn('[&_tr:last-child]:border-0', className)}
      {...props}
    />
  )
}
export function TableRow({ className, ...props }: React.ComponentProps<'tr'>) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        'border-b border-border transition-colors hover:bg-muted/50 has-aria-expanded:bg-muted/50 data-[state=selected]:bg-muted',
        className,
      )}
      {...props}
    />
  )
}
export function TableHead({ className, ...props }: React.ComponentProps<'th'>) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        'h-10 px-2 text-left align-middle font-medium whitespace-nowrap text-foreground [&:has([role=checkbox])]:pr-0',
        className,
      )}
      {...props}
    />
  )
}
export function TableCell({ className, ...props }: React.ComponentProps<'td'>) {
  return (
    <td
      data-slot="table-cell"
      className={cn('p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0', className)}
      {...props}
    />
  )
}
export function TableCaption({ className, ...props }: React.ComponentProps<'caption'>) {
  return (
    <caption
      data-slot="table-caption"
      className={cn('mt-4 text-sm text-muted-foreground', className)}
      {...props}
    />
  )
}

export function TableFooter({ className, ...props }: React.ComponentProps<'tfoot'>) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        'border-t border-border bg-muted/50 font-medium [&>tr]:last:border-b-0',
        className,
      )}
      {...props}
    />
  )
}

export function TableToolbar({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="table-toolbar"
      className={cn('flex flex-wrap items-center justify-between gap-2 py-2', className)}
      {...props}
    />
  )
}
export function TableEmpty({
  colSpan = 1,
  className,
  children = 'No hay resultados.',
}: {
  colSpan?: number
  className?: string
  children?: React.ReactNode
}) {
  return (
    <TableRow data-slot="table-empty">
      <TableCell
        colSpan={colSpan}
        className={cn('h-24 text-center text-muted-foreground', className)}
      >
        {children}
      </TableCell>
    </TableRow>
  )
}
export function TableLoading({
  colSpan = 1,
  className,
  children = 'Cargando…',
}: {
  colSpan?: number
  className?: string
  children?: React.ReactNode
}) {
  return (
    <TableRow data-slot="table-loading" aria-busy="true">
      <TableCell
        colSpan={colSpan}
        className={cn('h-24 text-center text-muted-foreground', className)}
      >
        {children}
      </TableCell>
    </TableRow>
  )
}
