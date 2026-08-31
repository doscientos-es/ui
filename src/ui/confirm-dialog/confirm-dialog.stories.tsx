import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { expect, fn, userEvent, waitFor, within } from 'storybook/test'

import { Button } from '../button/button'
import { ConfirmDialog } from './confirm-dialog'

const meta = {
  title: 'Components/Overlays/Confirm Dialog',
  component: ConfirmDialog,
  args: {
    open: false,
    onOpenChange: fn(),
    title: 'Eliminar cliente',
    description: 'Esta acción no se puede deshacer.',
    destructive: true,
    confirmLabel: 'Eliminar',
    onConfirm: fn(),
  },
  render: function Render(args) {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button variant="destructive" onPress={() => setOpen(true)}>
          Eliminar cliente
        </Button>
        <ConfirmDialog {...args} open={open} onOpenChange={setOpen} />
      </>
    )
  },
} satisfies Meta<typeof ConfirmDialog>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Pending: Story = { args: { pending: true, confirmLabel: 'Eliminando…' } }
export const ConfirmationFlow: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement)
    const page = within(canvasElement.ownerDocument.body)
    await userEvent.click(canvas.getByRole('button', { name: 'Eliminar cliente' }))
    await waitFor(() =>
      expect(page.getByRole('alertdialog', { name: 'Eliminar cliente' })).toBeVisible(),
    )
    await userEvent.click(page.getByRole('button', { name: 'Eliminar' }))
    await expect(args.onConfirm).toHaveBeenCalledOnce()
  },
}
