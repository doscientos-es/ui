import type { Meta, StoryObj } from '@storybook/react-vite'
import { CircleHelp } from 'lucide-react'
import { expect, userEvent, waitFor, within } from 'storybook/test'

import { Button } from '../button/button'
import { Kbd } from '../kbd/kbd'
import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip'

const meta = {
  title: 'Components/Overlays/Tooltip',
  component: Tooltip,
  args: { label: '', children: null },
} satisfies Meta<typeof Tooltip>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Tooltip label="Guarda los cambios realizados.">
      <Button variant="outline">Guardar</Button>
    </Tooltip>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const page = within(canvasElement.ownerDocument.body)
    const trigger = canvas.getByRole('button', { name: 'Guardar' })

    await userEvent.tab()
    await expect(trigger).toHaveFocus()
    await waitFor(() => expect(page.getByRole('tooltip')).toBeVisible())
    await userEvent.keyboard('{Escape}')
    await waitFor(() => expect(page.queryByRole('tooltip')).not.toBeInTheDocument())
  },
}

export const WithShortcut: Story = {
  render: () => (
    <Tooltip
      label={
        <>
          Guardar cambios <Kbd>Ctrl S</Kbd>
        </>
      }
    >
      <Button variant="outline">Guardar cambios</Button>
    </Tooltip>
  ),
}

export const IconAction: Story = {
  render: () => (
    <Tooltip label="Las facturas vencidas requieren seguimiento.">
      <Button aria-label="Más información sobre las facturas" size="icon" variant="outline">
        <CircleHelp />
      </Button>
    </Tooltip>
  ),
}

export const WithCustomPlacement: Story = {
  render: () => (
    <Tooltip label="Guarda los cambios realizados." placement="bottom">
      <Button variant="outline">Guardar</Button>
    </Tooltip>
  ),
}

export const AdvancedComposition: Story = {
  render: () => (
    <TooltipTrigger>
      <Button variant="outline">Guardar cambios</Button>
      <TooltipContent>
        Guardar cambios <Kbd>Ctrl S</Kbd>
      </TooltipContent>
    </TooltipTrigger>
  ),
}
