import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { expect, userEvent, within } from 'storybook/test'

import { SearchField } from './search-field'

const meta = {
  title: 'Components/Forms/Search field',
  component: SearchField,
  tags: ['test:ui'],
} satisfies Meta<typeof SearchField>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { 'aria-label': 'Buscar clientes', placeholder: 'Buscar clientes…', className: 'w-80' },
  render: function Render(args) {
    const [value, setValue] = useState('')
    return <SearchField {...args} value={value} onChange={setValue} />
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole('searchbox', { name: 'Buscar clientes' })
    await userEvent.type(input, 'Ana')
    await userEvent.click(canvas.getByRole('button', { name: 'Borrar búsqueda' }))
    await expect(input).toHaveValue('')
    await expect(input).toHaveFocus()
  },
}
