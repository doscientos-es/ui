import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'

import { Button } from '../button/button'
import { DangerZone } from './danger-zone'

const meta = {
  title: 'Components/Feedback/Danger Zone',
  component: DangerZone,
  args: { children: <Button variant="destructive">Eliminar espacio de ejemplo</Button> },
} satisfies Meta<typeof DangerZone>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole('button', { name: /Zona de peligro/ })
    trigger.focus()
    await userEvent.keyboard('{Enter}')
    await expect(trigger).toHaveAttribute('aria-expanded', 'true')
    await expect(canvas.getByRole('button', { name: 'Eliminar espacio de ejemplo' })).toBeVisible()
  },
}
export const Expanded: Story = { args: { defaultOpen: true } }
