import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { describe, expect, it, vi } from 'vitest'

import {
  AutocompleteCombobox,
  Combobox,
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from './combobox'
const users = [
  { id: '1', name: 'Ana García', email: 'ana@doscientos.com' },
  { id: '2', name: 'Bruno López', email: 'bruno@doscientos.com' },
]
describe('AutocompleteCombobox', () => {
  it('composes functional className APIs with the built-in styles', async () => {
    const user = userEvent.setup()
    render(
      <Combobox aria-label="Test" items={users}>
        <ComboboxInput />
        <ComboboxContent className={() => 'custom-popup'}>
          <ComboboxList className={() => 'custom-list'}>
            {(item: (typeof users)[number]) => (
              <ComboboxItem id={item.id} textValue={item.name} className={() => 'custom-item'}>
                {item.name}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>,
    )
    await user.type(screen.getByRole('combobox'), 'Ana')
    expect(screen.getByRole('listbox').className).toContain('custom-list')
    expect(screen.getByRole('listbox').parentElement?.className).toContain('custom-popup')
    expect(screen.getByRole('option', { name: 'Ana García' }).className).toContain('custom-item')
  })
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

  it('shows the initial value and emits a selected key and item using onChange', async () => {
    const onChange = vi.fn()
    render(
      <AutocompleteCombobox
        label="Usuario"
        items={users}
        getItemKey={(item) => item.id}
        getItemLabel={(item) => item.name}
        defaultValue="1"
        onChange={onChange}
      />,
    )
    const input = screen.getByRole('combobox', { name: 'Usuario' }) as HTMLInputElement
    expect(input.value).toBe('Ana García')
    await userEvent.clear(input)
    await userEvent.type(input, 'Bruno')
    await userEvent.click(await screen.findByRole('option', { name: 'Bruno López' }))
    expect(onChange).toHaveBeenLastCalledWith('2', users[1])
    expect(input.value).toBe('Bruno López')
  })

  it('reflects changes to a controlled selection', () => {
    const field = (value: string | null) => (
      <AutocompleteCombobox
        label="Usuario"
        items={users}
        getItemKey={(item) => item.id}
        getItemLabel={(item) => item.name}
        value={value}
        onChange={() => {}}
      />
    )
    const { rerender } = render(field('1'))
    const input = screen.getByRole('combobox', { name: 'Usuario' }) as HTMLInputElement
    expect(input.value).toBe('Ana García')
    rerender(field('2'))
    expect(input.value).toBe('Bruno López')
    rerender(field(null))
    expect(input.value).toBe('')
  })

  it('allows editing a controlled selection before choosing another item', async () => {
    function Controlled() {
      const [value, setValue] = useState<string | number | null>('1')
      return (
        <AutocompleteCombobox
          label="Usuario"
          items={users}
          getItemKey={(item) => item.id}
          getItemLabel={(item) => item.name}
          value={value}
          onChange={setValue}
        />
      )
    }
    render(<Controlled />)
    const input = screen.getByRole('combobox', { name: 'Usuario' }) as HTMLInputElement
    await userEvent.clear(input)
    await userEvent.type(input, 'Bruno')
    expect(input.value).toBe('Bruno')
    await userEvent.click(await screen.findByRole('option', { name: 'Bruno López' }))
    expect(input.value).toBe('Bruno López')
  })

  it('submits an accepted suggestion as the selected key', async () => {
    render(
      <form aria-label="Asignación">
        <AutocompleteCombobox
          label="Usuario"
          name="user"
          items={users}
          getItemKey={(item) => item.id}
          getItemLabel={(item) => item.name}
        />
      </form>,
    )
    const form = screen.getByRole('form') as HTMLFormElement
    await userEvent.type(screen.getByRole('combobox', { name: 'Usuario' }), 'Ana')
    await userEvent.tab()
    expect(new FormData(form).get('user')).toBe('1')
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
