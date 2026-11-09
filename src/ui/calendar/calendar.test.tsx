import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { Calendar, moveCalendarItem, snapMinutes, type CalendarItem } from './calendar'

const date = new Date(2026, 9, 15)
const item: CalendarItem = {
  id: 'review',
  title: 'Revisión',
  start: new Date(2026, 9, 15, 10),
  end: new Date(2026, 9, 15, 11),
}

describe('Calendar helpers', () => {
  it('snaps intervals safely, including invalid steps', () => {
    expect(snapMinutes(44)).toBe(30)
    expect(snapMinutes(44, 15)).toBe(45)
    expect(snapMinutes(44, 0)).toBe(44)
    expect(snapMinutes(44, Number.NaN)).toBe(30)
  })

  it('preserves duration and resources without mutating the input dates', () => {
    const start = new Date(2026, 9, 16, 12, 14, 10)
    const change = moveCalendarItem({ ...item, resourceId: 'a' }, start, { resourceId: 'b' })
    expect(change.start).toEqual(new Date(2026, 9, 16, 12))
    expect(change.end).toEqual(new Date(2026, 9, 16, 13))
    expect(change.resourceId).toBe('b')
    expect(start.getMinutes()).toBe(14)
    expect(item.start.getHours()).toBe(10)
    expect(moveCalendarItem({ ...item, resourceId: 'a' }, start).resourceId).toBe('a')
  })

  it('uses a consistent 30-minute duration when end is absent', () => {
    const { end: _, ...withoutEnd } = item
    const change = moveCalendarItem(withoutEnd, new Date(2026, 9, 16, 12))
    expect(change.end.getTime() - change.start.getTime()).toBe(30 * 60_000)
  })

  it('clamps malformed negative durations', () => {
    const change = moveCalendarItem({ ...item, end: new Date(2026, 9, 15, 9) }, item.start)
    expect(change.end).toEqual(change.start)
  })
})

