import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { Select, SelectContent, SelectItem, SelectList, SelectTrigger, SelectValue } from './select'

function Example({ disabled = false }: { disabled?: boolean }) {
  return (
    <Select aria-label="Cliente" defaultSelectedKey="ana" isDisabled={disabled}>
      <SelectTrigger className={(state) => state.isDisabled ? 'custom-disabled' : 'custom-trigger'}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectList>
          <SelectItem id="ana" textValue="Ana" className={(state) => state.isSelected ? 'custom-selected' : ''}>
            {(state) => <span>{state.isSelected ? 'Ana · seleccionada' : 'Ana'}</span>}
          </SelectItem>
          <SelectItem id="sara" textValue="Sara">Sara</SelectItem>
        </SelectList>
      </SelectContent>
    </Select>
  )
}

describe('Select', () => {
  it('supports keyboard selection and marks selected options with a decorative check', async () => {
    const user = userEvent.setup()
    render(<Example />)
    const trigger = screen.getByRole('button')
    expect(trigger.classList.contains('custom-trigger')).toBe(true)
    expect(trigger.classList.contains('min-w-0')).toBe(true)
    trigger.focus()
    await user.keyboard('{ArrowDown}')
    const selected = screen.getByRole('option', { selected: true })
    expect(selected.classList.contains('custom-selected')).toBe(true)
    expect(selected.querySelector('svg')?.getAttribute('aria-hidden')).toBe('true')
    expect(screen.getByRole('option', { name: 'Sara' }).querySelector('svg')).toBeNull()
    await user.keyboard('{ArrowDown}{Enter}')
    expect(screen.queryByRole('listbox')).toBeNull()
    expect(trigger.textContent).toContain('Sara')
  })

  it('keeps disabled controls closed and evaluates their className callback', async () => {
    render(<Example disabled />)
    const trigger = screen.getByRole('button') as HTMLButtonElement
    expect(trigger.disabled).toBe(true)
    expect(trigger.classList.contains('custom-disabled')).toBe(true)
    await userEvent.click(trigger)
    expect(screen.queryByRole('listbox')).toBeNull()
  })
})