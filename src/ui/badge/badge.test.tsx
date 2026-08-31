import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Badge, BadgeLink } from './badge'

describe('Badge', () => {
  it('exposes its selected variant', () => {
    render(<Badge variant="success">Activo</Badge>)
    expect(screen.getByText('Activo').getAttribute('data-variant')).toBe('success')
  })

  it('uses the semantic foreground for a destructive badge', () => {
    render(<Badge variant="destructive">Error</Badge>)
    expect(screen.getByText('Error').className).toContain('text-destructive-foreground')
  })

  it('provides an accessible link counterpart', () => {
    render(<BadgeLink href="/facturas">3 pendientes</BadgeLink>)
    expect(screen.getByRole('link', { name: '3 pendientes' }).getAttribute('href')).toBe(
      '/facturas',
    )
  })
})
