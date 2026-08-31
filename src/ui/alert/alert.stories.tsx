import type { Meta, StoryObj } from '@storybook/react-vite'
import { CircleCheck, Info, TriangleAlert } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from './alert'

const meta = {
  title: 'Components/Feedback/Alert',
  component: Alert,
  tags: ['test:ui'],
  args: {
    children: (
      <>
        <Info />
        <AlertTitle>Información</AlertTitle>
        <AlertDescription>Revisa los datos antes de continuar.</AlertDescription>
      </>
    ),
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'info', 'success', 'warning', 'destructive'],
    },
  },
} satisfies Meta<typeof Alert>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Success: Story = {
  args: {
    variant: 'success',
    children: (
      <>
        <CircleCheck />
        <AlertTitle>Guardado</AlertTitle>
        <AlertDescription>Los cambios se han guardado correctamente.</AlertDescription>
      </>
    ),
  },
}
export const Warning: Story = {
  args: {
    variant: 'warning',
    children: (
      <>
        <TriangleAlert />
        <AlertTitle>Revisión pendiente</AlertTitle>
        <AlertDescription>Faltan datos antes de emitir la factura.</AlertDescription>
      </>
    ),
  },
}
export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: (
      <>
        <TriangleAlert />
        <AlertTitle>No se pudo guardar</AlertTitle>
        <AlertDescription>Corrige los errores e inténtalo de nuevo.</AlertDescription>
      </>
    ),
  },
}
