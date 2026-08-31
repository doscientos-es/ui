import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, waitFor, within } from 'storybook/test'

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
    <TooltipTrigger isOpen>
      <Button variant="outline">Guardar</Button>
      <Tooltip>
        Guardar cambios <Kbd>Ctrl S</Kbd>
      </Tooltip>
    </TooltipTrigger>
  ),
  play: async ({ canvasElement }) => {
    await waitFor(() =>
      expect(within(canvasElement.ownerDocument.body).getByRole('tooltip')).toBeVisible(),
    )
  },
}
