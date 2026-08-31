import type { Meta, StoryObj } from '@storybook/react-vite'

import { SubmitButton } from './submit-button'
const meta = { title: 'Components/Forms/Submit Button', component: SubmitButton } satisfies Meta<
  typeof SubmitButton
>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = { args: { children: 'Guardar cambios' } }
export const Loading: Story = { args: { children: 'Guardar cambios', loading: true } }
