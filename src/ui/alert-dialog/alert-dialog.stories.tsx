import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { expect, userEvent, waitFor, within } from 'storybook/test'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './alert-dialog'

const meta = {
  title: 'Components/Overlays/Alert Dialog',
  component: AlertDialog,
  args: { open: false, onOpenChange: () => undefined, children: null },
} satisfies Meta<typeof AlertDialog>
export default meta
type Story = StoryObj<typeof meta>

export const Confirmation: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false)
    return (
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger variant="destructive">Eliminar ejemplo</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar este ejemplo?</AlertDialogTitle>
            <AlertDialogDescription>Esta acción no se puede deshacer.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel />
            <AlertDialogAction variant="destructive" onPress={() => setOpen(false)}>
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const body = within(canvasElement.ownerDocument.body)
    const trigger = canvas.getByRole('button', { name: 'Eliminar ejemplo' })
    await userEvent.click(trigger)
    const dialog = await body.findByRole('alertdialog', { name: '¿Eliminar este ejemplo?' })
    await waitFor(() => expect(dialog).toBeVisible())
    await waitFor(() => expect(body.getByRole('button', { name: 'Cancelar' })).toHaveFocus())
    await userEvent.keyboard('{Escape}')
    await waitFor(() => expect(body.queryByRole('alertdialog')).not.toBeInTheDocument())
    await waitFor(() => expect(trigger).toHaveFocus())
  },
}
