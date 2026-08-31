import type { Meta, StoryObj } from '@storybook/react-vite'

import { LoadingOverlay } from './loading-overlay'
const meta = { title: 'Application/LoadingOverlay', component: LoadingOverlay } satisfies Meta<
  typeof LoadingOverlay
>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {
  render: () => (
    <div className="border-border bg-background relative h-48 rounded-xl border">
      <LoadingOverlay label="Cargando clientes" />
    </div>
  ),
}
