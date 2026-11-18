import type { Meta, StoryObj } from '@storybook/react-vite'

import { DialogClose } from '../dialog/dialog'
import { ResponsiveDialog } from './responsive-dialog'

const meta = {
  title: 'Components/Overlays/Responsive Dialog',
  component: ResponsiveDialog,
  args: {
    trigger: 'Ver entrega',
    title: 'Detalles de la entrega',
    description: 'Consulta la dirección antes de confirmar el pedido.',
    children: (
      <div className="grid gap-4">
        <p>Carrer de Mallorca, 401 · Barcelona</p>
        <DialogClose variant="outline">Entendido</DialogClose>
      </div>
    ),
  },
} satisfies Meta<typeof ResponsiveDialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
