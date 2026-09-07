import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { House, Search, UserRound } from 'lucide-react'
import { describe, expect, it } from 'vitest'

import { MobileNavigation, MobileNavigationItem } from './mobile-navigation'

describe('MobileNavigation', () => {
  it('exposes an accessible landmark and marks the active destination', () => {
    render(
      <MobileNavigation aria-label="Secciones principales">
        <MobileNavigationItem href="#home" icon={<House />} label="Inicio" active />
        <MobileNavigationItem href="#search" icon={<Search />} label="Buscar" />
        <MobileNavigationItem href="#profile" icon={<UserRound />} label="Perfil" />
      </MobileNavigation>,
    )

    const navigation = screen.getByRole('navigation', { name: 'Secciones principales' })
    const links = screen.getAllByRole('link')

    expect(navigation.getAttribute('data-sticky')).toBe('true')
    expect(links).toHaveLength(3)
    expect(links.every((link) => link.className.includes('flex-1'))).toBe(true)
    expect(screen.getByRole('link', { name: 'Inicio' }).getAttribute('aria-current')).toBe('page')
    expect(screen.getByRole('link', { name: 'Buscar' }).getAttribute('aria-current')).toBeNull()
  })

  it('supports keyboard focus and an opt-out from sticky positioning', async () => {
    const user = userEvent.setup()
    render(
      <MobileNavigation sticky={false}>
        <MobileNavigationItem href="#home" icon={<House />} label="Inicio" />
        <MobileNavigationItem href="#profile" icon={<UserRound />} label="Perfil" />
      </MobileNavigation>,
    )

    await user.tab()

    expect(document.activeElement).toBe(screen.getByRole('link', { name: 'Inicio' }))
    expect(screen.getByRole('navigation').getAttribute('data-sticky')).toBeNull()
  })
})
