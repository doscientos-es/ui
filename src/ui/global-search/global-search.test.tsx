import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { Button } from '../button/button'
import { Dialog } from '../dialog/dialog'
import { GlobalSearch, type GlobalSearchProps } from './global-search'

const items = [
  { id: 'invoices', title: 'Facturas', section: 'Contabilidad' },
  { id: 'clients', title: 'Clientes', section: 'Directorio' },
] as const

type Item = (typeof items)[number]

function Search(props: Pick<GlobalSearchProps<Item>, 'onAction' | 'focusOnMount'>) {
  const [query, setQuery] = useState('')
  return (
    <GlobalSearch
      {...props}
      label="Buscar en el espacio"
      items={query ? [items[1]] : items}
      query={query}
      onQueryChange={setQuery}
      renderItem={(item) => `${item.title} · ${item.section}`}
    />
  )
}

describe('GlobalSearch', () => {
  it('keeps caller-ranked results and opens the keyboard-active result', async () => {
    const user = userEvent.setup()
    const open = vi.fn()
    render(<Search onAction={open} />)

    const input = screen.getByRole('textbox', { name: 'Buscar en el espacio' })
    await user.type(input, 'un alias que no está en el título')
    expect(screen.queryByRole('option', { name: /Facturas/ })).toBeNull()
    const client = screen.getByRole('option', { name: 'Clientes · Directorio' })
    expect(input.getAttribute('aria-controls')).toBe(screen.getByRole('listbox').id)
    expect(client.textContent).toBe('Clientes · Directorio')
    await user.keyboard('{ArrowDown}')
    await waitFor(() => expect(input.getAttribute('aria-activedescendant')).toBe(client.id))
    await user.keyboard('{Enter}')
    expect(open).toHaveBeenCalledExactlyOnceWith(items[1])
    expect(document.activeElement).toBe(input)
  })

  it('opens a clicked result and lets the enclosing dialog handle Escape', async () => {
    const user = userEvent.setup()
    const open = vi.fn()
    render(
      <Dialog trigger="Abrir búsqueda" title="Búsqueda global">
        <Search onAction={open} focusOnMount />
      </Dialog>,
    )
    const trigger = screen.getByRole('button', { name: 'Abrir búsqueda' })
    await user.click(trigger)
    await waitFor(() => expect(document.activeElement).toBe(screen.getByRole('textbox')))
    await user.click(screen.getByRole('option', { name: 'Facturas · Contabilidad' }))
    expect(open).toHaveBeenCalledExactlyOnceWith(items[0])
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog')).toBeNull()
    await waitFor(() => expect(document.activeElement).toBe(trigger))
  })

  it('can open in a dialog without moving focus into the input', async () => {
    const user = userEvent.setup()
    render(
      <Dialog trigger="Abrir" title="Búsqueda global">
        <Search onAction={vi.fn()} focusOnMount={false} />
      </Dialog>,
    )
    await user.click(screen.getByRole('button', { name: 'Abrir' }))
    expect(document.activeElement).not.toBe(screen.getByRole('textbox'))
  })

  it('keeps partial results and retry usable and only displays empty state after loading', async () => {
    const user = userEvent.setup()
    const retry = vi.fn()
    const props: GlobalSearchProps<Item> = {
      label: 'Buscar',
      query: 'clientes',
      items,
      onAction: vi.fn(),
      onQueryChange: vi.fn(),
      feedback: <Button onPress={retry}>Reintentar</Button>,
    }
    const { rerender } = render(<GlobalSearch {...props} loading />)
    expect(screen.getByRole('status').textContent).toBe('Buscando…')
    expect(screen.getAllByRole('option')).toHaveLength(2)
    await user.click(screen.getByRole('button', { name: 'Reintentar' }))
    expect(retry).toHaveBeenCalledOnce()
    rerender(<GlobalSearch {...props} items={[]} loading />)
    expect(screen.queryByText('No hay coincidencias.')).toBeNull()
    rerender(<GlobalSearch {...props} items={[]} status="0 resultados" />)
    expect(screen.getByRole('status').textContent).toBe('0 resultados')
    expect(screen.getByText('No hay coincidencias.')).toBeTruthy()
  })
})
