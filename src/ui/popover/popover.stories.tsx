import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { expect, userEvent, waitFor, within } from 'storybook/test'

import { Button } from '../button/button'
import { Checkbox } from '../checkbox/checkbox'
import { Popover, PopoverContent, PopoverTrigger } from './popover'

const meta = {
  title: 'Components/Overlays/Popover',
  component: PopoverContent,
  tags: ['test:ui'],
} satisfies Meta<typeof PopoverContent>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Popover
      trigger="Ver detalles"
      triggerProps={{ variant: 'outline' }}
      title="Cliente activo"
      description="Actualizado hace 2 minutos."
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const page = within(canvasElement.ownerDocument.body)
    await userEvent.click(canvas.getByRole('button', { name: 'Ver detalles' }))
    const dialog = await page.findByRole('dialog', { name: 'Cliente activo' })
    await expect(dialog).toHaveAccessibleDescription('Actualizado hace 2 minutos.')
    await userEvent.keyboard('{Escape}')
    await waitFor(() => expect(page.queryByText('Cliente activo')).not.toBeInTheDocument())
    await expect(canvas.getByRole('button', { name: 'Ver detalles' })).toHaveFocus()
  },
}

function FiltersPopover() {
  const [isOpen, setIsOpen] = useState(false)
  const [onlyOverdue, setOnlyOverdue] = useState(false)

  return (
    <Popover
      trigger="Filtrar facturas"
      triggerProps={{ variant: 'outline' }}
      title="Estado de las facturas"
      description="Refina los resultados del listado."
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-72"
    >
      <div className="space-y-4">
        <Checkbox isSelected={onlyOverdue} onChange={setOnlyOverdue}>
          Mostrar solo vencidas
        </Checkbox>
        <div className="flex justify-end">
          <Button size="sm" onPress={() => setIsOpen(false)}>
            Aplicar filtros
          </Button>
        </div>
      </div>
    </Popover>
  )
}

export const AdvancedComposition: Story = {
  render: () => (
    <PopoverTrigger>
      <Button variant="ghost">Opciones</Button>
      <PopoverContent>
        <div className="p-2 text-sm">Contenido contextual accesible.</div>
      </PopoverContent>
    </PopoverTrigger>
  ),
}

export const Filters: Story = {
  render: () => <FiltersPopover />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const page = within(canvasElement.ownerDocument.body)
    const trigger = canvas.getByRole('button', { name: 'Filtrar facturas' })

    await userEvent.click(trigger)
    const checkbox = await page.findByRole('checkbox', { name: 'Mostrar solo vencidas' })
    await userEvent.click(checkbox)
    await expect(checkbox).toBeChecked()
    await userEvent.click(page.getByRole('button', { name: 'Aplicar filtros' }))
    await waitFor(() => expect(page.queryByText('Estado de las facturas')).not.toBeInTheDocument())
    await expect(trigger).toHaveFocus()
  },
}
