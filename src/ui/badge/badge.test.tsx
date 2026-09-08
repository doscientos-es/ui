import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { Badge, BadgeLink } from './badge'

describe('Badge', () => {
  it.each(['success', 'warning', 'info', 'danger', 'destructive'] as const)(
    'provides a decorative default icon for %s without changing the label',
    (variant) => {
      render(<Badge variant={variant}>Estado</Badge>)
      const badge = screen.getByText('Estado')
      expect(badge.querySelectorAll('svg')).toHaveLength(1)
      expect(badge.querySelector('[data-slot="badge-icon"]')?.getAttribute('aria-hidden')).toBe(
        'true',
      )
    },
  )

  it.each(['default', 'secondary', 'neutral', 'outline', 'ghost', 'link'] as const)(
    'leaves non-status variant %s without an automatic icon',
    (variant) => {
      render(<Badge variant={variant}>Categoría</Badge>)
      expect(screen.getByText('Categoría').querySelector('svg')).toBeNull()
    },
  )

  it.each([false, null])('hides the default icon with icon=%s', (icon) => {
    render(
      <Badge variant="success" icon={icon}>
        Aceptada
      </Badge>,
    )
    expect(screen.getByText('Aceptada').querySelector('[data-slot="badge-icon"]')).toBeNull()
  })

  it('replaces the default icon and restores it when the override is removed', () => {
    const { rerender } = render(
      <Badge variant="info" icon={<svg data-testid="custom-icon" />}>
        Emitida
      </Badge>,
    )
    expect(screen.getByTestId('custom-icon')).toBeTruthy()
    expect(screen.getByText('Emitida').querySelectorAll('svg')).toHaveLength(1)
    rerender(<Badge variant="info">Emitida</Badge>)
    expect(screen.queryByTestId('custom-icon')).toBeNull()
    expect(screen.getByText('Emitida').querySelectorAll('svg')).toHaveLength(1)
  })

  it('preserves link render props, accessible name and keyboard focus with automatic icons', async () => {
    const user = userEvent.setup()
    render(
      <BadgeLink href="/facturas" variant="success">
        {({ isFocused }) => (isFocused ? 'Ver aceptada' : 'Aceptada')}
      </BadgeLink>,
    )
    const link = screen.getByRole('link', { name: 'Aceptada' })
    expect(link.querySelectorAll('svg')).toHaveLength(1)
    await user.tab()
    expect(document.activeElement).toBe(link)
    expect(screen.getByRole('link', { name: 'Ver aceptada' })).toBe(link)
  })

  it('supports custom and hidden icons in BadgeLink too', () => {
    const { rerender } = render(
      <BadgeLink href="/facturas" variant="success" icon={<svg data-testid="link-icon" />}>
        Aceptada
      </BadgeLink>,
    )
    expect(screen.getByTestId('link-icon')).toBeTruthy()
    expect(screen.getByRole('link').querySelectorAll('svg')).toHaveLength(1)
    rerender(
      <BadgeLink href="/facturas" variant="success" icon={false}>
        Aceptada
      </BadgeLink>,
    )
    expect(screen.getByRole('link', { name: 'Aceptada' }).querySelector('svg')).toBeNull()
  })

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
