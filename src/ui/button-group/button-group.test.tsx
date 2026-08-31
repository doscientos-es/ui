import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Button } from '../button/button'
import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from './button-group'

describe('ButtonGroup', () => {
  it('renders a labelled vertical group', () => {
    render(
      <ButtonGroup aria-label="Acciones" orientation="vertical">
        <Button>Guardar</Button>
        <Button>Cancelar</Button>
      </ButtonGroup>,
    )
    expect(screen.getByRole('group', { name: 'Acciones' }).getAttribute('data-orientation')).toBe(
      'vertical',
    )
  })

  it('composes text and separators', () => {
    render(
      <ButtonGroup aria-label="Paginación">
        <ButtonGroupText>Página 1</ButtonGroupText>
        <ButtonGroupSeparator />
        <Button>Siguiente</Button>
      </ButtonGroup>,
    )
    expect(screen.getByText('Página 1').getAttribute('data-slot')).toBe('button-group-text')
    expect(screen.getByRole('separator').getAttribute('data-slot')).toBe('button-group-separator')
  })
})
