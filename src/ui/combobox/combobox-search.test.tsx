import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, it, vi } from 'vitest'

import { AutocompleteCombobox } from './combobox'

const items = [
  { id: 'typo', label: 'Garica' },
  { id: 'substring', label: 'Ana García' },
  { id: 'exact', label: 'García' },
  { id: 'other', label: 'Bruno López' },
]

it('ranks accent-insensitive and fuzzy results and selects the intended item', async () => {
  const onChange = vi.fn()
  render(<AutocompleteCombobox label="Persona" items={items} getItemKey={(item) => item.id} getItemLabel={(item) => item.label} onChange={onChange} />)
  await userEvent.type(screen.getByRole('combobox'), 'garcia')
  expect(screen.getAllByRole('option').map((option) => option.textContent)).toEqual([
    'García', 'Ana García', 'Garica',
  ])
  await userEvent.click(screen.getByRole('option', { name: 'Garica' }))
  expect(onChange).toHaveBeenLastCalledWith('typo', items[0])
})

it('does not accept a fuzzy-only result as an inline suggestion with Tab', async () => {
  const onChange = vi.fn()
  render(<AutocompleteCombobox label="Persona" items={[items[1]!]} getItemKey={(item) => item.id} getItemLabel={(item) => item.label} onChange={onChange} />)
  const input = screen.getByRole('combobox') as HTMLInputElement
  await userEvent.type(input, 'garica')
  expect(screen.getByRole('option', { name: 'Ana García' })).toBeTruthy()
  await userEvent.tab()
  expect(onChange).not.toHaveBeenCalledWith('substring', items[1])
})