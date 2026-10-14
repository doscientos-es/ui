import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect, fn, userEvent, waitFor, within } from 'storybook/test'

import { MultiSelectCombobox } from './multi-select-combobox'

const items = [
  { id: 'ana', name: 'Ana' },
  { id: 'bruno', name: 'Bruno' },
  { id: 'ines', name: 'Inés' },
]

const meta = {
  title: 'Components/Forms/MultiSelectCombobox',
  component: MultiSelectCombobox<(typeof items)[number]>,
  tags: ['test:ui'],
  args: {
    items,
    getItemKey: (item) => item.id,
    getItemLabel: (item) => item.name,
    label: 'Responsables',
    onChange: fn(),
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-sm">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MultiSelectCombobox<(typeof items)[number]>>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole('combobox', { name: 'Responsables' })
    await userEvent.click(input)
    await userEvent.type(input, 'Ana')
    await userEvent.keyboard('{ArrowDown}{Enter}{Escape}')
    await expect(canvas.getByRole('button', { name: 'Quitar Ana' })).toBeVisible()
    await expect(input).toHaveFocus()
    await userEvent.clear(input)
    await userEvent.type(input, 'Bruno')
    await userEvent.keyboard('{ArrowDown}{Enter}{Escape}')
    await expect(canvas.getByRole('button', { name: 'Quitar Ana' })).toBeVisible()
    await expect(canvas.getByRole('button', { name: 'Quitar Bruno' })).toBeVisible()
    await userEvent.click(canvas.getByRole('button', { name: 'Quitar Ana' }))
    await waitFor(() =>
      expect(canvas.queryByRole('button', { name: 'Quitar Ana' })).not.toBeInTheDocument(),
    )
  },
}

export const Selected: Story = { args: { defaultValue: ['ana', 'bruno'] } }
export const Disabled: Story = { args: { defaultValue: ['ana'], isDisabled: true } }
export const ReadOnly: Story = { args: { defaultValue: ['ana', 'ines'], isReadOnly: true } }
export const Error: Story = {
  args: {
    isInvalid: true,
    errorMessage: 'Selecciona al menos una persona.',
    description: 'Puedes elegir varios responsables.',
  },
}
export const Empty: Story = {
  args: { items: [], emptyState: 'Aún no hay opciones disponibles.', menuTrigger: 'focus' },
}
export const LongLabels: Story = {
  args: {
    items: [
      { id: 'ana', name: 'Equipo de operaciones y seguimiento de proyectos' },
      { id: 'bruno', name: 'Equipo de administración y atención al cliente' },
    ],
    defaultValue: ['ana', 'bruno'],
  },
}
