import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { expect, userEvent, within } from 'storybook/test'

import { Button } from '../button/button'
import { Card, CardContent } from '../card/card'
import {
  DataViewState,
  DataViewStateDescription,
  DataViewStateTitle,
} from '../data-view-state/data-view-state'
import { FormDialog } from '../form-dialog/form-dialog'
import { FormRow } from '../form-row/form-row'
import { Input } from '../input/input'
import { PageHeader, PageStack } from '../page-header/page-header'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../table/table'

const meta = {
  title: 'Application/Recipes/Interactive list',
  tags: ['test:ui'],
  parameters: {
    docs: {
      description: {
        component: 'Datos ficticios en memoria; la aplicación conecta su propia persistencia.',
      },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

function CustomerList() {
  const [customers, setCustomers] = useState(['Ana García', 'Bruno Pérez', 'Celia Torres'])
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const visible = customers.filter((customer) =>
    customer.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()),
  )

  return (
    <PageStack>
      <PageHeader
        heading="Clientes"
        description="Consulta y añade clientes."
        actions={<Button onPress={() => setOpen(true)}>Nuevo cliente</Button>}
      />
      <Card>
        <CardContent className="grid gap-4">
          <Input
            type="search"
            aria-label="Buscar clientes"
            placeholder="Buscar clientes…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          {visible.length ? (
            <Table>
              <TableCaption>Clientes disponibles</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead scope="col">Nombre</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {visible.map((customer, index) => (
                  <TableRow key={`${customer}-${index}`}>
                    <TableCell>{customer}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <DataViewState>
              <DataViewStateTitle>Sin resultados</DataViewStateTitle>
              <DataViewStateDescription>Prueba con otra búsqueda.</DataViewStateDescription>
            </DataViewState>
          )}
        </CardContent>
      </Card>
      <FormDialog
        open={open}
        onOpenChange={setOpen}
        title="Nuevo cliente"
        description="Añade un nombre al listado de ejemplo."
        onSubmit={(event) => {
          const name = String(new FormData(event.currentTarget).get('name') ?? '').trim()
          if (!name) return
          setCustomers((current) => [...current, name])
          setQuery('')
          setOpen(false)
        }}
      >
        <FormRow label="Nombre" required hint="Usa el nombre completo.">
          {(props) => <Input {...props} name="name" />}
        </FormRow>
      </FormDialog>
    </PageStack>
  )
}

export const Listado: Story = {
  render: () => <CustomerList />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const search = canvas.getByRole('searchbox', { name: 'Buscar clientes' })
    await userEvent.type(search, 'inexistente')
    await expect(canvas.getByText('Sin resultados')).toBeVisible()
    await userEvent.clear(search)
    await userEvent.click(canvas.getByRole('button', { name: 'Nuevo cliente' }))
    const dialog = within(document.body).getByRole('dialog', { name: 'Nuevo cliente' })
    await userEvent.type(within(dialog).getByRole('textbox', { name: /Nombre/ }), 'David Ruiz')
    await userEvent.click(within(dialog).getByRole('button', { name: 'Guardar' }))
    await expect(canvas.getByText('David Ruiz')).toBeVisible()
  },
}
