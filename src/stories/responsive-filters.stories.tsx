import type { Meta, StoryObj } from '@storybook/react-vite'
import { useId, useState } from 'react'
import { expect, userEvent, waitFor, within } from 'storybook/test'

import { DialogClose } from '../ui/dialog/dialog'
import { Input } from '../ui/input/input'
import { Popover } from '../ui/popover/popover'
import { ResponsiveDialog } from '../ui/responsive-dialog/responsive-dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectList,
  SelectTrigger,
  SelectValue,
} from '../ui/select/select'

const title = 'Filtros de pedidos'
const description = 'Refina el listado por cliente o estado.'

function ResponsiveFilters() {
  const clientId = useId()
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('Todos')

  return (
    <div className="space-y-3">
      <ResponsiveDialog
        title={title}
        description={description}
        trigger="Filtrar pedidos"
        triggerProps={{ variant: 'outline' }}
      >
        <div className="grid gap-4">
          <label htmlFor={clientId} className="grid gap-1.5 text-sm font-medium">
            Cliente
            <Input id={clientId} value={query} onChange={(event) => setQuery(event.target.value)} />
          </label>
          <Select
            aria-label="Estado"
            selectedKey={status}
            onSelectionChange={(key) => setStatus(String(key ?? 'Todos'))}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectList>
                {['Todos', 'Pendientes', 'Completados'].map((option) => (
                  <SelectItem key={option} id={option} textValue={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectList>
            </SelectContent>
          </Select>
          <Popover
            trigger="Ayuda sobre estados"
            triggerProps={{ variant: 'outline' }}
            className="max-w-64"
          >
            <p className="p-2">Los pedidos completados ya se han entregado.</p>
          </Popover>
          <DialogClose>Ver resultados</DialogClose>
        </div>
      </ResponsiveDialog>
      <p className="text-muted-foreground text-sm">
        Estado: {status}
        {query && ` · Cliente: ${query}`}
      </p>
    </div>
  )
}

const meta = { title: 'Application/Recipes/Responsive filters', tags: ['test:ui'] } satisfies Meta
export default meta

export const Filters: StoryObj<typeof meta> = {
  render: () => <ResponsiveFilters />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const page = within(canvasElement.ownerDocument.body)
    const trigger = canvas.getByRole('button', { name: 'Filtrar pedidos' })
    await userEvent.click(trigger)

    const panel = await page.findByRole('dialog', { name: title })
    const viewport = canvasElement.ownerDocument.defaultView
    const isMobile = viewport?.matchMedia('(max-width: 47.99rem)').matches
    if (isMobile) await expect(panel.closest('[data-slot="bottom-sheet"]')).not.toBeNull()
    else await expect(panel).toHaveAttribute('data-slot', 'dialog-content')
    await expect(panel).toHaveAccessibleDescription(description)
    const inside = within(panel)
    const client = inside.getByRole('textbox', { name: 'Cliente' })
    await userEvent.type(client, 'Ana')
    const select = inside.getByRole('button', { name: /Estado/ })
    await userEvent.click(select)
    await userEvent.click(await page.findByRole('option', { name: 'Pendientes' }))
    await expect(select).toHaveTextContent('Pendientes')

    const help = inside.getByRole('button', { name: 'Ayuda sobre estados' })
    await userEvent.click(help)
    const message = await page.findByText('Los pedidos completados ya se han entregado.')
    await waitFor(() => expect(message).toBeVisible())
    await userEvent.keyboard('{Escape}')
    await waitFor(() => expect(message).not.toBeInTheDocument())
    await waitFor(() => expect(help).toHaveFocus())
    await expect(panel).toBeVisible()

    await userEvent.keyboard('{Escape}')
    await waitFor(() => expect(panel).not.toBeInTheDocument())
    await waitFor(() => expect(trigger).toHaveFocus())
    await expect(canvas.getByText('Estado: Pendientes · Cliente: Ana')).toBeVisible()
  },
}
