import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, waitFor, within } from 'storybook/test'

import { Button } from '../button/button'
import { DrawerDescription, DrawerTitle, DrawerTrigger } from '../drawer/drawer'
import {
  DetailDrawer,
  DetailDrawerBody,
  DetailDrawerFooter,
  DetailDrawerHeader,
} from './detail-drawer'

const meta = {
  title: 'Application/DetailDrawer',
  component: DetailDrawer,
  tags: ['test:ui'],
  args: { children: null },
} satisfies Meta<typeof DetailDrawer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <DrawerTrigger>
      <Button variant="outline">Abrir cliente</Button>
      <DetailDrawer>
        <DetailDrawerHeader>
          <DrawerTitle>Cliente · Acme</DrawerTitle>
          <DrawerDescription>Ficha rápida del cliente.</DrawerDescription>
        </DetailDrawerHeader>
        <DetailDrawerBody>
          <p>Contenido de la ficha.</p>
        </DetailDrawerBody>
        <DetailDrawerFooter>
          <Button slot="close">Cerrar ficha</Button>
        </DetailDrawerFooter>
      </DetailDrawer>
    </DrawerTrigger>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const page = within(canvasElement.ownerDocument.body)

    await userEvent.click(canvas.getByRole('button', { name: 'Abrir cliente' }))
    await waitFor(() => expect(page.getByRole('dialog', { name: 'Cliente · Acme' })).toBeVisible())
  },
}
