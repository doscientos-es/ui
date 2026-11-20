import {
  columnFilteringFeature,
  columnOrderingFeature,
  columnVisibilityFeature,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  filterFns,
  globalFilteringFeature,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  sortFns,
  tableFeatures,
  useTable,
  type ColumnDef,
  type ReactTable,
  type RowData,
  type TableOptions,
} from '@tanstack/react-table'

const features = tableFeatures({
  columnFilteringFeature,
  columnOrderingFeature,
  columnVisibilityFeature,
  globalFilteringFeature,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  filteredRowModel: createFilteredRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  sortedRowModel: createSortedRowModel(),
  filterFns,
  sortFns,
})

export type DataTableColumn<T extends RowData, TValue = unknown> = ColumnDef<
  typeof features,
  T,
  TValue
>
export type DataTableInstance<T extends RowData> = ReactTable<typeof features, T>
export type DataTableOptions<T extends RowData> = Omit<TableOptions<typeof features, T>, 'features'>

/** Local row models by default. Pass manual* options for server-driven data. */
export function useDataTable<T extends RowData>(
  options: DataTableOptions<T>,
): DataTableInstance<T> {
  return useTable({ enableMultiSort: false, ...options, features })
}
