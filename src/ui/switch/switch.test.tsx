import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { KeyboardEvent } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { Switch } from './switch'

describe('Switch', () => {
  it('keeps accessible switch semantics and supports keyboard interaction', async () => {
    const user = userEvent.setup()
    render(<Switch>Activar notificaciones</Switch>)

    const switchControl = screen.getByRole('switch', { name: 'Activar notificaciones' })
    expect(switchControl).toHaveProperty('checked', false)

    await user.click(switchControl)
    expect(switchControl).toHaveProperty('checked', true)

    await user.keyboard(' ')
    expect(switchControl).toHaveProperty('checked', false)
  })

  it('does not allow interaction when disabled', async () => {
    const user = userEvent.setup()
    render(
      <Switch isDisabled defaultSelected>
        Función activa
      </Switch>,
    )

    const switchControl = screen.getByRole('switch', { name: 'Función activa' })
    expect(switchControl).toHaveProperty('disabled', true)
    expect(switchControl).toHaveProperty('checked', true)

    await user.click(switchControl)
    expect(switchControl).toHaveProperty('checked', true)
  })

  it('associates an external label through its id', () => {
    render(
      <>
        <label htmlFor="per-platform-copy">Personalizar por red</label>
        <Switch id="per-platform-copy" />
      </>,
    )

    expect(screen.getByRole('switch', { name: 'Personalizar por red' })).toBeTruthy()
  })

  it('supports directional arrows only while the switch has focus', async () => {
    const user = userEvent.setup()
    render(<Switch>Sincronización automática</Switch>)

    const switchControl = screen.getByRole('switch', { name: 'Sincronización automática' })
    await user.keyboard('{ArrowRight}')
    expect(switchControl).toHaveProperty('checked', false)

    act(() => switchControl.focus())
    await act(() => user.keyboard('{ArrowRight}'))
    expect(switchControl).toHaveProperty('checked', true)

    await act(() => user.keyboard('{ArrowRight}'))
    expect(switchControl).toHaveProperty('checked', true)

    await act(() => user.keyboard('{ArrowLeft}'))
    expect(switchControl).toHaveProperty('checked', false)

    await user.keyboard(' ')
    expect(switchControl).toHaveProperty('checked', true)
  })

  it('lets consumers cancel directional keyboard behavior', async () => {
    const user = userEvent.setup()
    const onKeyDown = vi.fn((event: KeyboardEvent) => event.preventDefault())
    render(<Switch onKeyDown={onKeyDown}>Actualización automática</Switch>)

    const switchControl = screen.getByRole('switch', { name: 'Actualización automática' })
    act(() => switchControl.focus())
    await user.keyboard('{ArrowRight}')

    expect(onKeyDown).toHaveBeenCalled()
    expect(switchControl).toHaveProperty('checked', false)
  })

  it('supports semantic sizes, descriptions and state icons', async () => {
    const user = userEvent.setup()
    render(
      <Switch
        size="lg"
        description="Se puede cambiar después"
        icon={<span>off</span>}
        selectedIcon={<span>on</span>}
      >
        Modo automático
      </Switch>,
    )

    const switchControl = screen.getByRole('switch', { name: /Modo automático/ })
    const switchRoot = switchControl.closest('[data-slot="switch"]')
    const thumb = switchRoot?.querySelector<HTMLElement>('[data-slot="switch-thumb"]')
    expect(switchRoot?.getAttribute('data-size')).toBe('lg')
    expect(thumb?.style.transform).toBe('translate3d(0, 0, 0)')
    expect(thumb?.style.width).toBe('1.25rem')
    expect(screen.getByText('Se puede cambiar después')).toBeTruthy()
    expect(screen.getByText('off')).toBeTruthy()

    await user.hover(switchRoot as HTMLElement)
    expect(thumb?.style.width).toBe('1.5rem')
    await user.click(switchControl)
    expect(thumb?.style.transform).toBe('translate3d(1rem, 0, 0)')
    expect(screen.getByText('on')).toBeTruthy()
    expect(screen.queryByText('off')).toBeNull()

    await user.unhover(switchRoot as HTMLElement)
    expect(thumb?.style.width).toBe('1.25rem')
    expect(thumb?.style.transform).toBe('translate3d(1.25rem, 0, 0)')
  })
})
