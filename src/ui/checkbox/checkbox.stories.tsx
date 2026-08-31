import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'

import { Checkbox } from './checkbox'

const meta = { title: 'Components/Forms/Checkbox', component: Checkbox } satisfies Meta<
  typeof Checkbox
>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { children: 'Enviar un recordatorio' },
  play: async ({ canvasElement }) => {
    const checkbox = within(canvasElement).getByRole('checkbox', { name: 'Enviar un recordatorio' })

    await expect(checkbox).not.toBeChecked()
    await userEvent.click(checkbox)
    await expect(checkbox).toBeChecked()
    await userEvent.keyboard('{Space}')
    await expect(checkbox).not.toBeChecked()
  },
}
export const Selected: Story = {
  args: { children: 'Enviar un recordatorio', defaultSelected: true },
}
export const Disabled: Story = {
  args: { children: 'Enviar un recordatorio', isDisabled: true },
  play: async ({ canvasElement }) => {
    const checkbox = within(canvasElement).getByRole('checkbox', { name: 'Enviar un recordatorio' })

    await expect(checkbox).toBeDisabled()
    await userEvent.click(checkbox)
    await expect(checkbox).not.toBeChecked()
  },
}
