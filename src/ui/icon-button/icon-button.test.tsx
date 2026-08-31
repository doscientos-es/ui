import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { IconButton } from './icon-button'

describe('IconButton', () => {
  it('renders an icon-only button with an accessible name', () => {
    render(<IconButton label="Descargar PDF">↓</IconButton>)

    expect(screen.getByRole('button', { name: 'Descargar PDF' })).toBeTruthy()
  })

  it('can render an icon-only link', () => {
    render(
      <IconButton label="Abrir factura" href="/invoices/123">
        →
      </IconButton>,
    )

    const link = screen.getByRole('link', { name: 'Abrir factura' })
    expect(link.getAttribute('href')).toBe('/invoices/123')
  })
})
