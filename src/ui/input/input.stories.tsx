import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'

import { Label } from '../label/label'
import { Input } from './input'

const meta = {
  title: 'Components/Forms/Input',
  component: Input,
  args: { 'aria-label': 'Nombre', placeholder: 'Escribe tu nombre', className: 'w-80' },
} satisfies Meta<typeof Input>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByRole('textbox', { name: 'Nombre' })
    await userEvent.type(input, 'Ana García')
    await expect(input).toHaveValue('Ana García')
  },
}
export const WithLabel: Story = {
  render: (args) => (
    <div className="grid w-80 gap-2">
      <Label htmlFor="input-company">Empresa</Label>
      <Input {...args} id="input-company" aria-label={undefined} placeholder="Doscientos" />
    </div>
  ),
}
export const Invalid: Story = { args: { 'aria-invalid': true, defaultValue: 'dato incorrecto' } }
export const Disabled: Story = { args: { disabled: true, defaultValue: 'No editable' } }
