import type { Meta, StoryObj } from '@storybook/react-vite'
import { ArrowRight, Plus } from 'lucide-react'

import { Button, LinkButton } from './button'

const meta = {
  title: 'Components/Actions/Button',
  component: Button,
  tags: ['test:ui'],
  args: { children: 'Guardar cambios' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'outline', 'ghost', 'destructive', 'link'],
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'default', 'lg', 'icon', 'icon-xs', 'icon-sm', 'icon-lg'],
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Destructive: Story = { args: { children: 'Eliminar', variant: 'destructive' } }
export const Disabled: Story = { args: { isDisabled: true } }
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
}
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Button size="xs">Extra small</Button>
      <Button size="sm">Small</Button>
      <Button>Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon" aria-label="Añadir">
        <Plus />
      </Button>
    </div>
  ),
}
export const WithIcon: Story = {
  args: {
    children: (
      <>
        <span>Continuar</span>
        <ArrowRight data-icon="inline-end" />
      </>
    ),
  },
}
export const AsLink: Story = {
  render: () => (
    <LinkButton href="#button-link" variant="outline">
      Abrir sección
    </LinkButton>
  ),
}
