import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { expect, userEvent, within } from 'storybook/test'

import { TextareaField, TextField } from './text-field'

const meta = {
  title: 'Components/Forms/Text field',
  component: TextField,
  tags: ['test:ui'],
} satisfies Meta<typeof TextField>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { label: 'Nombre', description: 'Usa el nombre completo.', className: 'w-80' },
  render: function Render(args) {
    const [value, setValue] = useState('')
    return <TextField {...args} value={value} onChange={setValue} />
  },
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByRole('textbox', { name: 'Nombre' })
    await userEvent.type(input, 'Ana García')
    await expect(input).toHaveValue('Ana García')
  },
}

export const Invalid: Story = {
  args: {
    label: 'Email',
    type: 'email',
    defaultValue: 'incorrecto',
    errorMessage: 'Email inválido.',
  },
}

export const Multiline: Story = {
  args: { label: 'Observaciones' },
  render: () => (
    <TextareaField label="Observaciones" description="Información para el equipo." rows={4} />
  ),
}

export const Disabled: Story = {
  args: { label: 'Nombre', defaultValue: 'No editable', disabled: true },
}

export const PrefixAndSuffix: Story = {
  args: { label: 'Precio', prefix: '€', suffix: 'por hora', defaultValue: '25' },
}
