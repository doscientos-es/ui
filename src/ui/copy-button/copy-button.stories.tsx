import type { Meta, StoryObj } from '@storybook/react-vite'

import { CopyButton } from './copy-button'

const meta = {
  title: 'Components/Actions/CopyButton',
  component: CopyButton,
  tags: ['test:ui'],
  args: { value: 'CON-2026-001' },
} satisfies Meta<typeof CopyButton>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const CustomLabel: Story = {
  args: { children: 'Copiar referencia', variant: 'outline' },
}
