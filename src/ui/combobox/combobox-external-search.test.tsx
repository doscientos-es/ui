import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { expect, it, vi } from 'vitest'

import { AutocompleteCombobox } from './combobox'

const items = [
  { id: 'email', label: 'Bruno' },
  { id: 'name', label: 'Ana' },
]

it('shows external results in the received order and selects an unrelated label', async () => {
  const onChange = vi.fn()
  function Controlled({ results }: { results: typeof items }) {
    const [query, setQuery] = useState('')
    return (
      <AutocompleteCombobox
        label="Persona"
        items={results}
        getItemKey={(item) => item.id}
        getItemLabel={(item) => item.label}
        filterMode="external"
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
  expect(onChange).toHaveBeenLastCalledWith('email', items[0])
})

it('does not offer or accept an inline suggestion in external mode', async () => {
  const onChange = vi.fn()
  render(
    <AutocompleteCombobox
      label="Persona"
      items={items}
      getItemKey={(item) => item.id}
      getItemLabel={(item) => item.label}
      filterMode="external"
      onChange={onChange}
    />,
  )
  const input = screen.getByRole('combobox')
  await userEvent.type(input, 'Br')
  expect(input.getAttribute('aria-autocomplete')).toBe('list')
  await userEvent.tab()
  expect(onChange).not.toHaveBeenCalledWith('email', items[0])
})

it('keeps a controlled selection visible after external results change', async () => {
  const onChange = vi.fn()
  function Controlled({ results }: { results: typeof items }) {
    const [value, setValue] = useState<string | number | null>(null)
    return (
      <AutocompleteCombobox
        label="Persona"
        items={results}
        getItemKey={(item) => item.id}
        getItemLabel={(item) => item.label}
        filterMode="external"
        value={value}
        onChange={(key) => {
          onChange(key)
          setValue(key)
        }}
      />
    )
  }
  const { rerender } = render(<Controlled results={items} />)
  await userEvent.type(screen.getByRole('combobox'), 'email')
  await userEvent.click(screen.getByRole('option', { name: 'Bruno' }))
  rerender(<Controlled results={items.slice(1)} />)
  expect((screen.getByRole('combobox') as HTMLInputElement).value).toBe('Bruno')
  await userEvent.clear(screen.getByRole('combobox'))
  await userEvent.type(screen.getByRole('combobox'), 'otra búsqueda')
  await userEvent.tab()
  expect(onChange).toHaveBeenLastCalledWith('email')
  expect((screen.getByRole('combobox') as HTMLInputElement).value).toBe('Bruno')
  await userEvent.clear(screen.getByRole('combobox'))
  await userEvent.tab()
  expect(onChange).toHaveBeenLastCalledWith(null)
})
