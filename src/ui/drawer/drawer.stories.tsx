import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, waitFor, within } from 'storybook/test'

import { Button } from '../button/button'
import { Input } from '../input/input'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from './drawer'

const meta = {
  title: 'Components/Overlays/Drawer',
  component: Drawer,
  tags: ['test:ui'],
  args: { children: null, trigger: '' },
} satisfies Meta<typeof Drawer>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Drawer trigger="Editar perfil" triggerProps={{ variant: 'outline' }}>
      <DrawerHeader>
        <DrawerTitle>Editar perfil</DrawerTitle>
        <DrawerDescription>Actualiza los datos públicos de tu cuenta.</DrawerDescription>
      </DrawerHeader>
      <div className="grid gap-3 px-4">
        <label className="grid gap-1 text-sm" htmlFor="drawer-name">
          Nombre
          <Input id="drawer-name" defaultValue="Ana García" />
        </label>
      </div>
      <DrawerFooter>
        <Button slot="close">Guardar cambios</Button>
      </DrawerFooter>
    </Drawer>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const page = within(canvasElement.ownerDocument.body)

    await userEvent.click(canvas.getByRole('button', { name: 'Editar perfil' }))
    await waitFor(() => expect(page.getByRole('dialog', { name: 'Editar perfil' })).toBeVisible())
    await userEvent.click(page.getByRole('button', { name: 'Cerrar' }))
    await waitFor(() => expect(page.queryByRole('dialog')).not.toBeInTheDocument())
  },
}

export const FromLeft: Story = {
  render: () => (
    <Drawer trigger="Abrir navegación" triggerProps={{ variant: 'outline' }} side="left">
      <DrawerHeader>
        <DrawerTitle>Navegación</DrawerTitle>
        <DrawerDescription>Accede a las áreas principales.</DrawerDescription>
      </DrawerHeader>
    </Drawer>
  ),
}

export const AdvancedComposition: Story = {
  render: () => (
    <DrawerTrigger>
      <Button variant="outline">Abrir composición avanzada</Button>
      <DrawerContent>
        <DrawerTitle>Panel compuesto</DrawerTitle>
      </DrawerContent>
    </DrawerTrigger>
  ),
}
