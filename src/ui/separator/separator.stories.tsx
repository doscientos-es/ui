import type { Meta, StoryObj } from '@storybook/react-vite'

import { Separator } from './separator'

const meta = {
  title: 'Components/Layout/Separator',
  component: Separator,
  tags: ['test:ui'],
} satisfies Meta<typeof Separator>
export default meta
type Story = StoryObj<typeof meta>

export const Horizontal: Story = {
  render: () => (
    <div className="w-80 space-y-3">
      <p className="text-sm font-medium">Cuenta</p>
      <Separator />
      <p className="text-muted-foreground text-sm">Preferencias de facturación y acceso.</p>
    </div>
  ),
}
export const Vertical: Story = {
  render: () => (
    <div className="flex h-5 items-center gap-3 text-sm">
      <span>Perfil</span>
      <Separator orientation="vertical" />
      <span>Equipo</span>
      <Separator orientation="vertical" />
      <span>Facturación</span>
    </div>
  ),
}
