import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { SubmitButton } from './submit-button'
describe('SubmitButton', () => {
  it('renders a submit button', () => {
    render(
      <form>
        <SubmitButton>Guardar</SubmitButton>
      </form>,
    )
    expect(screen.getByRole('button', { name: 'Guardar' }).getAttribute('type')).toBe('submit')
  })

  it('shows the loading label and prevents another submit while loading', () => {
    render(
      <form>
        <SubmitButton loading loadingLabel="Guardando cambios…">
          Guardar
        </SubmitButton>
      </form>,
    )

    const button = screen.getByRole('button', { name: 'Guardando cambios…' })
    expect(button.hasAttribute('disabled')).toBe(true)
    expect(button.getAttribute('aria-busy')).toBe('true')
  })

  it('keeps pendingLabel as a backwards-compatible alias', () => {
    render(
      <form>
        <SubmitButton loading pendingLabel="Enviando…">
          Enviar
        </SubmitButton>
      </form>,
    )

    expect(screen.getByRole('button', { name: 'Enviando…' })).toBeTruthy()
  })
})
