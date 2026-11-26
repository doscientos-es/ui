import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createRef, useState } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { SearchField } from './search-field'

describe('SearchField', () => {
  it('updates a controlled query and clears it while returning focus to the input', async () => {
    const onChange = vi.fn()
    const onClear = vi.fn()
    const ref = createRef<HTMLInputElement>()
    function Controlled() {
      const [query, setQuery] = useState('')
      return (
        <SearchField
          label="Buscar clientes"
          inputRef={ref}
          value={query}
          onClear={onClear}
          onChange={(value) => {
            onChange(value)
            setQuery(value)
          }}
        />
      )
    }
    render(<Controlled />)
    const input = screen.getByRole('searchbox', { name: 'Buscar clientes' }) as HTMLInputElement
    expect(ref.current).toBe(input)
    expect(screen.queryByRole('button', { name: 'Borrar búsqueda' })).toBeNull()
    await userEvent.type(input, 'Ana')
    expect(onChange).toHaveBeenLastCalledWith('Ana')
    await userEvent.click(screen.getByRole('button', { name: 'Borrar búsqueda' }))
    expect(input.value).toBe('')
    expect(onChange).toHaveBeenLastCalledWith('')
    expect(onClear).toHaveBeenCalledOnce()
    expect(document.activeElement).toBe(input)
  })

  it('supports an uncontrolled initial value, form submission, reset and Escape', async () => {
    render(
      <form aria-label="Filtros">
        <SearchField aria-label="Buscar" name="query" defaultValue="Inicial" clearLabel="Limpiar" />
        <button type="reset">Restablecer</button>
      </form>,
    )
    const input = screen.getByRole('searchbox', { name: 'Buscar' }) as HTMLInputElement
    const form = screen.getByRole('form') as HTMLFormElement
    expect(new FormData(form).get('query')).toBe('Inicial')
    await userEvent.click(input)
    await userEvent.keyboard('{Escape}')
    expect(input.value).toBe('')
    await userEvent.click(screen.getByRole('button', { name: 'Restablecer' }))
    expect(input.value).toBe('Inicial')
    expect(screen.getByRole('button', { name: 'Limpiar' })).toBeTruthy()
  })

  it.each(['isDisabled', 'isReadOnly'] as const)(
    'prevents clearing when %s is set',
    async (flag) => {
      const onChange = vi.fn()
      render(
        <SearchField
          aria-label="Buscar"
          defaultValue="Ana"
          onChange={onChange}
          {...{ [flag]: true }}
        />,
      )
      expect(screen.queryByRole('button', { name: 'Borrar búsqueda' })).toBeNull()
      const input = screen.getByRole('searchbox') as HTMLInputElement
      expect(flag === 'isDisabled' ? input.disabled : input.readOnly).toBe(true)
      expect(onChange).not.toHaveBeenCalled()
    },
  )

  it('connects help text and validation feedback to the input', () => {
    render(
      <SearchField
        label="Buscar"
        description="Nombre o correo"
        isInvalid
        errorMessage="Revisa la búsqueda"
      />,
    )
    const input = screen.getByRole('searchbox', { name: 'Buscar' })
    const ids = input.getAttribute('aria-describedby')?.split(' ') ?? []
    expect(ids).toContain(screen.getByText('Nombre o correo').id)
    expect(ids).toContain(screen.getByText('Revisa la búsqueda').id)
    expect(input.getAttribute('aria-invalid')).toBe('true')
  })
})
