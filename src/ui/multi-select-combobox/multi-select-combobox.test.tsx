import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { MultiSelectCombobox } from './multi-select-combobox'

const items = [
  { id: 'ana', name: 'Ana' },
  { id: 'bruno', name: 'Bruno' },
  { id: 'ines', name: 'Inés' },
]
const defaults = {
  items,
  getItemKey: (item: (typeof items)[number]) => item.id,
  getItemLabel: (item: (typeof items)[number]) => item.name,
  label: 'Responsables',
}

describe('MultiSelectCombobox', () => {
  it('selects several options with the keyboard and keeps searching independent of selection', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<MultiSelectCombobox {...defaults} onChange={onChange} />)
    const input = screen.getByRole('combobox', { name: 'Responsables' })
    await user.click(input)
    await user.type(input, 'Ana')
    await user.keyboard('{ArrowDown}{Enter}')
    expect(onChange).toHaveBeenLastCalledWith(['ana'])
    await user.keyboard('{Escape}')
    expect(screen.getByRole('button', { name: 'Quitar Ana' })).toBeTruthy()
    await user.clear(input)
    await user.type(input, 'Bruno')
    await user.keyboard('{ArrowDown}{Enter}')
    expect(onChange).toHaveBeenLastCalledWith(['ana', 'bruno'])
    await user.keyboard('{Escape}')
    expect(screen.getByRole('button', { name: 'Quitar Ana' })).toBeTruthy()
    expect(screen.getByRole('button', { name: 'Quitar Bruno' })).toBeTruthy()
  })

  it('removes selected tags with an accessible action', async () => {
    const onChange = vi.fn()
    render(
      <MultiSelectCombobox {...defaults} defaultValue={['ana', 'bruno']} onChange={onChange} />,
    )
    await userEvent.click(screen.getByRole('button', { name: 'Quitar Ana' }))
    expect(onChange).toHaveBeenLastCalledWith(['bruno'])
    expect(screen.queryByRole('button', { name: 'Quitar Ana' })).toBeNull()
    expect(screen.getByRole('button', { name: 'Quitar Bruno' })).toBeTruthy()
  })

  it('supports Delete on a keyboard-focused tag', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(
      <MultiSelectCombobox {...defaults} defaultValue={['ana', 'bruno']} onChange={onChange} />,
    )
    const tag = screen.getByRole('row', { name: /Ana/ })
    tag.focus()
    await user.keyboard('{Delete}')
    await waitFor(() => expect(onChange).toHaveBeenLastCalledWith(['bruno']))
  })

  it('supports controlled selection without changing it internally', async () => {
    const onChange = vi.fn()
    const { rerender } = render(
      <MultiSelectCombobox {...defaults} value={['ana']} onChange={onChange} />,
    )
    await userEvent.click(screen.getByRole('button', { name: 'Quitar Ana' }))
    expect(onChange).toHaveBeenLastCalledWith([])
    expect(screen.getByRole('button', { name: 'Quitar Ana' })).toBeTruthy()
    rerender(<MultiSelectCombobox {...defaults} value={[]} onChange={onChange} />)
    expect(screen.queryByRole('button', { name: 'Quitar Ana' })).toBeNull()
  })

  it.each(['isDisabled', 'isReadOnly'] as const)(
    'prevents tag removal when %s is set',
    async (prop) => {
      const onChange = vi.fn()
      render(
        <MultiSelectCombobox
          {...defaults}
          defaultValue={['ana']}
          onChange={onChange}
          {...{ [prop]: true }}
        />,
      )
      expect(screen.queryByRole('button', { name: 'Quitar Ana' })).toBeNull()
      const tag = screen.getByRole('row', { name: /Ana/ })
      tag.focus()
      await userEvent.keyboard('{Delete}')
      expect(onChange).not.toHaveBeenCalled()
      expect(screen.getByRole('row', { name: /Ana/ })).toBeTruthy()
    },
  )

  it('shows an empty result without clearing selected items', async () => {
    render(
      <MultiSelectCombobox {...defaults} defaultValue={['ana']} emptyState="Sin coincidencias" />,
    )
    await userEvent.type(screen.getByRole('combobox'), 'zzzz')
    expect(await screen.findByText('Sin coincidencias')).toBeTruthy()
    await userEvent.keyboard('{Escape}')
    expect(screen.getByRole('button', { name: 'Quitar Ana' })).toBeTruthy()
  })

  it('uses locale-aware filtering for accented labels', async () => {
    render(<MultiSelectCombobox {...defaults} />)
    await userEvent.type(screen.getByRole('combobox'), 'ines')
    expect(await screen.findByRole('option', { name: 'Inés' })).toBeTruthy()
    expect(screen.queryByRole('option', { name: 'Ana' })).toBeNull()
  })

  it('forwards disabled keys, descriptions and invalid state', async () => {
    const onChange = vi.fn()
    render(
      <MultiSelectCombobox
        {...defaults}
        disabledKeys={['bruno']}
        description="Elige varias personas."
        isInvalid
        errorMessage="Selecciona al menos una."
        onChange={onChange}
      />,
    )
    const input = screen.getByRole('combobox')
    expect(input.getAttribute('aria-invalid')).toBe('true')
    const descriptionIds = input.getAttribute('aria-describedby')?.split(' ') ?? []
    expect(descriptionIds).toContain(screen.getByText('Elige varias personas.').id)
    expect(screen.getByText('Selecciona al menos una.')).toBeTruthy()
    await userEvent.type(input, 'Bruno')
    const option = await screen.findByRole('option', { name: 'Bruno' })
    expect(option.getAttribute('aria-disabled')).toBe('true')
    await userEvent.click(option)
    expect(onChange).not.toHaveBeenCalled()
  })

  it('submits native key arrays and preserves numeric identifiers', () => {
    render(
      <form aria-label="Equipo">
        <MultiSelectCombobox
          items={[
            { id: 1, name: 'Ana' },
            { id: 2, name: 'Bruno' },
          ]}
          getItemKey={(item) => item.id}
          getItemLabel={(item) => item.name}
          label="Equipo"
          name="members"
          defaultValue={[1, 2]}
        />
      </form>,
    )
    expect(new FormData(screen.getByRole('form') as HTMLFormElement).getAll('members')).toEqual([
      '1',
      '2',
    ])
  })

  it('allows custom labels, rendering and state-based root classes', async () => {
    render(
      <MultiSelectCombobox
        {...defaults}
        label={undefined}
        aria-label="Autores"
        defaultValue={['ana']}
        selectedLabel="Autores elegidos"
        removeLabel="Eliminar"
        renderItem={(item) => <span>{item.name} · Ejemplo</span>}
        className={() => 'custom-root'}
      />,
    )
    expect(screen.getByRole('button', { name: 'Eliminar Ana' })).toBeTruthy()
    expect(screen.getByRole('grid', { name: 'Autores elegidos' })).toBeTruthy()
    expect(document.querySelector('[data-slot="multi-select-combobox"]')?.className).toContain(
      'custom-root',
    )
    await userEvent.type(screen.getByRole('combobox', { name: 'Autores' }), 'Bruno')
    expect(await screen.findByText('Bruno · Ejemplo')).toBeTruthy()
  })
})
