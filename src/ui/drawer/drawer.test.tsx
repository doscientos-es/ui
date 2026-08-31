import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Drawer, DrawerTitle } from './drawer'
describe('Drawer', () => {
  it('renders an accessible named dialog when open', () => {
    render(
      <Drawer isOpen>
        <DrawerTitle>Filtros</DrawerTitle>
      </Drawer>,
    )
    expect(screen.getByRole('dialog', { name: 'Filtros' })).toBeTruthy()
  })
})
