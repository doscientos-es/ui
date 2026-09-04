import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { AutocompleteCombobox } from './combobox'
const users = [
  { id: '1', name: 'Ana García', email: 'ana@doscientos.com' },
  { id: '2', name: 'Bruno López', email: 'bruno@doscientos.com' },
]
describe('AutocompleteCombobox', () => {
  it('filters and renders custom items', async () => {
    const user = userEvent.setup()
    render(
      <AutocompleteCombobox
        aria-label="Asignar usuario"
        items={users}
        getItemKey={(item) => item.id}
        getItemLabel={(item) => item.name}
        renderItem={(item) => (
          <>
            <strong>{item.name}</strong>
            <span>{item.email}</span>
          </>
        )}
      />,
    )
    const input = screen.getByRole('combobox', { name: 'Asignar usuario' })
    await user.type(input, 'bruno')
    expect(screen.getByRole('option', { name: /Bruno López/ })).toBeTruthy()
    expect(screen.queryByRole('option', { name: /Ana García/ })).toBeNull()
    expect(screen.getByRole('listbox').parentElement?.className).toContain('z-50')
  })
  it('accepts the inline suggestion with Tab', async () => {
    const user = userEvent.setup()
    render(
      <AutocompleteCombobox
        aria-label="Contrato"
        items={[{ id: 'c-2026', label: 'CON-2026-001' }]}
        getItemKey={(item) => item.id}
        getItemLabel={(item) => item.label}
      />,
    )
    const input = screen.getByRole('combobox', { name: 'Contrato' })
    await user.type(input, 'con-2026')
    await user.tab()
    expect(input.getAttribute('value')).toBe('CON-2026-001')
  })

  it('preserves a consumer keyboard handler before accepting a suggestion', async () => {
    const user = userEvent.setup()
    const onInputChange = vi.fn()
    const onKeyDown = vi.fn((event: React.KeyboardEvent) => {
      if (event.key === 'Tab') event.preventDefault()
    })
    render(
      <AutocompleteCombobox
        aria-label="Contrato"
        items={[{ id: 'c-2026', label: 'CON-2026-001' }]}
        getItemKey={(item) => item.id}
        getItemLabel={(item) => item.label}
        onInputChange={onInputChange}
        onKeyDown={onKeyDown}
      />,
    )

    const input = screen.getByRole('combobox', { name: 'Contrato' })
    await user.type(input, 'con-2026')
    await user.keyboard('{Tab}')

    expect(onKeyDown).toHaveBeenCalled()
    expect(onInputChange.mock.calls).not.toContainEqual(['CON-2026-001'])
  })
})
