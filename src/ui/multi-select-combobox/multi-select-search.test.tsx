import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { expect, it, vi } from 'vitest'

import { MultiSelectCombobox } from './multi-select-combobox'

const items = [
  { id: 'typo', label: 'Garica' },
  { id: 'substring', label: 'Ana García' },
  { id: 'exact', label: 'García' },
  { id: 'other', label: 'Bruno López' },
]
const defaults = {
  items,
  label: 'Personas',
  getItemKey: (item: (typeof items)[number]) => item.id,
  getItemLabel: (item: (typeof items)[number]) => item.label,
}

it('ranks matches without losing selections hidden by the search', async () => {
  const onChange = vi.fn()
  render(<MultiSelectCombobox {...defaults} defaultValue={['other']} onChange={onChange} />)
  await userEvent.type(screen.getByRole('combobox'), 'garcia')
  expect(screen.getAllByRole('option').map((option) => option.textContent)).toEqual([
    'García',
    'Ana García',
    'Garica',
  ])
  expect(screen.getByText('Bruno López')).toBeTruthy()
  await userEvent.click(screen.getByRole('option', { name: 'Garica' }))
  expect(onChange).toHaveBeenLastCalledWith(['other', 'typo'])
  await userEvent.keyboard('{Escape}')
  expect(screen.getByRole('button', { name: 'Quitar Bruno López' })).toBeTruthy()
  expect(screen.getByRole('button', { name: 'Quitar Garica' })).toBeTruthy()
})

it('supports controlled queries and a custom filter', async () => {
  function Controlled() {
    const [query, setQuery] = useState('')
    return (
      <MultiSelectCombobox
        {...defaults}
        inputValue={query}
        onInputChange={setQuery}
        defaultFilter={(label, term) => label.startsWith(term)}
      />
    )
  }
  render(<Controlled />)
  await userEvent.type(screen.getByRole('combobox'), 'Gar')
  expect(screen.getAllByRole('option').map((option) => option.textContent)).toEqual([
    'Garica',
    'García',
  ])
})
