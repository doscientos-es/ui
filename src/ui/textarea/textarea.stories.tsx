import type { Meta, StoryObj } from '@storybook/react-vite'

import { Textarea } from './textarea'

const meta = {
  title: 'Components/Forms/Textarea',
  component: Textarea,
  args: { 'aria-label': 'Notas', placeholder: 'Añade contexto…', className: 'w-96' },
} satisfies Meta<typeof Textarea>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const WithContent: Story = {
  args: { defaultValue: 'El cliente prefiere recibir las actualizaciones por email.' },
}
export const Invalid: Story = {
  args: { 'aria-invalid': true, defaultValue: 'Contenido no válido' },
}
export const Disabled: Story = { args: { disabled: true, defaultValue: 'Solo lectura' } }
