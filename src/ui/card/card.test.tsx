import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardToolbar,
} from './card'

describe('Card', () => {
  it('composes its regions and size', () => {
    render(
      <Card size="sm" variant="flat">
        <CardHeader>
          <CardTitle>Factura</CardTitle>
          <CardDescription>Actualizada hoy</CardDescription>
          <CardAction>Acción</CardAction>
        </CardHeader>
        <CardContent>Contenido</CardContent>
        <CardToolbar>Filtros</CardToolbar>
        <CardFooter>Total</CardFooter>
      </Card>,
    )
    const card = screen.getByText('Factura').closest('[data-slot="card"]')
    expect(card?.getAttribute('data-size')).toBe('sm')
    expect(card?.getAttribute('data-variant')).toBe('flat')
    expect(card?.className).toContain('border-border')
    expect(screen.getByText('Acción').getAttribute('data-slot')).toBe('card-action')
    expect(screen.getByText('Total').getAttribute('data-slot')).toBe('card-footer')
    expect(screen.getByRole('toolbar').getAttribute('data-slot')).toBe('card-toolbar')
  })
})
