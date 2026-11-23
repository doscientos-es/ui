import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { SignaturePad, signatureToSvg, type SignatureValue } from './signature-pad'

const initial: SignatureValue = {
  version: 1,
  strokes: [
    [
      { x: 30, y: 40 },
      { x: 60, y: 80 },
    ],
  ],
}

function surface() {
  const element = screen.getByRole('group', { name: 'Firma' })
  vi.spyOn(element, 'getBoundingClientRect').mockReturnValue({
    left: 10,
    top: 20,
    width: 300,
    height: 120,
    right: 310,
    bottom: 140,
    x: 10,
    y: 20,
    toJSON: () => ({}),
  })
  return element
}

describe('SignaturePad', () => {
  it('captures scaled pointer strokes, ignores other pointers and publishes a serializable value', () => {
    const onChange = vi.fn()
    render(<SignaturePad onChange={onChange} />)
    const pad = surface()
    fireEvent.pointerDown(pad, { pointerId: 1, pointerType: 'touch', clientX: 40, clientY: 40 })
    fireEvent.pointerMove(pad, { pointerId: 2, pointerType: 'touch', clientX: 200, clientY: 100 })
    fireEvent.pointerMove(pad, { pointerId: 1, pointerType: 'touch', clientX: 70, clientY: 60 })
    fireEvent.pointerUp(pad, { pointerId: 1, pointerType: 'touch', clientX: 100, clientY: 80 })
    expect(onChange).toHaveBeenLastCalledWith({
      version: 1,
      strokes: [
        [
          { x: 60, y: 40 },
          { x: 120, y: 80 },
          { x: 180, y: 120 },
        ],
      ],
    })
    expect(pad.querySelector('path')?.getAttribute('d')).toBe('M 60 40 L 120 80 L 180 120')
    expect(screen.getByText('Firma dibujada')).toBeTruthy()
  })

  it('keeps separate strokes, including dots, after cancellation', () => {
    const onChange = vi.fn()
    render(<SignaturePad onChange={onChange} />)
    const pad = surface()
    fireEvent.pointerDown(pad, { pointerId: 1, clientX: 40, clientY: 40 })
    fireEvent.pointerCancel(pad, { pointerId: 1 })
    fireEvent.pointerDown(pad, { pointerId: 2, clientX: 70, clientY: 60 })
    fireEvent.lostPointerCapture(pad, { pointerId: 2 })
    expect(onChange.mock.lastCall?.[0]).toEqual({
      version: 1,
      strokes: [[{ x: 60, y: 40 }], [{ x: 120, y: 80 }]],
    })
    expect(pad.querySelectorAll('path')).toHaveLength(2)
  })

  it('clears by keyboard and supports controlled resets', async () => {
    const onChange = vi.fn()
    const { rerender } = render(<SignaturePad value={initial} onChange={onChange} />)
    await userEvent.tab()
    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Borrar firma' }))
    await userEvent.keyboard('{Enter}')
    expect(onChange).toHaveBeenLastCalledWith(null)
    expect(screen.getByRole('button', { name: 'Borrar firma' }).hasAttribute('disabled')).toBe(
      false,
    )
    rerender(<SignaturePad value={null} onChange={onChange} />)
    expect(screen.getByRole('button', { name: 'Borrar firma' }).hasAttribute('disabled')).toBe(true)
    expect(screen.getByText('Firma aquí')).toBeTruthy()
  })

  it('does not draw or clear when disabled and ignores secondary mouse buttons', () => {
    const onChange = vi.fn()
    const { rerender } = render(
      <SignaturePad disabled defaultValue={initial} onChange={onChange} />,
    )
    let pad = surface()
    fireEvent.pointerDown(pad, { pointerId: 1, pointerType: 'touch', clientX: 40, clientY: 40 })
    fireEvent.pointerUp(pad, { pointerId: 1, clientX: 40, clientY: 40 })
    expect(onChange).not.toHaveBeenCalled()
    expect(screen.getByRole('button', { name: 'Borrar firma' }).hasAttribute('disabled')).toBe(true)
    rerender(<SignaturePad defaultValue={initial} onChange={onChange} />)
    pad = surface()
    fireEvent.pointerDown(pad, {
      pointerId: 2,
      pointerType: 'mouse',
      button: 2,
      clientX: 40,
      clientY: 40,
    })
    fireEvent.pointerUp(pad, { pointerId: 2, clientX: 40, clientY: 40 })
    expect(onChange).not.toHaveBeenCalled()
  })

  it('exports a standalone transparent SVG with the same geometry and safe numeric coordinates', () => {
    const svg = signatureToSvg({ version: 1, strokes: [...initial.strokes, [{ x: NaN, y: 999 }]] })
    expect(svg).toContain('xmlns="http://www.w3.org/2000/svg"')
    expect(svg).toContain('d="M 30 40 L 60 80"')
    expect(svg).toContain('d="M 0 240 h 0.01"')
    expect(svg).toContain('fill="none"')
  })
})
