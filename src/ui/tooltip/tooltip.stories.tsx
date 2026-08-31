import type { Meta, StoryObj } from '@storybook/react-vite'
import { CircleHelp } from 'lucide-react'
import { expect, userEvent, waitFor, within } from 'storybook/test'

import { Button } from '../button/button'
import { Kbd } from '../kbd/kbd'
import { Tooltip, TooltipTrigger } from './tooltip'

const meta = { title: 'Components/Overlays/Tooltip', component: Tooltip } satisfies Meta<
  typeof Tooltip
>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <TooltipTrigger>
      <Button variant="outline">Guardar</Button>
      <Tooltip>Guarda los cambios realizados.</Tooltip>
    </TooltipTrigger>
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
    <TooltipTrigger>
      <Button variant="outline">Guardar cambios</Button>
      <Tooltip>
        Guardar cambios <Kbd>Ctrl S</Kbd>
      </Tooltip>
    </TooltipTrigger>
  ),
}

export const IconAction: Story = {
  render: () => (
    <TooltipTrigger>
      <Button aria-label="Más información sobre las facturas" size="icon" variant="outline">
        <CircleHelp />
      </Button>
      <Tooltip>Las facturas vencidas requieren seguimiento.</Tooltip>
    </TooltipTrigger>
  ),
}

export const WithCustomPlacement: Story = {
  render: () => (
    <TooltipTrigger>
      <Button variant="outline">Guardar</Button>
      <Tooltip placement="bottom">Guarda los cambios realizados.</Tooltip>
    </TooltipTrigger>
  ),
}
