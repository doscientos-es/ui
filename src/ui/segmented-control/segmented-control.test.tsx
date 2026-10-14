import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { SegmentedControl, SegmentedControlItem } from './segmented-control'

describe('SegmentedControl', () => {
  it('uses single-choice semantics rather than claiming associated tab panels', async () => {
    render(
      <SegmentedControl aria-label="Vista" defaultValue="list">
        <SegmentedControlItem value="list">Lista</SegmentedControlItem>
        <SegmentedControlItem value="calendar">Calendario</SegmentedControlItem>
      </SegmentedControl>,
    )
    expect(screen.getByRole('radiogroup', { name: 'Vista' })).toBeTruthy()
    expect(screen.queryByRole('tablist')).toBeNull()
    expect((screen.getByRole('radio', { name: 'Lista' }) as HTMLInputElement).checked).toBe(true)
    await userEvent.click(screen.getByRole('radio', { name: 'Calendario' }))
    expect((screen.getByRole('radio', { name: 'Calendario' }) as HTMLInputElement).checked).toBe(
      true,
    )
    expect((screen.getByRole('radio', { name: 'Lista' }) as HTMLInputElement).checked).toBe(false)
  })

  it('selects with arrow keys, skips disabled items and keeps a single tab stop', async () => {
    const user = userEvent.setup()
    render(
      <>
        <SegmentedControl aria-label="Vista" defaultValue="list">
          <SegmentedControlItem value="list">Lista</SegmentedControlItem>
          <SegmentedControlItem value="board" isDisabled>
            Tablero
          </SegmentedControlItem>
          <SegmentedControlItem value="calendar">Calendario</SegmentedControlItem>
        </SegmentedControl>
        <button type="button">Siguiente</button>
      </>,
    )
    await user.tab()
    expect(document.activeElement).toBe(screen.getByRole('radio', { name: 'Lista' }))
    await user.keyboard('{ArrowRight}')
    expect(document.activeElement).toBe(screen.getByRole('radio', { name: 'Calendario' }))
    expect((screen.getByRole('radio', { name: 'Calendario' }) as HTMLInputElement).checked).toBe(
      true,
    )
    await user.tab()
    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Siguiente' }))
  })

  it('supports controlled selection and native form values', async () => {
    const onChange = vi.fn()
    const view = (value: string) => (
      <form aria-label="Preferencias">
        <SegmentedControl aria-label="Vista" name="view" value={value} onChange={onChange}>
          <SegmentedControlItem value="list">Lista</SegmentedControlItem>
          <SegmentedControlItem value="calendar">Calendario</SegmentedControlItem>
        </SegmentedControl>
      </form>
    )
    const { rerender } = render(view('list'))
    await userEvent.click(screen.getByRole('radio', { name: 'Calendario' }))
    expect(onChange).toHaveBeenCalledWith('calendar')
    expect(new FormData(screen.getByRole('form') as HTMLFormElement).get('view')).toBe('list')
    rerender(view('calendar'))
    expect(new FormData(screen.getByRole('form') as HTMLFormElement).get('view')).toBe('calendar')
  })

  it.each(['isDisabled', 'isReadOnly'] as const)(
    'prevents selection changes when %s is set',
    async (prop) => {
      const onChange = vi.fn()
      render(
        <SegmentedControl
          aria-label="Vista"
          defaultValue="list"
          onChange={onChange}
          {...{ [prop]: true }}
        >
          <SegmentedControlItem value="list">Lista</SegmentedControlItem>
          <SegmentedControlItem value="calendar">Calendario</SegmentedControlItem>
        </SegmentedControl>,
      )
      await userEvent.click(screen.getByRole('radio', { name: 'Calendario' }))
      expect(onChange).not.toHaveBeenCalled()
    },
  )

  it('preserves state-based classes and vertical orientation', () => {
    render(
      <SegmentedControl
        aria-label="Vista"
        orientation="vertical"
        defaultValue="list"
        className={({ orientation }) => `custom-${orientation}`}
      >
        <SegmentedControlItem
          value="list"
          className={({ isSelected }) => (isSelected ? 'custom-selected' : '')}
        >
          Lista
        </SegmentedControlItem>
      </SegmentedControl>,
    )
    expect(screen.getByRole('radiogroup').className).toContain('custom-vertical')
    const segment = screen.getByRole('radio').closest('label')!
    expect(segment.className).toContain('custom-selected')
    expect(segment.className).toContain('data-focus-visible:ring-3')
    expect(segment.className).toContain('[@media(pointer:coarse)]:min-h-11')
  })
})
