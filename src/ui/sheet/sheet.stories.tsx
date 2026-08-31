import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, waitFor, within } from 'storybook/test'

import { Button } from '../button/button'
import { Input } from '../input/input'
import {
  Sheet,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './sheet'

const meta = {
  title: 'Components/Overlays/Sheet',
  component: Sheet,
  tags: ['test:ui'],
  args: { children: null },
} satisfies Meta<typeof Sheet>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <SheetTrigger>
      <Button variant="outline">Editar perfil</Button>
      <Sheet>
        <SheetHeader>
          <SheetTitle>Editar perfil</SheetTitle>
          <SheetDescription>Actualiza los datos públicos de tu cuenta.</SheetDescription>
        </SheetHeader>
        <div className="grid gap-3 px-4">
          <label className="grid gap-1 text-sm" htmlFor="sheet-name">
            Nombre
            <Input id="sheet-name" defaultValue="Ana García" />
          </label>
        </div>
        <SheetFooter>
          <Button slot="close">Guardar cambios</Button>
        </SheetFooter>
      </Sheet>
    </SheetTrigger>
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
    <SheetTrigger>
      <Button variant="outline">Abrir navegación</Button>
      <Sheet side="left">
        <SheetHeader>
          <SheetTitle>Navegación</SheetTitle>
          <SheetDescription>Accede a las áreas principales.</SheetDescription>
        </SheetHeader>
      </Sheet>
    </SheetTrigger>
  ),
}
