import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, waitFor, within } from 'storybook/test'

import { Button } from '../button/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './dropdown-menu'
const meta = {
  title: 'Components/Navigation/Dropdown Menu',
  component: DropdownMenu,
  args: { children: null, trigger: '' },
} satisfies Meta<typeof DropdownMenu>
export default meta
type Story = StoryObj<typeof meta>
export const Actions: Story = {
  render: () => (
    <DropdownMenu trigger="Acciones" triggerProps={{ variant: 'outline' }}>
      <DropdownMenuItem id="edit">Editar</DropdownMenuItem>
      <DropdownMenuItem id="duplicate">Duplicar</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem id="delete" variant="destructive">
        Eliminar
      </DropdownMenuItem>
    </DropdownMenu>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const page = within(canvasElement.ownerDocument.body)

    await userEvent.click(canvas.getByRole('button', { name: 'Acciones' }))
    await waitFor(() => expect(page.getByRole('menuitem', { name: 'Editar' })).toBeVisible())
    const editItem = page.getByRole('menuitem', { name: 'Editar' })
    await userEvent.click(editItem)
    await waitFor(() =>
      expect(page.queryByRole('menuitem', { name: 'Editar' })).not.toBeInTheDocument(),
    )
  },
}

export const AdvancedComposition: Story = {
  render: () => (
    <DropdownMenuTrigger>
      <Button variant="outline">Acciones avanzadas</Button>
      <DropdownMenuContent>
        <DropdownMenuItem id="edit">Editar</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenuTrigger>
  ),
}
