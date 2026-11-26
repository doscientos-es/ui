import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

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

  it('announces progress, preserves focus and blocks another activation while pending', async () => {
    const user = userEvent.setup()
    const onPress = vi.fn()
    const form = (isPending = false) => (
      <form onSubmit={(event) => event.preventDefault()}>
        <SubmitButton isPending={isPending} pendingLabel="Guardando cambios…" onPress={onPress}>
          Guardar
        </SubmitButton>
      </form>
    )
    const { rerender } = render(form())
    await user.tab()
    const button = screen.getByRole('button', { name: 'Guardar' })
    expect(document.activeElement).toBe(button)
    expect(screen.queryByRole('progressbar')).toBeNull()

    rerender(form(true))
    expect(document.activeElement).toBe(button)
    expect(button.getAttribute('aria-disabled')).toBe('true')
    expect(button.getAttribute('type')).toBe('button')
    const progress = screen.getByRole('progressbar', { name: 'Guardando cambios…' })
    expect(progress.querySelector('svg')?.getAttribute('class')).toContain(
      'motion-safe:animate-spin',
    )
    await user.keyboard('{Enter}')
    await user.click(button)
    expect(onPress).not.toHaveBeenCalled()

    rerender(form())
    await user.keyboard('{Enter}')
    expect(onPress).toHaveBeenCalledOnce()
  })

  it('provides a default pending label', () => {
    render(
      <form>
        <SubmitButton isPending>Enviar</SubmitButton>
      </form>,
    )

    expect(screen.getByRole('progressbar', { name: 'Guardando…' })).toBeTruthy()
  })
})
