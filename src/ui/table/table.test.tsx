import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableEmpty,
  TableFooter,
  TableHead,
  TableHeader,
  TableLoading,
  TableRow,
} from './table'

describe('Table', () => {
  it('preserves native table semantics and regions', () => {
    render(
      <Table>
        <TableCaption>Facturas recientes</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Cliente</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Acme</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>Total: 1</TableCell>
          </TableRow>
        </TableFooter>
      </Table>,
    )
    expect(screen.getByRole('table', { name: 'Facturas recientes' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Cliente' })).toBeTruthy()
    expect(screen.getByText('Total: 1').closest('tfoot')?.getAttribute('data-slot')).toBe(
      'table-footer',
    )
  })
})

it('provides semantic empty and loading rows', () => {
  render(
    <Table>
      <TableBody>
        <TableEmpty colSpan={2} />
        <TableLoading colSpan={2} />
      </TableBody>
    </Table>,
  )
  expect(screen.getByText('No hay resultados.').closest('td')?.getAttribute('colspan')).toBe('2')
  expect(screen.getByText('Cargando…').closest('tr')?.getAttribute('aria-busy')).toBe('true')
})
