import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, waitFor, within } from 'storybook/test'

import { Button } from '../button/button'
import { Input } from '../input/input'
import { LoadingOverlay } from '../loading-overlay/loading-overlay'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from './dialog'

const meta = {
  title: 'Components/Overlays/Dialog',
  component: Dialog,
  tags: ['test:ui'],
  args: { children: null },
} satisfies Meta<typeof Dialog>
export default meta
type Story = StoryObj<typeof meta>

export const Information: Story = {
  render: () => (
    <Dialog trigger="Ver información" triggerProps={{ variant: 'outline' }}>
      <DialogHeader>
        <DialogTitle>Factura enviada</DialogTitle>
        <DialogDescription>El cliente recibirá un enlace seguro por email.</DialogDescription>
      </DialogHeader>
      <p className="text-muted-foreground text-sm">
        Podrás consultar el estado desde el historial.
      </p>
      <DialogFooter>
        <DialogClose variant="outline">Entendido</DialogClose>
      </DialogFooter>
    </Dialog>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const page = within(canvasElement.ownerDocument.body)

    await userEvent.click(canvas.getByRole('button', { name: 'Ver información' }))
    await waitFor(() => expect(page.getByRole('dialog', { name: 'Factura enviada' })).toBeVisible())
    await userEvent.click(page.getByRole('button', { name: 'Entendido' }))
    await waitFor(() => expect(page.queryByRole('dialog')).not.toBeInTheDocument())
  },
}

export const Form: Story = {
  render: () => (
    <Dialog trigger="Editar cliente" triggerProps={{ variant: 'outline' }}>
      <DialogHeader>
        <DialogTitle>Editar cliente</DialogTitle>
        <DialogDescription>Actualiza los datos de contacto.</DialogDescription>
      </DialogHeader>
      <div className="grid gap-3">
        <label className="grid gap-1 text-sm" htmlFor="dialog-client-name">
          Nombre
          <Input id="dialog-client-name" defaultValue="Ana García" />
        </label>
        <label className="grid gap-1 text-sm" htmlFor="dialog-client-email">
          Email
          <Input id="dialog-client-email" type="email" defaultValue="ana@ejemplo.es" />
        </label>
      </div>
      <DialogFooter>
        <DialogClose variant="outline">Cancelar</DialogClose>
        <DialogClose asChild>
          <Button>Guardar cambios</Button>
        </DialogClose>
      </DialogFooter>
    </Dialog>
  ),
}

export const LongContent: Story = {
  render: () => (
    <Dialog trigger="Ver condiciones" triggerProps={{ variant: 'outline' }}>
      <DialogHeader>
        <DialogTitle>Condiciones del servicio</DialogTitle>
        <DialogDescription>El contenido se desplaza sin superar el viewport.</DialogDescription>
      </DialogHeader>
      <div className="space-y-4 text-sm">
        {Array.from({ length: 16 }, (_, index) => (
          <p key={index}>
            {index + 1}. Estas condiciones detallan el alcance, las responsabilidades y los plazos
            aplicables al servicio contratado.
          </p>
        ))}
      </div>
      <DialogFooter>
        <DialogClose variant="outline">Cerrar</DialogClose>
      </DialogFooter>
    </Dialog>
  ),
}

export const Loading: Story = {
  render: () => (
    <Dialog trigger="Consultar historial" triggerProps={{ variant: 'outline' }}>
      <DialogHeader>
        <DialogTitle>Historial de actividad</DialogTitle>
        <DialogDescription>Estamos recuperando los últimos movimientos.</DialogDescription>
      </DialogHeader>
      <div className="relative min-h-32" aria-busy="true">
        <LoadingOverlay label="Cargando historial" />
      </div>
      <DialogFooter>
        <DialogClose variant="outline">Cerrar</DialogClose>
      </DialogFooter>
    </Dialog>
  ),
}

export const AdvancedComposition: Story = {
  render: () => (
    <DialogRoot>
      <DialogTrigger asChild>
        <Button variant="outline">Abrir composición avanzada</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Diálogo compuesto</DialogTitle>
      </DialogContent>
    </DialogRoot>
  ),
}
