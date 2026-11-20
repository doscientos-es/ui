import { act, fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { describe, expect, it, vi } from 'vitest'

import {
  createDataTableSelectionColumn,
  DataTable,
  useDataTable,
  type DataTableColumn,
  type DataTableOptions,
  type PaginationState,
  type SortingState,
} from './data-table'

const data = [
  { id: 'c', name: 'Celia', amount: 30 },
  { id: 'a', name: 'Ana', amount: 10 },
  { id: 'b', name: 'Beatriz', amount: 20 },
]
type Record = (typeof data)[number]

const columns: DataTableColumn<Record>[] = [
  createDataTableSelectionColumn({ rowLabel: (row: Record) => `Seleccionar ${row.name}` }),
  { accessorKey: 'name', header: 'Nombre', sortDescFirst: false },
  {
    accessorKey: 'amount',
    header: 'Importe',
    cell: ({ row }) => <strong>{row.original.amount} €</strong>,
  },
]

function LocalTable({ loading }: { loading?: boolean }) {
  const table = useDataTable({
    columns,
    data,
    getRowId: (row) => row.id,
    initialState: { pagination: { pageIndex: 0, pageSize: 2 } },
  })
  return (
    <>
      <input aria-label="Filtrar" onChange={(event) => table.setGlobalFilter(event.target.value)} />
      <button type="button" onClick={() => table.getColumn('amount')?.toggleVisibility(false)}>
        Ocultar importe
      </button>
      <DataTable table={table} caption="Clientes" loading={loading} emptyContent="Sin clientes" />
    </>
  )
}

describe('DataTable', () => {
  it('sorts from a keyboard, filters, paginates and renders only visible columns', async () => {
    const user = userEvent.setup()
    render(<LocalTable />)
    const table = screen.getByRole('table', { name: 'Clientes' })
    const header = within(table).getByRole('columnheader', { name: 'Nombre' })
    const firstCell = () => within(table).getAllByRole('cell')[1]?.textContent
    expect(firstCell()).toBe('Celia')
    act(() => within(header).getByRole('button').focus())
    await user.keyboard('{Enter}')
    expect(firstCell()).toBe('Ana')
    expect(header.getAttribute('aria-sort')).toBe('ascending')
    expect(within(table).getByText('10 €').tagName).toBe('STRONG')
    await user.click(screen.getByRole('button', { name: 'Siguiente' }))
    expect(firstCell()).toBe('Celia')
    expect(screen.getByRole('status').textContent).toBe('Página 2 de 2')
    await user.type(screen.getByRole('textbox', { name: 'Filtrar' }), 'Beatriz')
    expect(firstCell()).toBe('Beatriz')
    await user.click(screen.getByRole('button', { name: 'Ocultar importe' }))
    expect(within(table).queryByRole('columnheader', { name: 'Importe' })).toBeNull()
    expect(within(table).queryByText('20 €')).toBeNull()
  })

  it('selects the current page and preserves selections by row ID across pages', async () => {
    const user = userEvent.setup()
    render(<LocalTable />)
    const selectPage = () =>
      screen.getByRole<HTMLInputElement>('checkbox', { name: 'Seleccionar esta página' })
    const selectRow = (name: string) =>
      screen.getByRole<HTMLInputElement>('checkbox', { name: `Seleccionar ${name}` })
    await user.click(selectRow('Celia'))
    expect(selectPage().indeterminate).toBe(true)
    await user.click(selectPage())
    expect(selectRow('Ana').checked).toBe(true)
    await user.click(screen.getByRole('button', { name: 'Siguiente' }))
    expect(selectRow('Beatriz').checked).toBe(false)
    await user.click(screen.getByRole('button', { name: 'Anterior' }))
    expect(selectRow('Celia').checked).toBe(true)
  })

  it('supports controlled server pagination and sorting without transforming server rows', async () => {
    const user = userEvent.setup()
    const onSortingChange = vi.fn()
    const page = data.slice(0, 2)
    const options: DataTableOptions<Record> = {
      columns,
      data: page,
      manualPagination: true,
      manualSorting: true,
      manualFiltering: true,
      rowCount: 6,
    }
    function ServerTable() {
      const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 1, pageSize: 2 })
      const [sorting, setSorting] = useState<SortingState>([])
      const table = useDataTable({
        ...options,
        state: { pagination, sorting, globalFilter: 'sin coincidencias locales' },
        onPaginationChange: setPagination,
        onSortingChange: (update) => {
          setSorting(update)
          onSortingChange(update)
        },
      })
      return <DataTable table={table} aria-label="Clientes remotos" />
    }
    render(<ServerTable />)
    expect(screen.getByText('Celia')).toBeTruthy()
    await user.click(screen.getByRole('button', { name: 'Nombre' }))
    expect(onSortingChange).toHaveBeenCalledOnce()
    expect(screen.getByRole('columnheader', { name: 'Nombre' }).getAttribute('aria-sort')).toBe(
      'ascending',
    )
    await user.click(screen.getByRole('button', { name: 'Siguiente' }))
    expect(screen.getByRole('status').textContent).toBe('Página 3 de 3')
    expect(screen.getByRole('button', { name: 'Siguiente' }).hasAttribute('disabled')).toBe(true)
    expect(screen.getAllByRole('cell')[1]?.textContent).toBe('Celia')
  })

  it('shows loading and empty content across visible columns', async () => {
    const user = userEvent.setup()
    const { rerender } = render(<LocalTable loading />)
    await user.click(screen.getByRole('button', { name: 'Ocultar importe' }))
    fireEvent.change(screen.getByRole('textbox', { name: 'Filtrar' }), {
      target: { value: 'unknown' },
    })
    expect(screen.getByRole('table').getAttribute('aria-busy')).toBe('true')
    expect(screen.getByRole('cell', { name: 'Cargando…' }).getAttribute('colspan')).toBe('2')
    rerender(<LocalTable />)
    expect(screen.getByRole('cell', { name: 'Sin clientes' }).getAttribute('colspan')).toBe('2')
  })
})
