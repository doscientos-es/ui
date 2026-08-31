import type { Meta, StoryObj } from '@storybook/react-vite'

import { Badge } from '../badge/badge'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from './table'

const meta = {
  title: 'Components/Data Display/Table',
  component: Table,
  tags: ['test:ui'],
} satisfies Meta<typeof Table>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Table className="min-w-144">
      <TableCaption>Últimas facturas emitidas.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Factura</TableHead>
          <TableHead>Cliente</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead className="text-right">Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>2026-018</TableCell>
          <TableCell>Acme S.L.</TableCell>
          <TableCell>
            <Badge variant="success">Pagada</Badge>
          </TableCell>
          <TableCell className="text-right">1.452,00 €</TableCell>
        </TableRow>
        <TableRow data-state="selected">
          <TableCell>2026-019</TableCell>
          <TableCell>Studio Norte</TableCell>
          <TableCell>
            <Badge variant="warning">Pendiente</Badge>
          </TableCell>
          <TableCell className="text-right">780,00 €</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">2.232,00 €</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
}
