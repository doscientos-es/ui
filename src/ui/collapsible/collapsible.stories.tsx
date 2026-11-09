import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, userEvent, within } from 'storybook/test'

import { Button } from '../button/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './collapsible'

const meta = { title: 'Components/Navigation/Collapsible', component: Collapsible } satisfies Meta<
  typeof Collapsible
>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Collapsible>
      <CollapsibleTrigger asChild>
        <Button variant="outline">Detalles adicionales</Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-3 text-sm">
        Información de configuración.
      </CollapsibleContent>
    </Collapsible>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const trigger = canvas.getByRole('button', { name: 'Detalles adicionales' })
    trigger.focus()
    await userEvent.keyboard('{Enter}')
    await expect(trigger).toHaveAttribute('aria-expanded', 'true')
    await expect(canvas.getByText('Información de configuración.')).toBeVisible()
    await userEvent.keyboard(' ')
    await expect(trigger).toHaveAttribute('aria-expanded', 'false')
  },
}
export const InitiallyOpen: Story = {
  args: { defaultOpen: true },
  render: (args) => (
    <Collapsible {...args}>
      <CollapsibleTrigger asChild>
        <Button variant="outline">Ver configuración</Button>
      </CollapsibleTrigger>
      <CollapsibleContent>Opciones disponibles para este espacio.</CollapsibleContent>
    </Collapsible>
  ),
}
