import type { Meta, StoryObj } from '@storybook/react-vite'

import { Input } from '../input/input'
import { TableNumber, TableToolbar } from '../table/table'
import {
  createDataTableSelectionColumn,
  DataTable,
  useDataTable,
  type DataTableColumn,
} from './data-table'

const invoices = [
  { id: 'F-004', client: 'Studio Norte', amount: 780 },
  { id: 'F-003', client: 'Casa Olivo', amount: 1240 },
  { id: 'F-002', client: 'Taller Albor', amount: 420 },
]
type Invoice = (typeof invoices)[number]
const currency = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' })
const columns: DataTableColumn<Invoice>[] = [
  createDataTableSelectionColumn({ rowLabel: (row: Invoice) => `Seleccionar factura ${row.id}` }),
  { accessorKey: 'id', header: 'Factura' },
  { accessorKey: 'client', header: 'Cliente' },
  {
    accessorKey: 'amount',
    header: 'Importe',
    cell: ({ row }) => <TableNumber>{currency.format(row.original.amount)}</TableNumber>,
  },
]

function InvoiceTable({ empty = false, loading = false }) {
  const table = useDataTable({
    data: empty || loading ? emptyInvoices : invoices,
    columns,
    getRowId: (row) => row.id,
    initialState: { pagination: { pageIndex: 0, pageSize: 2 } },
  })
  return (
    <>
      <TableToolbar>
        <Input
          aria-label="Filtrar facturas"
          placeholder="Buscar factura o cliente…"
          className="w-64"
          onChange={(event) => table.setGlobalFilter(event.target.value)}
        />
      </TableToolbar>
      <DataTable
        table={table}
        aria-label="Facturas"
        loading={loading}
        emptyContent="No hay facturas."
      />
    </>
  )
}

const emptyInvoices: Invoice[] = []
const meta = {
  title: 'Components/Data Display/DataTable',
  component: InvoiceTable,
  tags: ['test:ui'],
} satisfies Meta<typeof InvoiceTable>
export default meta
type Story = StoryObj<typeof meta>

export const Interactive: Story = {}
export const Loading: Story = { args: { loading: true } }
export const Empty: Story = { args: { empty: true } }
