import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { expect, userEvent, within } from 'storybook/test'

import { Calendar, type CalendarItem } from './calendar'

const value = new Date(2026, 9, 15)
const items: CalendarItem[] = [
  {
    id: 'review',
    title: 'Revisión de proyecto',
    start: new Date(2026, 9, 15, 10),
    end: new Date(2026, 9, 15, 11),
    resourceId: 'a',
  },
  {
    id: 'planning',
    title: 'Planificación',
    start: new Date(2026, 9, 12, 12),
    end: new Date(2026, 9, 12, 13),
    resourceId: 'a',
  },
  { id: 'holiday', title: 'Equipo remoto', start: new Date(2026, 9, 15), allDay: true },
]
const meta = {
  title: 'Components/Data Display/Calendar',
  component: Calendar,
  args: { value, items, 'aria-label': 'Agenda del equipo' },
} satisfies Meta<typeof Calendar>
export default meta
type Story = StoryObj<typeof meta>

export const Month: Story = {}
export const Week: Story = {
  args: {
    view: 'week',
    resources: [
      { id: 'a', label: 'Sala A' },
      { id: 'b', label: 'Sala B' },
    ],
  },
}
export const Agenda: Story = { args: { view: 'agenda' } }
export const Empty: Story = { args: { view: 'agenda', items: [] } }
export const Day: Story = {
  render: (args) => (
    <Calendar
      {...args}
      view="day"
      items={items.map((item) => ({ ...item, resourceId: undefined }))}
    />
  ),
}
export const KeyboardEditing: Story = {
  render: function Render(args) {
    const [events, setEvents] = useState([items[0]!])
    return (
      <Calendar
        {...args}
        view="day"
        items={events}
        resources={[
          { id: 'a', label: 'Sala A' },
          { id: 'b', label: 'Sala B' },
        ]}
        onItemMove={(change) =>
          setEvents([
            { ...change.item, start: change.start, end: change.end, resourceId: change.resourceId },
          ])
        }
      />
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const event = canvas.getByRole('button', { name: /Revisión de proyecto/ })
    event.focus()
    await userEvent.keyboard('{Alt>}{ArrowDown}{/Alt}')
    await expect(canvas.getByRole('button', { name: /10:30/ })).toHaveFocus()
    await userEvent.keyboard('{Alt>}{ArrowRight}{/Alt}')
    await expect(canvas.getByRole('button', { name: /Revisión de proyecto/ })).toHaveFocus()
    await expect(canvas.getByRole('status')).toHaveTextContent('Sala B')
  },
}
