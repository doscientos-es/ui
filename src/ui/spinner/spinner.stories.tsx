import type { Meta, StoryObj } from '@storybook/react-vite'

import { Spinner } from './spinner'

const meta = {
  title: 'Components/Feedback/Spinner',
  component: Spinner,
  args: { label: 'Cargando resultados' },
  argTypes: {
    size: { control: 'select', options: ['sm', 'default', 'md', 'lg'] },
    speed: { control: 'select', options: ['slow', 'normal', 'fast'] },
  },
} satisfies Meta<typeof Spinner>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Spinner size="sm" label="Cargando pequeño" />
      <Spinner size="default" label="Cargando normal" />
      <Spinner size="md" label="Cargando mediano" />
      <Spinner size="lg" label="Cargando grande" />
    </div>
  ),
}
