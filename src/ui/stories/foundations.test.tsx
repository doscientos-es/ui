import { fireEvent, render, screen } from '@testing-library/react'
import { createRef } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { BrandMark, Eyebrow } from '../brand/brand'
import { DocPreview } from '../doc-preview/doc-preview'
import {
  ErrorState,
  ErrorStateActions,
  ErrorStateDescription,
  ErrorStateIcon,
  ErrorStateTitle,
} from '../error-state/error-state'
import { FilterBar, FilterGroup } from '../filter-bar/filter-bar'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from '../input-group/input-group'
import { PasswordRequirementsIndicator } from '../password-input/password-requirements-indicator'
import { Skeleton } from '../skeleton/skeleton'

describe('presentation foundations', () => {
  it('keeps brand text accessible and its ornament decorative at both sizes', () => {
    const ref = createRef<HTMLSpanElement>()
    const { container, rerender } = render(
      <BrandMark name="Espacio de ejemplo" size="sm" ref={ref} />,
    )
    expect(ref.current?.textContent).toContain('Espacio de ejemplo')
    expect(container.querySelector('[aria-hidden="true"]')).toBeTruthy()
    expect(ref.current?.getAttribute('data-size')).toBe('sm')
    rerender(
      <>
        <BrandMark />
        <Eyebrow>Configuración</Eyebrow>
      </>,
    )
    expect(container.querySelector('[data-size="md"]')).toBeTruthy()
    expect(screen.getByText('Configuración').tagName).toBe('P')
  })

  it('keeps skeletons decorative and disables animation when reduced motion is requested', () => {
    const ref = createRef<HTMLDivElement>()
    render(<Skeleton ref={ref} className="h-8" />)
    expect(ref.current?.getAttribute('aria-hidden')).toBe('true')
    expect(ref.current?.className).toContain('motion-safe:animate-pulse')
    expect(ref.current?.className).toContain('h-8')
  })

  it.each([-10, 50, 200, Number.NaN])(
    'exposes finite, clamped password progress for %s',
    (progress) => {
      const { rerender } = render(
        <PasswordRequirementsIndicator
          isValid={false}
          progress={progress}
          label="Requisitos de contraseña"
        />,
      )
      const expected = Number.isFinite(progress) ? Math.max(0, Math.min(100, progress)) : 0
      expect(
        screen
          .getByRole('progressbar', { name: 'Requisitos de contraseña' })
          .getAttribute('aria-valuenow'),
      ).toBe(String(expected))
      rerender(
        <PasswordRequirementsIndicator isValid progress={100} label="Requisitos cumplidos" />,
      )
      expect(screen.getByRole('progressbar').getAttribute('aria-valuemax')).toBe('100')
    },
  )

  it('provides a recoverable error with decorative icon and explicit actions', () => {
    render(
      <ErrorState>
        <ErrorStateIcon />
        <ErrorStateTitle>Error de carga</ErrorStateTitle>
        <ErrorStateDescription>Inténtalo de nuevo.</ErrorStateDescription>
        <ErrorStateActions>
          <button type="button">Reintentar</button>
        </ErrorStateActions>
      </ErrorState>,
    )
    expect(screen.getByRole('alert').textContent).toContain('Inténtalo de nuevo.')
    expect(screen.getByRole('heading', { level: 2, name: 'Error de carga' })).toBeTruthy()
  })

  it('names embedded documents and explains unsupported formats without leaking a URL', () => {
    const { container, rerender } = render(
      <DocPreview url="about:blank" mimeType="text/plain" name="Texto de ejemplo" />,
    )
    expect(screen.getByTitle('Texto de ejemplo').tagName).toBe('IFRAME')
    rerender(<DocPreview url="about:blank" mimeType="application/zip" name="Archivo" />)
    expect(screen.getByText('Preview no disponible para este tipo de archivo.')).toBeTruthy()
    expect(container.querySelector('svg')?.getAttribute('aria-hidden')).toBe('true')
  })

  it('groups filters with a consumer-owned accessible name', () => {
    render(
      <FilterBar aria-label="Filtros de registros">
        <FilterGroup>
          <button type="button">Estado</button>
        </FilterGroup>
      </FilterBar>,
    )
    expect(screen.getByRole('group', { name: 'Filtros de registros' })).toBeTruthy()
  })

  it('focuses input-group controls through non-interactive addons but respects cancellation', () => {
    const onClick = vi.fn()
    const { rerender } = render(
      <InputGroup>
        <InputGroupAddon onClick={onClick}>
          <InputGroupText>€</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput aria-label="Importe" />
        <InputGroupButton>Calcular</InputGroupButton>
      </InputGroup>,
    )
    fireEvent.click(screen.getByText('€'))
    expect(screen.getByRole('textbox', { name: 'Importe' })).toBe(document.activeElement)
    expect(onClick).toHaveBeenCalledOnce()
    rerender(
      <InputGroup>
        <InputGroupAddon onClick={(event) => event.preventDefault()}>Nota</InputGroupAddon>
        <InputGroupTextarea aria-label="Nota" />
      </InputGroup>,
    )
    fireEvent.click(screen.getByText('Nota'))
    expect(screen.getByRole('textbox', { name: 'Nota' })).not.toBe(document.activeElement)
  })
})
