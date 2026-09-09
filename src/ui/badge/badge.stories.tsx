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
export const TableStatuses: Story = {
  render: () => (
    <div className="divide-border border-border flex max-w-md flex-col divide-y rounded-lg border">
      {[
        { label: 'GMT+3', status: 'Verificado', variant: 'success' },
        { label: 'GMT+5', status: 'Revisión', variant: 'warning' },
        { label: 'GMT+2', status: 'Pendiente', variant: 'info' },
        { label: 'GMT+1', status: 'Riesgo alto', variant: 'danger' },
        { label: 'GMT+0', status: 'Verificado', variant: 'success' },
      ].map(({ label, status, variant }) => (
        <div key={label} className="flex items-center justify-between px-4 py-3">
          <Badge variant="outline" icon={false}>
            {label}
          </Badge>
          <Badge variant={variant as 'success' | 'warning' | 'info' | 'danger'}>{status}</Badge>
        </div>
      ))}
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
