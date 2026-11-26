import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { expect, it, vi } from 'vitest'

import { MultiSelectCombobox } from './multi-select-combobox'

const items = [
  { id: 'email', label: 'Bruno' },
  { id: 'name', label: 'Ana' },
]

it('shows external results in order, ignores local filters and selects an unrelated label', async () => {
  const onChange = vi.fn()
  function Controlled({ results }: { results: typeof items }) {
    const [query, setQuery] = useState('')
    return (
      <MultiSelectCombobox
        label="Personas"
        items={results}
        getItemKey={(item) => item.id}
        getItemLabel={(item) => item.label}
        filterMode="external"
        defaultFilter={() => false}
        inputValue={query}
        onInputChange={setQuery}
        onChange={onChange}
      />
    )
  }
  const { rerender } = render(<Controlled results={[]} />)
  await userEvent.type(screen.getByRole('combobox'), 'email')
  rerender(<Controlled results={items} />)
  expect(screen.getAllByRole('option').map((option) => option.textContent)).toEqual([
    'Bruno',
    'Ana',
  ])
  await userEvent.click(screen.getByRole('option', { name: 'Bruno' }))
  expect(onChange).toHaveBeenLastCalledWith(['email'])
  await userEvent.keyboard('{Escape}')
  expect(screen.getByRole('button', { name: 'Quitar Bruno' })).toBeTruthy()
  await userEvent.click(screen.getByRole('button', { name: 'Quitar Bruno' }))
  expect(onChange).toHaveBeenLastCalledWith(['name'])
  rerender(<Controlled results={items.slice(1)} />)
  await userEvent.type(screen.getByRole('combobox'), 'test')
  await userEvent.click(screen.getByRole('option', { name: 'Ana' }))
  expect(onChange).toHaveBeenLastCalledWith(['email', 'name'])
  await userEvent.keyboard('{Escape}')
  expect(screen.getByRole('button', { name: 'Quitar Bruno' })).toBeTruthy()
})
