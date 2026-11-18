import type { Meta, StoryObj } from '@storybook/react-vite'
import { ArrowRight, Plus } from 'lucide-react'
import { useState } from 'react'
import { expect, fn, userEvent, waitFor, within } from 'storybook/test'

import { Button, LinkButton } from './button'

const meta = {
  title: 'Components/Actions/Button',
  component: Button,
  tags: ['test:ui'],
  // React Aria's live announcer is outside the canvas and briefly references the previous story.
  parameters: { a11y: { context: '.storybook-canvas' } },
  args: { children: 'Guardar cambios', onPress: fn() },
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

export const Default: Story = {
  play: async ({ args, canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole('button', { name: 'Guardar cambios' }))
    await expect(args.onPress).toHaveBeenCalledOnce()
  },
}
export const Destructive: Story = { args: { children: 'Eliminar', variant: 'destructive' } }
export const Disabled: Story = {
  args: { isDisabled: true, onPress: fn() },
  play: async ({ args, canvasElement }) => {
    const button = within(canvasElement).getByRole('button', { name: 'Guardar cambios' })

    await expect(button).toBeDisabled()
    button.click()
    await expect(args.onPress).not.toHaveBeenCalled()
  },
}
export const Pending: Story = {
  render: function PendingButton() {
    const [pending, setPending] = useState(false)
    return (
      <Button
        isPending={pending}
        pendingLabel="Guardando cambios…"
        onPress={() => setPending(true)}
      >
        Guardar
      </Button>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button', { name: 'Guardar' })
    const initialWidth = button.getBoundingClientRect().width
    await userEvent.click(button)
    const progress = canvas.getByRole('progressbar', { name: 'Guardando cambios…' })
    await waitFor(() => expect(progress).toBeVisible())
    await expect(button.getBoundingClientRect().width).toBe(initialWidth)
    await expect(button).toHaveFocus()
  },
}
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
  play: async ({ canvasElement }) => {
    if (canvasElement.ownerDocument.documentElement.clientWidth >= 640) return
    const canvas = within(canvasElement)
    await expect(
      canvas.getByRole('button', { name: 'Default' }).getBoundingClientRect().height,
    ).toBeGreaterThanOrEqual(44)
    await expect(
      canvas.getByRole('button', { name: 'Añadir' }).getBoundingClientRect().height,
    ).toBeGreaterThanOrEqual(44)
    await expect(
      canvas.getByRole('button', { name: 'Small' }).getBoundingClientRect().height,
    ).toBeLessThan(44)
  },
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
