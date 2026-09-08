import { render, screen } from '@testing-library/react'
import { createRef } from 'react'
import { describe, expect, it } from 'vitest'

import { Spinner } from './spinner'

describe('Spinner', () => {
  it('announces its loading state and exposes the React 19 ref on its container', () => {
    const ref = createRef<HTMLSpanElement>()
    render(<Spinner ref={ref} label="Cargando clientes" size="lg" speed="fast" />)

    const spinner = screen.getByRole('status', { name: 'Cargando clientes' })
    expect(ref.current).toBe(spinner)
    expect(spinner.getAttribute('data-size')).toBe('lg')
    expect(spinner.querySelector('svg')?.getAttribute('class')).toContain(
      'motion-safe:animate-[spin_0.5s_linear_infinite]',
    )
    expect(spinner.querySelector('svg')?.getAttribute('aria-hidden')).toBe('true')
  })
})
