import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Textarea } from './textarea'

describe('Textarea', () => {
  it('includes its padding and border within its declared width', () => {
    render(<Textarea aria-label="Notas" />)

    const textarea = screen.getByRole('textbox', { name: 'Notas' })
    expect(textarea.classList.contains('box-border')).toBe(true)
  })
})
