import { act, fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { useFormDirty } from './use-form-dirty'

function TestForm() {
  const { formRef, isDirty, reset } = useFormDirty()
  return (
    <>
      <form ref={formRef} aria-label="Perfil">
        <input aria-label="Nombre" name="name" defaultValue="Ana" />
      </form>
      <output>{String(isDirty)}</output>
      <button type="button" onClick={reset}>
        Reset
      </button>
    </>
  )
}

describe('useFormDirty', () => {
  it('detects native form changes and can reset its baseline', () => {
    render(<TestForm />)
    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'Berta' } })
    expect(screen.getByText('true')).not.toBeNull()
    fireEvent.click(screen.getByRole('button', { name: 'Reset' }))
    expect(screen.getByText('false')).not.toBeNull()
  })

  it('clears dirty state after a native form reset', async () => {
    render(<TestForm />)
    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'Berta' } })
    expect(screen.getByText('true')).not.toBeNull()

    await act(async () => {
      ;(screen.getByRole('form', { name: 'Perfil' }) as HTMLFormElement).reset()
      await Promise.resolve()
    })

    expect(screen.getByText('false')).not.toBeNull()
  })
})
