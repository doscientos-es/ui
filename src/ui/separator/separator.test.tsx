import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Separator } from './separator'

describe('Separator', () => {
  it('announces a vertical separator orientation', () => {
    render(<Separator orientation="vertical" />)
    expect(screen.getByRole('separator').getAttribute('aria-orientation')).toBe('vertical')
  })
})
