import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { Field, FieldDescription, FieldLabel } from '../field/field'
import { OtpInput } from './otp-input'

const meta = {
  title: 'Components/Forms/OTP Input',
  component: OtpInput,
  tags: ['test:ui'],
  args: { 'aria-label': 'Código de verificación', length: 6 },
  argTypes: {
    length: { control: { type: 'number', min: 1, max: 8 } },
    disabled: { control: 'boolean' },
    'aria-invalid': { control: 'boolean' },
  },
} satisfies Meta<typeof OtpInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Controlled: Story = {
  render: function Render(args) {
    const [value, setValue] = useState('')
    return (
      <Field className="w-fit">
        <FieldLabel htmlFor="storybook-otp">Código de verificación</FieldLabel>
        <OtpInput {...args} id="storybook-otp" value={value} onChange={setValue} />
        <FieldDescription>Introduce el código de seis dígitos.</FieldDescription>
      </Field>
    )
  },
}

export const Invalid: Story = { args: { defaultValue: '123', 'aria-invalid': true } }
export const Disabled: Story = { args: { defaultValue: '123456', disabled: true } }
