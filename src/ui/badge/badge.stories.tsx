import type { Meta, StoryObj } from '@storybook/react-vite'
import { FileCheck, ShieldCheck } from 'lucide-react'

import { Badge, BadgeLink } from './badge'

const meta = {
  title: 'Components/Data Display/Badge',
  component: Badge,
  tags: ['test:ui'],
  args: { children: 'Badge' },
  argTypes: {
    icon: {
      control: 'select',
      options: ['auto', 'hidden', 'custom'],
      mapping: { auto: undefined, hidden: false, custom: <ShieldCheck /> },
      description: 'Automático según variant; false/null lo oculta y un elemento lo sustituye.',
    },
    variant: {
      control: 'select',
      options: [
        'default',
        'secondary',
        'neutral',
        'success',
        'warning',
        'info',
        'danger',
        'destructive',
        'outline',
        'ghost',
        'link',
      ],
    },
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Statuses: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="success">Pagada</Badge>
      <Badge variant="warning">Pendiente</Badge>
      <Badge variant="info">Borrador</Badge>
      <Badge variant="danger">Vencida</Badge>
      <Badge variant="neutral">Archivada</Badge>
    </div>
  ),
}
export const AsLink: Story = {
  render: () => (
    <BadgeLink href="#invoices" variant="outline">
      3 facturas pendientes
    </BadgeLink>
  ),
}

export const IconOverrides: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="info">Emitida</Badge>
      <Badge variant="success">Verifactu · Aceptada</Badge>
      <Badge variant="warning">Revisión</Badge>
      <Badge variant="info" icon={<FileCheck />}>
        Emitida con icono propio
      </Badge>
      <Badge variant="success" icon={false}>
        Aceptada sin icono
      </Badge>
      <BadgeLink href="#invoices" variant="success" icon={<ShieldCheck />}>
        Ver factura aceptada
      </BadgeLink>
    </div>
  ),
}
