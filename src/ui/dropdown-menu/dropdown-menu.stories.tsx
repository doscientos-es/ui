import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, waitFor, within } from 'storybook/test'

import { Button } from '../button/button'
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './dropdown-menu'
const meta = {
  title: 'Components/Navigation/Dropdown Menu',
  component: DropdownMenu,
} satisfies Meta<typeof DropdownMenu>
export default meta
type Story = StoryObj<typeof meta>
export const Actions: Story = {
  render: () => (
    <DropdownMenuTrigger>
      <Button variant="outline">Acciones</Button>
      <DropdownMenu>
        <DropdownMenuItem id="edit">Editar</DropdownMenuItem>
        <DropdownMenuItem id="duplicate">Duplicar</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem id="delete" variant="destructive">
          Eliminar
        </DropdownMenuItem>
      </DropdownMenu>
    </DropdownMenuTrigger>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const page = within(canvasElement.ownerDocument.body)

    await userEvent.click(canvas.getByRole('button', { name: 'Acciones' }))
    const editItem = await page.findByRole('menuitem', { name: 'Editar' })
    await expect(editItem).toBeVisible()
    await userEvent.click(editItem)
    await waitFor(() => expect(page.queryByRole('menuitem', { name: 'Editar' })).not.toBeInTheDocument())
  },
}
