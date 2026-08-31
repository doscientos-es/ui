import type { Meta, StoryObj } from '@storybook/react-vite'

import { Input } from '../input/input'
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from './field'

const meta = {
  title: 'Components/Forms/Field',
  component: Field,
  tags: ['test:ui'],
} satisfies Meta<typeof Field>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Field className="w-80">
      <FieldLabel htmlFor="field-name">Nombre</FieldLabel>
      <Input id="field-name" placeholder="Escribe tu nombre" />
      <FieldDescription>Se mostrará a los miembros del equipo.</FieldDescription>
    </Field>
  ),
}
export const Invalid: Story = {
  render: () => (
    <Field className="w-80" data-invalid="true">
      <FieldLabel htmlFor="field-email">Email</FieldLabel>
      <Input id="field-email" aria-invalid="true" defaultValue="no-es-un-email" />
      <FieldError>Introduce un email válido.</FieldError>
    </Field>
  ),
}
export const Horizontal: Story = {
  render: () => (
    <Field orientation="horizontal" className="w-96">
      <FieldLabel htmlFor="field-company">Empresa</FieldLabel>
      <FieldContent>
        <Input id="field-company" defaultValue="Doscientos" />
        <FieldDescription>Nombre fiscal del cliente.</FieldDescription>
      </FieldContent>
    </Field>
  ),
}
export const Grouped: Story = {
  render: () => (
    <FieldSet className="w-96">
      <FieldLegend>Datos de contacto</FieldLegend>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="field-phone">Teléfono</FieldLabel>
          <Input id="field-phone" />
        </Field>
        <FieldSeparator>o</FieldSeparator>
        <Field>
          <FieldLabel htmlFor="field-mobile">Móvil</FieldLabel>
          <Input id="field-mobile" />
        </Field>
      </FieldGroup>
    </FieldSet>
  ),
}
