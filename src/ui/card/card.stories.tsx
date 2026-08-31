import type { Meta, StoryObj } from '@storybook/react-vite'

import { Badge } from '../badge/badge'
import { Button } from '../button/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './card'

const meta = {
  title: 'Components/Data Display/Card',
  component: Card,
  tags: ['test:ui'],
  argTypes: { size: { control: 'select', options: ['default', 'sm'] } },
} satisfies Meta<typeof Card>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Card {...args} className="w-96">
      <CardHeader>
        <CardTitle>Factura #2026-018</CardTitle>
        <CardDescription>Emitida el 23 de agosto</CardDescription>
        <CardAction>
          <Badge variant="success">Pagada</Badge>
        </CardAction>
      </CardHeader>
      <CardContent>Servicios de diseño y desarrollo web.</CardContent>
      <CardFooter className="justify-between">
        <span>Total</span>
        <strong>1.452,00 €</strong>
      </CardFooter>
    </Card>
  ),
}

export const WithActions: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Publicar cambios</CardTitle>
        <CardDescription>Los cambios serán visibles inmediatamente.</CardDescription>
      </CardHeader>
      <CardFooter className="justify-end gap-2">
        <Button variant="ghost">Cancelar</Button>
        <Button>Publicar</Button>
      </CardFooter>
    </Card>
  ),
}
