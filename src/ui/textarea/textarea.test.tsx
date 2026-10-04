import { render, screen } from '@testing-library/react'
import { createRef } from 'react'
import { describe, expect, it } from 'vitest'

import { Textarea } from './textarea'

describe('Textarea', () => {
  it('passes its React 19 ref to the native textarea', () => {
    const ref = createRef<HTMLTextAreaElement>()
    render(<Textarea ref={ref} aria-label="Notas" />)

    expect(ref.current).toBe(screen.getByRole('textbox', { name: 'Notas' }))
  })

  it('includes its padding and border within its declared width', () => {
    render(<Textarea aria-label="Notas" />)

    const textarea = screen.getByRole('textbox', { name: 'Notas' })
    expect(textarea.classList.contains('box-border')).toBe(true)
  })
})
