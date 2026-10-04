import { render, screen } from '@testing-library/react'
import { createRef } from 'react'
import { describe, expect, it } from 'vitest'

import { Label } from './label'

describe('Label', () => {
  it('passes its React 19 ref to the native label', () => {
    const ref = createRef<HTMLLabelElement>()
    render(<Label ref={ref}>Nombre</Label>)

    expect(ref.current).toBe(screen.getByText('Nombre'))
  })
})