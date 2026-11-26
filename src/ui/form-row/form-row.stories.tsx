import type { Meta, StoryObj } from '@storybook/react-vite'

import { Input } from '../input/input'
import { FormRow } from './form-row'
const meta = {
  title: 'Components/Forms/Form Row',
  component: FormRow,
  args: { label: 'Nombre', htmlFor: 'form-row-default', children: null },
} satisfies Meta<typeof FormRow>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {
  render: () => (
    <FormRow
      label="Nombre"
      htmlFor="form-row-name"
      description="Usa el nombre legal de la empresa."
    >
      <Input id="form-row-name" placeholder="Acme S.L." />
    </FormRow>
  ),
}
export const Invalid: Story = {
  render: () => (
    <FormRow
      label="Email"
      required
      description="Usa tu correo de trabajo."
      errorMessage="Introduce un email válido."
    >
      {(props) => <Input {...props} type="email" />}
    </FormRow>
  ),
}