describe('Calendar', () => {
  it('aligns the month to Monday and represents local dates without submitting a form', async () => {
    const onSubmit = vi.fn((event: React.FormEvent) => event.preventDefault())
    const onItemClick = vi.fn()
    const { container } = render(
      <form onSubmit={onSubmit}>
        <Calendar items={[item]} value={date} onItemClick={onItemClick} />
      </form>,
    )
    expect(screen.getByRole('region', { name: 'Calendario' })).toBeTruthy()
    const days = container.querySelectorAll('.dsc-calendar__month-day time')
    expect(days).toHaveLength(42)
    expect(days[0]?.getAttribute('datetime')).toBe('2026-09-28')
    await userEvent.click(screen.getByRole('button', { name: /Revisión/ }))
    expect(onItemClick).toHaveBeenCalledWith(item)
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('uses calendar dates rather than 24-hour arithmetic around daylight-saving transitions', () => {
    const { container } = render(<Calendar items={[]} value={new Date(2026, 9, 25)} view="week" />)
    expect(container.querySelectorAll('.dsc-calendar__day-column')).toHaveLength(7)
    expect(container.textContent).toContain('lunes, 19 de octubre')
    expect(container.textContent).toContain('domingo, 25 de octubre')
  })

  it('renders events on every day of a week, not only the selected date', () => {
    render(
      <Calendar
        value={date}
        view="week"
        items={[
          item,
          {
            ...item,
            id: 'monday',
            title: 'Lunes',
            start: new Date(2026, 9, 12, 10),
            end: new Date(2026, 9, 12, 11),
          },
        ]}
      />,
    )
    expect(screen.getByRole('button', { name: /Lunes, lunes/ })).toBeTruthy()
    expect(screen.getByRole('button', { name: /Revisión/ })).toBeTruthy()
  })

  it('includes all-day events and clips timed events at the visible end', () => {
    render(
      <Calendar
        value={date}
        view="day"
        dayEndHour={12}
        items={[
          { ...item, allDay: true },
          {
            ...item,
            id: 'late',
            title: 'Tarde',
            start: new Date(2026, 9, 15, 11),
            end: new Date(2026, 9, 15, 13),
          },
        ]}
      />,
    )
    expect(screen.getByRole('button', { name: /todo el día/ })).toBeTruthy()
    expect(screen.getByRole('button', { name: /Tarde/ }).style.height).toBe('25%')
  })

  it('clips events starting before the schedule and keeps overnight events', () => {
    render(
      <Calendar
        value={date}
        view="day"
        items={[
          { ...item, start: new Date(2026, 9, 15, 7) },
          {
            ...item,
            id: 'overnight',
            title: 'Guardia',
            start: new Date(2026, 9, 15, 19),
            end: new Date(2026, 9, 16, 1),
          },
        ]}
      />,
    )
    expect(screen.getByRole('button', { name: /Revisión/ }).style.top).toBe('0%')
    expect(screen.getByRole('button', { name: /Guardia/ })).toBeTruthy()
  })

  it('has an explicit agenda empty state and supports custom event names', () => {
    const { rerender } = render(<Calendar value={date} view="agenda" items={[]} />)
    expect(screen.getByText('Sin eventos para este día.')).toBeTruthy()
    rerender(
      <Calendar
        value={date}
        view="agenda"
        items={[item]}
        getItemLabel={() => 'Reserva'}
        renderItem={() => <span aria-hidden="true">◌</span>}
      />,
    )
    expect(screen.getByRole('button', { name: /Reserva/ })).toBeTruthy()
  })

  it('moves by keyboard, announces the result and preserves focus across resource changes', () => {
    const resources = [
      { id: 'a', label: 'Sala A' },
      { id: 'b', label: 'Sala B' },
    ]
    function Controlled() {
      const [items, setItems] = useState([{ ...item, resourceId: 'a' }])
      return (
        <Calendar
          items={items}
          value={date}
          view="day"
          resources={resources}
          onItemMove={(change) =>
            setItems([
              {
                ...change.item,
                start: change.start,
                end: change.end,
                resourceId: change.resourceId!,
              },
            ])
          }
        />
      )
    }
    render(<Controlled />)
    const button = screen.getByRole('button', { name: /Revisión/ })
    button.focus()
    fireEvent.keyDown(button, { key: 'ArrowDown', altKey: true })
    expect(screen.getByRole('button', { name: /10:30/ })).toBe(document.activeElement)
    fireEvent.keyDown(document.activeElement!, { key: 'ArrowRight', altKey: true })
    expect(screen.getByRole('button', { name: /Revisión/ })).toBe(document.activeElement)
    expect(screen.getByRole('status').textContent).toContain('Sala B')
  })

  it('supports time, date and resource keyboard changes only when editable', () => {
    const onItemMove = vi.fn()
    const { rerender } = render(
      <Calendar items={[item]} value={date} view="day" onItemMove={onItemMove} />,
    )
    const button = screen.getByRole('button', { name: /Revisión/ })
    fireEvent.keyDown(button, { key: 'ArrowUp', altKey: true })
    expect(onItemMove.mock.calls[0]?.[0].start).toEqual(new Date(2026, 9, 15, 9, 30))
    fireEvent.keyDown(button, { key: 'PageDown', altKey: true })
    expect(onItemMove.mock.calls[1]?.[0].start.getDate()).toBe(16)
    fireEvent.keyDown(button, { key: 'PageUp', altKey: true })
    expect(onItemMove.mock.calls[2]?.[0].start.getDate()).toBe(14)
    fireEvent.keyDown(button, { key: 'ArrowRight', altKey: true })
    fireEvent.keyDown(button, { key: 'Enter', altKey: true })
    fireEvent.keyDown(button, { key: 'ArrowDown' })
    expect(onItemMove).toHaveBeenCalledTimes(3)
    rerender(
      <Calendar
        items={[{ ...item, editable: false }]}
        value={date}
        view="day"
        onItemMove={onItemMove}
      />,
    )
    fireEvent.keyDown(screen.getByRole('button', { name: /Revisión/ }), {
      key: 'ArrowDown',
      altKey: true,
    })
    expect(onItemMove).toHaveBeenCalledTimes(3)
  })

  it('does not move above the schedule or when no callback exists', () => {
    const onItemMove = vi.fn()
    const { rerender } = render(
      <Calendar items={[item]} value={date} view="day" dayStartHour={10} onItemMove={onItemMove} />,
    )
    fireEvent.keyDown(screen.getByRole('button', { name: /Revisión/ }), {
      key: 'ArrowUp',
      altKey: true,
    })
    expect(onItemMove).not.toHaveBeenCalled()
    rerender(<Calendar items={[item]} value={date} view="day" />)
    fireEvent.keyDown(screen.getByRole('button', { name: /Revisión/ }), {
      key: 'ArrowDown',
      altKey: true,
    })
    expect(screen.getByRole('button', { name: /Revisión/ }).getAttribute('draggable')).toBe('false')
  })

  it('snaps drops to the target date/resource and rejects locked or unknown events', () => {
    const onItemMove = vi.fn()
    const dataTransfer = { getData: vi.fn(() => item.id), setData: vi.fn() }
    const { container, rerender } = render(
      <Calendar items={[item]} value={date} view="week" onItemMove={onItemMove} />,
    )
    const column = container.querySelectorAll('.dsc-calendar__resource-column')[0]!
    vi.spyOn(column, 'getBoundingClientRect').mockReturnValue({ top: 0, height: 600 } as DOMRect)
    const drop = () => {
      const event = new MouseEvent('drop', { bubbles: true, clientY: 100 })
      Object.defineProperty(event, 'dataTransfer', { value: dataTransfer })
      fireEvent(column, event)
    }
    fireEvent.dragStart(screen.getByRole('button', { name: /Revisión/ }), { dataTransfer })
    expect(dataTransfer.setData).toHaveBeenCalledWith('calendar-item', item.id)
    fireEvent.dragOver(column)
    drop()
    expect(onItemMove.mock.calls[0]?.[0].start).toEqual(new Date(2026, 9, 12, 10))
    fireEvent.dragEnd(screen.getByRole('button', { name: /Revisión/ }))
    dataTransfer.getData.mockReturnValue('missing')
    drop()
    expect(onItemMove).toHaveBeenCalledTimes(1)
    rerender(
      <Calendar
        items={[{ ...item, editable: false }]}
        value={date}
        view="week"
        onItemMove={onItemMove}
      />,
    )
    dataTransfer.getData.mockReturnValue(item.id)
    drop()
    expect(onItemMove).toHaveBeenCalledTimes(1)
  })

  it('normalizes invalid schedule inputs and renders default labels/resources', () => {
    const { end: _, title: __, ...withoutEnd } = item
    render(
      <Calendar
        items={[withoutEnd]}
        value={date}
        view="day"
        minuteStep={Number.NaN}
        dayStartHour={Number.NaN}
        dayEndHour={Number.NaN}
      />,
    )
    expect(screen.getByRole('button', { name: /review/ })).toBeTruthy()
  })
})
