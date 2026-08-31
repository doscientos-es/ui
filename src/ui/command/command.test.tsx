import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Command, CommandInput } from './command'
describe('Command', () => {
  it('renders an accessible combobox input', () => {
    render(
      <Command aria-label="Buscar">
        <CommandInput aria-label="Buscar" />
      </Command>,
    )
    expect(screen.getByRole('combobox', { name: 'Buscar' })).toBeTruthy()
  })
})
