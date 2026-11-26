import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { expect, userEvent, within } from 'storybook/test'

import {
  Select,
  SelectContent,
  SelectField,
  SelectItem,
  SelectList,
  SelectTrigger,
  SelectValue,
} from './select'

const priorities = [
  { id: 'low', name: 'Baja' },
  { id: 'medium', name: 'Media' },
  { id: 'high', name: 'Alta' },
]

const meta = {
  title: 'Components/Forms/Select',
  component: Select,
  tags: ['test:ui'],
} satisfies Meta<typeof Select>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: function Render() {
    const [value, setValue] = useState<string | number | null>('medium')
    return (
      <SelectField
        label="Prioridad"
        description="Determina el orden de atención."
        items={priorities}
        getItemKey={(priority) => priority.id}
        getItemLabel={(priority) => priority.name}
        value={value}
        onChange={setValue}
        className="w-72"
      />
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const page = within(canvasElement.ownerDocument.body)
    const trigger = canvas.getByRole('button', { name: /Prioridad/ })
    await userEvent.click(trigger)
    await userEvent.click(page.getByRole('option', { name: 'Alta' }))
    await expect(trigger).toHaveTextContent('Alta')
  },
}

export const Composed: Story = {
  render: function Render() {
    const [value, setValue] = useState<string | number | null>('medium')
    return (
      <Select aria-label="Prioridad" value={value} onChange={setValue} className="w-72">
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectList items={priorities}>
            {(priority) => (
              <SelectItem id={priority.id} textValue={priority.name}>
                {priority.name}
              </SelectItem>
            )}
          </SelectList>
        </SelectContent>
      </Select>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const page = within(canvasElement.ownerDocument.body)
    const trigger = canvas.getByRole('button')

    await userEvent.click(trigger)
    await userEvent.click(page.getByRole('option', { name: 'Alta' }))
    await expect(trigger).toHaveTextContent('Alta')
  },
}
