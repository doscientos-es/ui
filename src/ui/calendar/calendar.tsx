import { useMemo, useState, type CSSProperties, type ReactNode } from 'react'

export type CalendarView = 'month' | 'week' | 'day' | 'agenda'

export type CalendarItem = {
  id: string
  start: Date
  end?: Date
  allDay?: boolean
  resourceId?: string
  editable?: boolean
  [key: string]: unknown
}

export type CalendarResource = { id: string; label: string; [key: string]: unknown }

export type CalendarItemMove = {
  item: CalendarItem
  start: Date
  end: Date
  resourceId?: string
}

export type CalendarProps = {
  items: CalendarItem[]
  value?: Date
  view?: CalendarView
  resources?: CalendarResource[]
  minuteStep?: number
  dayStartHour?: number
  dayEndHour?: number
  onItemClick?: (item: CalendarItem) => void
  onItemMove?: (change: CalendarItemMove) => void
  renderItem?: (item: CalendarItem, context: { view: CalendarView; dragging: boolean }) => ReactNode
  renderResource?: (resource: CalendarResource) => ReactNode
  className?: string
}

const DAY_MS = 86_400_000

export function snapMinutes(minutes: number, step = 30) {
  return Math.round(minutes / Math.max(1, step)) * Math.max(1, step)
}

export function moveCalendarItem(
  item: CalendarItem,
  start: Date,
  options: { minuteStep?: number; resourceId?: string } = {},
): CalendarItemMove {
  const duration = Math.max(0, (item.end?.getTime() ?? start.getTime()) - item.start.getTime())
  const snapped = new Date(start)
  snapped.setMinutes(snapMinutes(snapped.getMinutes(), options.minuteStep), 0, 0)
  return {
    item,
    start: snapped,
    end: new Date(snapped.getTime() + duration),
    resourceId: options.resourceId ?? item.resourceId,
  }
}

export function Calendar({
  items,
  value = new Date(),
  view = 'month',
  resources = [],
  minuteStep = 30,
  dayStartHour = 8,
  dayEndHour = 20,
  onItemClick,
  onItemMove,
  renderItem,
  renderResource,
  className,
}: CalendarProps) {
  const [draggingId, setDraggingId] = useState<string | null>(null)
  const range = useMemo(() => visibleRange(value, view), [value, view])
  const style = { '--calendar-days': range.days.length } as CSSProperties
  const render = (item: CalendarItem) =>
    renderItem?.(item, { view, dragging: draggingId === item.id }) ?? (
      <span className="dsc-calendar__item-label">{String(item.title ?? item.id)}</span>
    )

  if (view === 'agenda') {
    return (
      <div className={className} data-slot="calendar" data-view={view}>
        {range.days.map((day) => {
          const dayItems = items.filter((item) => sameDay(item.start, day))
          return (
            <section className="dsc-calendar__agenda-day" key={day.toISOString()}>
              <h3>{formatDay(day)}</h3>
              {dayItems.map((item) => (
                <button
                  className="dsc-calendar__agenda-item"
                  key={item.id}
                  onClick={() => onItemClick?.(item)}
                >
                  {render(item)}
                </button>
              ))}
            </section>
          )
        })}
      </div>
    )
  }

  if (view === 'month') {
    return (
      <div className={className} data-slot="calendar" data-view={view} style={style}>
        <div className="dsc-calendar__month-grid">
          {range.days.map((day) => (
            <div className="dsc-calendar__month-day" key={day.toISOString()}>
              <time>{day.getDate()}</time>
              {items
                .filter((item) => sameDay(item.start, day))
                .map((item) => (
                  <button key={item.id} onClick={() => onItemClick?.(item)}>
                    {render(item)}
                  </button>
                ))}
            </div>
          ))}
        </div>
      </div>
    )
  }

  const columns = resources.length ? resources : [{ id: '__default', label: '' }]
  const totalMinutes = (dayEndHour - dayStartHour) * 60
  return (
    <div className={className} data-slot="calendar" data-view={view} style={style}>
      <div
        className="dsc-calendar__time-grid"
        style={{ '--calendar-hours': totalMinutes / minuteStep } as CSSProperties}
      >
        <div className="dsc-calendar__time-axis">
          {Array.from({ length: totalMinutes / minuteStep + 1 }, (_, i) => (
            <time key={i}>{formatTime(dayStartHour * 60 + i * minuteStep)}</time>
          ))}
        </div>
        {columns.map((resource) => (
          <div
            className="dsc-calendar__resource-column"
            key={resource.id}
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => {
              const id = event.dataTransfer.getData('calendar-item')
              const item = items.find((entry) => entry.id === id)
              if (!item || !onItemMove) return
              const rect = event.currentTarget.getBoundingClientRect()
              const minutes =
                dayStartHour * 60 + ((event.clientY - rect.top) / rect.height) * totalMinutes
              onItemMove(
                moveCalendarItem(item, atMinutes(value, snapMinutes(minutes, minuteStep)), {
                  minuteStep,
                  resourceId: resource.id,
                }),
              )
            }}
          >
            <div className="dsc-calendar__resource-label">
              {renderResource?.(resource) ?? resource.label}
            </div>
            {items
              .filter(
                (item) =>
                  (item.resourceId ?? '__default') === resource.id &&
                  sameDay(item.start, value) &&
                  !item.allDay,
              )
              .map((item) => (
                <button
                  className={`dsc-calendar__time-item ${draggingId === item.id ? 'is-dragging' : ''}`}
                  style={timeItemStyle(item, dayStartHour, dayEndHour)}
                  draggable={item.editable !== false}
                  key={item.id}
                  onClick={() => onItemClick?.(item)}
                  onDragStart={(event) => {
                    event.dataTransfer.setData('calendar-item', item.id)
                    setDraggingId(item.id)
                  }}
                  onDragEnd={() => setDraggingId(null)}
                >
                  {render(item)}
                </button>
              ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function visibleRange(value: Date, view: CalendarView) {
  const start = new Date(
    value.getFullYear(),
    value.getMonth(),
    view === 'month' ? 1 : value.getDate(),
  )
  if (view === 'week') start.setDate(start.getDate() - ((start.getDay() + 6) % 7))
  const count = view === 'month' ? 42 : view === 'week' ? 7 : 1
  return { days: Array.from({ length: count }, (_, i) => new Date(start.getTime() + i * DAY_MS)) }
}
function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}
function atMinutes(day: Date, minutes: number) {
  const next = new Date(day)
  next.setHours(Math.floor(minutes / 60), minutes % 60, 0, 0)
  return next
}
function formatDay(date: Date) {
  return new Intl.DateTimeFormat('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(date)
}
function formatTime(minutes: number) {
  return `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`
}
function timeItemStyle(item: CalendarItem, startHour: number, endHour: number): CSSProperties {
  const start = item.start.getHours() * 60 + item.start.getMinutes()
  const end = item.end ?? new Date(item.start.getTime() + 30 * 60_000)
  const duration = Math.max(15, (end.getTime() - item.start.getTime()) / 60_000)
  const total = (endHour - startHour) * 60
  return {
    top: `${Math.max(0, ((start - startHour * 60) / total) * 100)}%`,
    height: `${Math.min(100, (duration / total) * 100)}%`,
  }
}
