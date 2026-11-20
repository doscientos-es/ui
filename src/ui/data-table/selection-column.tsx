import type { RowData } from '@tanstack/react-table'

import { Checkbox } from '../checkbox/checkbox'
import type { DataTableColumn } from './use-data-table'

/** Adds row selection without changing the native table into an ARIA grid. */
export function createDataTableSelectionColumn<T extends RowData>({
  pageLabel = 'Seleccionar esta página',
  rowLabel = (_row: T) => 'Seleccionar fila',
}: {
  pageLabel?: string
  rowLabel?: (row: T) => string
} = {}): DataTableColumn<T> {
  return {
    id: 'selection',
    enableSorting: false,
    enableHiding: false,
    header: ({ table }) => (
      <Checkbox
        aria-label={pageLabel}
        isDisabled={!table.getRowModel().rows.some((row) => row.getCanSelect())}
        isSelected={table.getIsAllPageRowsSelected()}
        isIndeterminate={table.getIsSomePageRowsSelected()}
        onChange={(selected) => table.toggleAllPageRowsSelected(selected)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        aria-label={rowLabel(row.original)}
        isSelected={row.getIsSelected()}
        isDisabled={!row.getCanSelect()}
        onChange={(selected) => row.toggleSelected(selected)}
      />
    ),
  }
}
