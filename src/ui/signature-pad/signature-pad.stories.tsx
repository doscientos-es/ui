import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { expect, userEvent, within } from 'storybook/test'

import {
  SignaturePad,
  signatureToSvg,
  type SignaturePadProps,
  type SignatureValue,
} from './signature-pad'

const sample: SignatureValue = {
  version: 1,
  strokes: [
    [
      { x: 115, y: 160 },
      { x: 135, y: 90 },
      { x: 150, y: 155 },
      { x: 190, y: 95 },
      { x: 205, y: 155 },
    ],
    [
      { x: 220, y: 140 },
      { x: 250, y: 105 },
      { x: 260, y: 150 },
      { x: 295, y: 115 },
      { x: 320, y: 145 },
      { x: 360, y: 105 },
      { x: 385, y: 140 },
    ],
    [
      { x: 120, y: 175 },
      { x: 280, y: 165 },
      { x: 425, y: 170 },
    ],
  ],
}

const meta = {
  title: 'Components/Forms/Signature pad',
  component: SignaturePad,
  args: { className: 'max-w-xl' },
  parameters: {
    docs: {
      description: {
        component:
          'Captura trazos para un flujo de firma. La aplicación debe gestionar la aceptación, identidad y almacenamiento.',
      },
    },
  },
} satisfies Meta<typeof SignaturePad>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const pad = canvas.getByRole('group', { name: 'Firma' })
    const rect = pad.getBoundingClientRect()
    await userEvent.pointer([
      {
        target: pad,
        keys: '[MouseLeft>]',
        coords: { clientX: rect.left + 30, clientY: rect.top + 30 },
      },
      { target: pad, coords: { clientX: rect.left + 80, clientY: rect.top + 60 } },
      { keys: '[/MouseLeft]' },
    ])
    await expect(pad.querySelector('path')).toBeInTheDocument()
    await userEvent.click(canvas.getByRole('button', { name: 'Borrar firma' }))
    await expect(pad.querySelector('path')).not.toBeInTheDocument()
  },
}
export const ExistingSignature: Story = { args: { defaultValue: sample } }
export const Disabled: Story = { args: { defaultValue: sample, disabled: true } }
export const CustomLabels: Story = {
  args: {
    label: 'Customer signature',
    description: 'Draw with your finger or mouse. Ask for an alternative if you cannot draw.',
    clearLabel: 'Clear signature',
    emptyLabel: 'Sign here',
    signedLabel: 'Signature drawn',
  },
}

function ControlledExample(args: SignaturePadProps) {
  const [value, setValue] = useState<SignatureValue | null>(null)
  return (
    <div className="grid max-w-xl gap-4">
      <SignaturePad {...args} value={value} onChange={setValue} />
      <p className="text-muted-foreground text-sm">
        {value
          ? `SVG preparado: ${signatureToSvg(value).length} caracteres`
          : 'Todavía no hay firma.'}
      </p>
    </div>
  )
}

export const Controlled: Story = { render: (args) => <ControlledExample {...args} /> }
