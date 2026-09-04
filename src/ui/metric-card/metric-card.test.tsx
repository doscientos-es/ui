import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { MetricCard } from './metric-card'

describe('MetricCard', () => {
  it('renders the metric and its optional supporting content', () => {
    render(
      <MetricCard label="Solicitudes" value={24} description="Actualizado ahora" tone="info" />,
    )

    const card = screen.getByText('Solicitudes').closest('[data-slot="metric-card"]')
    expect(card?.getAttribute('data-tone')).toBe('info')
    expect(screen.getByText('24').getAttribute('data-slot')).toBe('metric-card-value')
    expect(screen.getByText('Actualizado ahora')).toBeTruthy()
  })

  it('communicates loading and trend information', () => {
    const { container } = render(
      <MetricCard
        label="Ventas"
        value="€12.400"
        loading
        loadingLabel="Cargando Ventas"
        trend="up"
        delta="+12%"
      />,
    )
    expect(container.querySelector('[data-slot="metric-card"]')?.getAttribute('aria-busy')).toBe(
      'true',
    )
    expect(screen.getByLabelText('Cargando Ventas')).toBeTruthy()
    expect(screen.getByText('+12%')).toBeTruthy()
  })
})
