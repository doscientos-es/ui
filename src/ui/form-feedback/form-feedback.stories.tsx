import type { Meta, StoryObj } from '@storybook/react-vite'

import { FormFeedback } from './form-feedback'
const meta = {
  title: 'Components/Feedback/Form Feedback',
  component: FormFeedback,
  args: { state: { status: 'success' } },
} satisfies Meta<typeof FormFeedback>
export default meta
type Story = StoryObj<typeof meta>
export const Success: Story = {}
export const Pending: Story = { args: { state: { status: 'pending' } } }
export const Error: Story = { args: { state: { status: 'error', message: 'No se pudo guardar.' } } }
