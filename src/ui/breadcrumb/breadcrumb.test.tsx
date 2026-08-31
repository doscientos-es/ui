import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Breadcrumb, BreadcrumbLink, BreadcrumbPage, Breadcrumbs } from './breadcrumb'
describe('Breadcrumb', () => {
  it('exposes navigation and current page', () => {
    render(
      <Breadcrumbs aria-label="Ruta">
        <Breadcrumb>
          <BreadcrumbLink href="/">Inicio</BreadcrumbLink>
        </Breadcrumb>
        <Breadcrumb>
          <BreadcrumbPage>Clientes</BreadcrumbPage>
        </Breadcrumb>
      </Breadcrumbs>,
    )
    expect(screen.getByRole('link', { name: 'Inicio' })).toBeTruthy()
    expect(screen.getByText('Clientes').getAttribute('aria-current')).toBe('page')
  })
})
