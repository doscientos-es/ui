import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, waitFor, within } from 'storybook/test'

import { Button } from '../button/button'
import { Menu, MenuContent, MenuItem, MenuTrigger } from './menu'

const meta = { title: 'Components/Navigation/Menu', component: Menu } satisfies Meta<typeof Menu>
export default meta
type Story = StoryObj<typeof meta>

export const Actions: Story = {
  render: () => (
    <MenuTrigger>
      <Button variant="outline">Acciones</Button>
      <MenuContent>
        <Menu aria-label="Acciones de cliente">
          <MenuItem id="edit">Editar</MenuItem>
          <MenuItem id="archive">Archivar</MenuItem>
          <MenuItem id="delete" className="text-destructive">
            Eliminar
          </MenuItem>
        </Menu>
      </MenuContent>
    </MenuTrigger>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const page = within(canvasElement.ownerDocument.body)
    const trigger = canvas.getByRole('button', { name: 'Acciones' })

    await userEvent.click(trigger)
    await waitFor(() => expect(page.getByRole('menuitem', { name: 'Editar' })).toBeVisible())
    await userEvent.keyboard('{Escape}')
    await waitFor(() =>
      expect(page.queryByRole('menuitem', { name: 'Editar' })).not.toBeInTheDocument(),
    )
    await expect(trigger).toHaveFocus()
  },
}
