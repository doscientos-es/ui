import type { Meta, StoryObj } from '@storybook/react-vite'
import { CalendarDaysIcon, ListIcon } from 'lucide-react'
import { expect, userEvent, within } from 'storybook/test'

import { SegmentedControl, SegmentedControlItem } from './segmented-control'

const meta = {
  title: 'Components/Forms/SegmentedControl',
  component: SegmentedControl,
  tags: ['test:ui'],
  args: { 'aria-label': 'Vista', defaultValue: 'list' },
} satisfies Meta<typeof SegmentedControl>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <SegmentedControl {...args}>
      <SegmentedControlItem value="list">
        <ListIcon aria-hidden="true" />
        Lista
      </SegmentedControlItem>
      <SegmentedControlItem value="calendar">
        <CalendarDaysIcon aria-hidden="true" />
        Calendario
      </SegmentedControlItem>
    </SegmentedControl>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('radio', { name: 'Lista' }))
    await userEvent.keyboard('{ArrowRight}')
    await expect(canvas.getByRole('radio', { name: 'Calendario' })).toBeChecked()
    await expect(canvas.getByRole('radio', { name: 'Calendario' })).toHaveFocus()
    await expect(canvas.queryByRole('tablist')).not.toBeInTheDocument()
  },
}

export const Disabled: Story = {
  ...Default,
  args: { isDisabled: true },
  play: undefined,
}

export const ReadOnly: Story = {
  ...Default,
  args: { isReadOnly: true },
  play: undefined,
}

export const Vertical: Story = {
  args: { orientation: 'vertical', 'aria-label': 'Periodo', defaultValue: 'month' },
  render: (args) => (
    <SegmentedControl {...args}>
      <SegmentedControlItem value="week">Semana</SegmentedControlItem>
      <SegmentedControlItem value="month">Mes</SegmentedControlItem>
      <SegmentedControlItem value="year">Año</SegmentedControlItem>
    </SegmentedControl>
  ),
}

export const LongLabels: Story = {
  render: (args) => (
    <div className="max-w-64">
      <SegmentedControl {...args}>
        <SegmentedControlItem value="list">Todos los registros del equipo</SegmentedControlItem>
        <SegmentedControlItem value="personal">
          Solo los registros asignados a mí
        </SegmentedControlItem>
      </SegmentedControl>
    </div>
  ),
}
