import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Marquee } from './marquee'

describe('Marquee', () => {
  it('renders one accessible track and an inert visual duplicate', () => {
    render(
      <Marquee aria-label="Clientes" duration={12} pauseOnHover>
        <a href="/acme">Acme</a>
      </Marquee>,
    )

    const marquee = screen.getByLabelText('Clientes')
    const track = marquee.querySelector('[data-slot="marquee-track"]')
    const duplicate = track?.lastElementChild
    expect(track?.getAttribute('class')).toContain('motion-safe:animate-marquee-x')
    expect(track?.getAttribute('class')).toContain(
      'motion-safe:hover:[animation-play-state:paused]',
    )
    expect(marquee.getAttribute('style')).toContain('--marquee-duration: 12s')
    expect(screen.getAllByRole('link', { name: 'Acme' })).toHaveLength(1)
    expect(duplicate?.getAttribute('aria-hidden')).toBe('true')
    expect(duplicate?.hasAttribute('inert')).toBe(true)
  })

  it('configures vertical reverse motion and normalizes invalid values', () => {
    render(
      <Marquee direction="down" duration={-1} fadeAmount={90}>
        Elemento
      </Marquee>,
    )

    const marquee = document.querySelector('[data-slot="marquee"]')
    const track = marquee?.querySelector('[data-slot="marquee-track"]')
    expect(marquee?.getAttribute('data-direction')).toBe('down')
    expect(track?.getAttribute('class')).toContain('motion-safe:animate-marquee-y')
    expect(track?.getAttribute('class')).toContain('motion-safe:[animation-direction:reverse]')
    expect(marquee?.getAttribute('style')).toContain('--marquee-duration: 0.01s')
    expect(marquee?.getAttribute('data-fade-amount')).toBe('50')
  })
})
