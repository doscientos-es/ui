import type { RowData } from '@tanstack/react-table'
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react'
import type { ReactNode } from 'react'

import { Button } from '../button/button'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableEmpty,
  TableHead,
  TableHeader,
  TableLoading,
  TableRow,
  type TableProps,
} from '../table/table'
import type { DataTableInstance } from './use-data-table'

export type DataTableLabels = {
  pagination: string
  previous: string
  next: string
  page: (page: number, pageCount: number | null) => string
}

const defaultLabels: DataTableLabels = {
  pagination: 'Paginación',
  previous: 'Anterior',
  next: 'Siguiente',
  page: (page, pageCount) =>
    pageCount === null ? `Página ${page}` : `Página ${page} de ${pageCount}`,
}

export type DataTableProps<T extends RowData> = Omit<TableProps, 'children' | 'aria-busy'> & {
  table: DataTableInstance<T>
  caption?: ReactNode
  loading?: boolean
  loadingContent?: ReactNode
  emptyContent?: ReactNode
  labels?: Partial<DataTableLabels>
  /** Replace the built-in pager or return null when paginating elsewhere. */
  renderPagination?: (table: DataTableInstance<T>) => ReactNode
}

/** Renders a TanStack table with native table semantics and keyboard-operable controls. */
export function DataTable<T extends RowData>({
  table,
  caption,
  loading = false,
  loadingContent,
  emptyContent,
  labels,
  renderPagination,
  ...props
}: DataTableProps<T>) {
  const rows = table.getRowModel().rows
  const colSpan = Math.max(1, table.getVisibleLeafColumns().length)

  return (
    <>
      <Table aria-busy={loading || undefined} {...props}>
        {caption !== undefined && caption !== null && <TableCaption>{caption}</TableCaption>}
        <TableHeader>
          {table.getHeaderGroups().map((group) => (
            <TableRow key={group.id}>
              {group.headers.map((header) => {
                const sorted = header.column.getIsSorted()
                const canSort =
                  !header.isPlaceholder && !header.subHeaders.length && header.column.getCanSort()
                const primarySort = canSort && header.column.getSortIndex() === 0
                const SortIcon =
                  sorted === 'asc' ? ArrowUp : sorted === 'desc' ? ArrowDown : ArrowUpDown
                return (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    scope={!header.isPlaceholder && !header.subHeaders.length ? 'col' : undefined}
                    aria-sort={
                      primarySort ? (sorted === 'asc' ? 'ascending' : 'descending') : undefined
                    }
                  >
                    {canSort ? (
                      <button
                        type="button"
                        className="focus-visible:outline-ring inline-flex items-center gap-1.5 rounded-sm text-left focus-visible:outline-2"
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        <table.FlexRender header={header} />
                        <SortIcon aria-hidden="true" className="size-3.5 shrink-0" />
                      </button>
                    ) : header.isPlaceholder ? null : (
                      <table.FlexRender header={header} />
                    )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id} data-state={row.getIsSelected() ? 'selected' : undefined}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  <table.FlexRender cell={cell} />
                </TableCell>
              ))}
            </TableRow>
          ))}
          {!rows.length &&
            (loading ? (
              <TableLoading colSpan={colSpan}>{loadingContent}</TableLoading>
            ) : (
              <TableEmpty colSpan={colSpan}>{emptyContent}</TableEmpty>
            ))}
        </TableBody>
      </Table>
      {renderPagination ? (
        renderPagination(table)
      ) : (
        <DataTablePagination table={table} labels={{ ...defaultLabels, ...labels }} />
      )}
    </>
  )
}

function DataTablePagination<T extends RowData>({
  table,
  labels,
}: {
  table: DataTableInstance<T>
  labels: DataTableLabels
}) {
  const pageCount = table.getPageCount()
  if (pageCount >= 0 && pageCount <= 1 && !table.getCanPreviousPage()) return null
  return (
    <nav
      aria-label={labels.pagination}
      className="flex flex-wrap items-center justify-end gap-2 py-2"
    >
      <output className="text-muted-foreground mr-2 text-sm">
        {labels.page(table.state.pagination.pageIndex + 1, pageCount < 0 ? null : pageCount)}
      </output>
      <Button
        variant="outline"
        size="sm"
        isDisabled={!table.getCanPreviousPage()}
        onPress={() => table.previousPage()}
      >
        {labels.previous}
      </Button>
      <Button
        variant="outline"
        size="sm"
        isDisabled={!table.getCanNextPage()}
        onPress={() => table.nextPage()}
      >
        {labels.next}
      </Button>
    </nav>
  )
}
