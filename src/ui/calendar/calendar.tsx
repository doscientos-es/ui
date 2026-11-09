'use client'

import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type ReactNode,
} from 'react'

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
  /** Name of this calendar region. */
  'aria-label'?: string
  /** Plain-text event name, including when renderItem returns an icon. */
  getItemLabel?: (item: CalendarItem) => string
  className?: string
}

// These pure helpers are part of Calendar's public API and intentionally live beside the component.
// oxlint-disable-next-line react/only-export-components
export function snapMinutes(minutes: number, step = 30) {
  const interval = Number.isFinite(step) ? Math.max(1, step) : 30
  return Math.round(minutes / interval) * interval
}

// oxlint-disable-next-line react/only-export-components
export function moveCalendarItem(
  item: CalendarItem,
  start: Date,
  options: { minuteStep?: number; resourceId?: string } = {},
): CalendarItemMove {
  const duration = Math.max(
    0,
    (item.end?.getTime() ?? item.start.getTime() + 30 * 60_000) - item.start.getTime(),
  )
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
  'aria-label': label = 'Calendario',
  getItemLabel = (item) => String(item.title ?? item.id),
  className,
}: CalendarProps) {
  const [draggingId, setDraggingId] = useState<string | null>(null)
  const [announcement, setAnnouncement] = useState('')
  const rootRef = useRef<HTMLDivElement>(null)
  const focusId = useRef<string | null>(null)
  const instructionsId = useId()
  const range = useMemo(() => visibleRange(value, view), [value, view])
  const interval = Number.isFinite(minuteStep) ? Math.max(1, minuteStep) : 30
  const startHour = Number.isFinite(dayStartHour) ? Math.max(0, Math.min(23, dayStartHour)) : 8
  const endHour = Number.isFinite(dayEndHour)
    ? Math.max(startHour + 1, Math.min(24, dayEndHour))
    : 20
  const columns = resources.length ? resources : [{ id: '__default', label: '' }]
  const totalMinutes = (endHour - startHour) * 60
  const style = {
    '--calendar-columns': range.days.length * columns.length,
    '--calendar-hours': Math.ceil(totalMinutes / interval),
  } as CSSProperties
  const render = (item: CalendarItem) =>
    renderItem?.(item, { view, dragging: draggingId === item.id }) ?? (
      <span className="dsc-calendar__item-label">{String(item.title ?? item.id)}</span>
    )

  useEffect(() => {
    if (!focusId.current) return
    const target = [
      ...(rootRef.current?.querySelectorAll<HTMLButtonElement>('[data-calendar-item]') ?? []),
    ].find((element) => element.dataset.calendarItem === focusId.current)
    target?.focus()
    focusId.current = null
  }, [items])

  function move(item: CalendarItem, start: Date, resourceId?: string) {
    if (!onItemMove || item.editable === false) return
    const change = moveCalendarItem(item, start, { minuteStep: interval, resourceId })
    focusId.current = item.id
    onItemMove(change)
    setAnnouncement(
      `${getItemLabel(item)}: ${formatDay(change.start)}, ${formatTime(change.start.getHours() * 60 + change.start.getMinutes())}${resources.find((resource) => resource.id === change.resourceId)?.label ? `, ${resources.find((resource) => resource.id === change.resourceId)?.label}` : ''}`,
    )
  }

  function keyMove(event: KeyboardEvent<HTMLButtonElement>, item: CalendarItem) {
    if (!event.altKey || !onItemMove || item.editable === false) return
    const start = new Date(item.start)
    let resourceId = item.resourceId
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      const minutes =
        start.getHours() * 60 +
        start.getMinutes() +
        (event.key === 'ArrowUp' ? -interval : interval)
      if (minutes < startHour * 60 || minutes >= endHour * 60) return
      start.setHours(Math.floor(minutes / 60), minutes % 60)
    } else if (event.key === 'PageUp' || event.key === 'PageDown') {
      start.setDate(start.getDate() + (event.key === 'PageUp' ? -1 : 1))
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      const index = resources.findIndex((resource) => resource.id === item.resourceId)
      const next = resources[index + (event.key === 'ArrowLeft' ? -1 : 1)]
      if (!next) return
      resourceId = next.id
    } else return
    event.preventDefault()
    move(item, start, resourceId)
  }

  function eventButton(item: CalendarItem, timed = false) {
    const editable = Boolean(onItemMove && item.editable !== false)
    return (
      <button
        type="button"
        key={item.id}
        data-calendar-item={item.id}
        aria-label={`${getItemLabel(item)}, ${formatDay(item.start)}, ${item.allDay ? 'todo el día' : formatTime(item.start.getHours() * 60 + item.start.getMinutes())}`}
        aria-describedby={editable ? instructionsId : undefined}
        className={
          timed
            ? `dsc-calendar__time-item ${draggingId === item.id ? 'is-dragging' : ''}`
            : 'dsc-calendar__agenda-item'
        }
        style={timed ? timeItemStyle(item, startHour, endHour) : undefined}
        draggable={timed && editable}
        onClick={() => onItemClick?.(item)}
        onKeyDown={(event) => keyMove(event, item)}
        onDragStart={(event) => {
          event.dataTransfer.setData('calendar-item', item.id)
          setDraggingId(item.id)
        }}
        onDragEnd={() => setDraggingId(null)}
      >
        {render(item)}
      </button>
    )
  }

  return (
    <div
      ref={rootRef}
      role="region"
      aria-label={label}
      tabIndex={0}
      className={className}
      data-slot="calendar"
      data-view={view}
      style={style}
    >
      {onItemMove ? (
        <p id={instructionsId} className="dsc-calendar__instructions">
          Para mover un evento: Alt + ↑/↓ cambia la hora, Alt + RePág/AvPág cambia el día y Alt +
          ←/→ cambia el recurso.
        </p>
      ) : null}
      <output className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </output>
      {view === 'month' || view === 'agenda' ? (
        <div className={view === 'month' ? 'dsc-calendar__month-grid' : undefined}>
          {range.days.map((day) => (
            <section
              className={view === 'month' ? 'dsc-calendar__month-day' : 'dsc-calendar__agenda-day'}
              key={day.toISOString()}
              aria-label={formatDay(day)}
            >
              <time dateTime={localDate(day)}>
                {view === 'month' ? day.getDate() : formatDay(day)}
              </time>
              {items.filter((item) => sameDay(item.start, day)).map((item) => eventButton(item))}
              {view === 'agenda' && !items.some((item) => sameDay(item.start, day)) ? (
                <p>Sin eventos para este día.</p>
              ) : null}
            </section>
          ))}
        </div>
      ) : (
        <>
          {items
            .filter((item) => item.allDay && range.days.some((day) => sameDay(item.start, day)))
            .map((item) => eventButton(item))}
          <div
            className="dsc-calendar__time-scroll"
            tabIndex={0}
            role="region"
            aria-label="Horario"
          >
            <div className="dsc-calendar__time-grid">
              <div className="dsc-calendar__time-axis" aria-hidden="true">
                {Array.from({ length: Math.ceil(totalMinutes / interval) }, (_, i) => (
                  <time key={i}>{formatTime(startHour * 60 + i * interval)}</time>
                ))}
              </div>
              {range.days.flatMap((day) =>
                columns.map((resource) => (
                  <div
                    className="dsc-calendar__day-column"
                    key={`${localDate(day)}-${resource.id}`}
                  >
                    <div className="dsc-calendar__resource-label">
                      {formatDay(day)} {renderResource?.(resource) ?? resource.label}
                    </div>
                    <div
                      className="dsc-calendar__resource-column"
                      onDragOver={(event) => {
                        if (onItemMove) event.preventDefault()
                      }}
                      onDrop={(event) => {
                        const item = items.find(
                          (entry) => entry.id === event.dataTransfer.getData('calendar-item'),
                        )
                        if (!item || !onItemMove || item.editable === false) return
                        event.preventDefault()
                        const rect = event.currentTarget.getBoundingClientRect()
                        if (!rect.height || !Number.isFinite(event.clientY)) return
                        const offset = Math.max(
                          0,
                          Math.min(
                            totalMinutes - interval,
                            ((event.clientY - rect.top) / rect.height) * totalMinutes,
                          ),
                        )
                        move(
                          item,
                          atMinutes(day, startHour * 60 + snapMinutes(offset, interval)),
                          resource.id === '__default' ? undefined : resource.id,
                        )
                        setDraggingId(null)
                      }}
                    >
                      {items
                        .filter(
                          (item) =>
                            (item.resourceId ?? '__default') === resource.id &&
                            sameDay(item.start, day) &&
                            !item.allDay &&
                            item.start.getHours() < endHour &&
                            (item.end ?? new Date(item.start.getTime() + 30 * 60_000)).getTime() >
                              atMinutes(day, startHour * 60).getTime(),
                        )
                        .map((item) => eventButton(item, true))}
                    </div>
                  </div>
                )),
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

function visibleRange(value: Date, view: CalendarView) {
  const start = new Date(
    value.getFullYear(),
    value.getMonth(),
    view === 'month' ? 1 : value.getDate(),
  )
  if (view === 'month' || view === 'week')
    start.setDate(start.getDate() - ((start.getDay() + 6) % 7))
  const count = view === 'month' ? 42 : view === 'week' ? 7 : 1
  return {
    days: Array.from({ length: count }, (_, i) => {
      const day = new Date(start)
      day.setDate(day.getDate() + i)
      return day
    }),
  }
}

function localDate(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
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
  const endMinutes = sameDay(end, item.start) ? end.getHours() * 60 + end.getMinutes() : 24 * 60
  const visibleStart = Math.max(startHour * 60, start)
  const visibleEnd = Math.min(endHour * 60, Math.max(start + 15, endMinutes))
  const total = (endHour - startHour) * 60
  return {
    top: `${Math.max(0, ((visibleStart - startHour * 60) / total) * 100)}%`,
    height: `${Math.max(0, ((visibleEnd - visibleStart) / total) * 100)}%`,
  }
}
