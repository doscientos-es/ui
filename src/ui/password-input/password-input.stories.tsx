import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'

import { PasswordInput } from './password-input'
import { PasswordRequirementsIndicator } from './password-requirements-indicator'

const meta = {
  title: 'Components/Forms/Password Input',
  component: PasswordInput,
  args: { 'aria-label': 'Contraseña', autoComplete: 'new-password' },
} satisfies Meta<typeof PasswordInput>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByLabelText('Contraseña')
    await userEvent.click(input)
    await userEvent.type(input, 'demo-password')
    await userEvent.tab()
    await expect(canvas.getByRole('button', { name: 'Mostrar contraseña' })).toHaveFocus()
    await userEvent.keyboard(' ')
    await expect(input).toHaveAttribute('type', 'text')
    await userEvent.keyboard(' ')
    await expect(input).toHaveAttribute('type', 'password')
  },
}
export const Disabled: Story = { args: { disabled: true, defaultValue: 'demo-password' } }
export const ReadOnly: Story = { args: { readOnly: true, defaultValue: 'demo-password' } }
export const Invalid: Story = {
  args: { 'aria-invalid': true, 'aria-describedby': 'password-error' },
  render: (args) => (
    <div>
      <PasswordInput {...args} />
      <p id="password-error" className="text-destructive mt-2 text-sm">
        Usa al menos ocho caracteres.
      </p>
    </div>
  ),
}
export const Requirements: Story = {
  args: {
    indicator: (
      <PasswordRequirementsIndicator
        isValid={false}
        progress={50}
        label="La mitad de los requisitos cumplidos"
      />
    ),
  },
}
