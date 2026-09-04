import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderTitle,
  SectionHeader,
  SectionHeaderTitle,
} from './page-header'
describe('PageHeader', () => {
  it('renders a labelled heading structure', () => {
    render(
      <PageHeader>
        <div>
          <PageHeaderTitle>Clientes</PageHeaderTitle>
          <PageHeaderDescription>Gestiona tus clientes</PageHeaderDescription>
        </div>
      </PageHeader>,
    )
    expect(screen.getByRole('heading', { name: 'Clientes' })).toBeTruthy()
    expect(screen.getByText('Gestiona tus clientes')).toBeTruthy()
  })
})

it('uses a section-level heading without another page h1', () => {
  render(
    <SectionHeader>
      <SectionHeaderTitle>Actividad</SectionHeaderTitle>
    </SectionHeader>,
  )
  expect(screen.getByRole('heading', { level: 2, name: 'Actividad' })).toBeTruthy()
})
