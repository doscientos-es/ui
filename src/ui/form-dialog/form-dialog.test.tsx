import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Input } from '../input/input'
import { FormDialog } from './form-dialog'

const defaults = { open: true, title: 'Editar registro', onOpenChange: vi.fn(), onSubmit: vi.fn() }

describe('FormDialog', () => {
  it('links its title and description and reuses the compact dialog defaults', () => {
    render(
      <FormDialog {...defaults} description="Actualiza los datos.">
        <Input aria-label="Nombre" />
      </FormDialog>,
    )
    const dialog = screen.getByRole('dialog', { name: 'Editar registro' })
    expect(dialog.getAttribute('aria-describedby')).toBe(
      screen.getByText('Actualiza los datos.').id,
    )
    expect(dialog.getAttribute('data-size')).toBe('md')
    expect(dialog.className).toContain('max-w-[32rem]')
  })

  it('submits with Enter, passes native form data, and leaves closing to the app', async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()
    const onSubmit = vi.fn((event) => {
      expect(event.defaultPrevented).toBe(true)
      expect(new FormData(event.currentTarget).get('name')).toBe('Ejemplo')
    })
    render(
      <FormDialog {...defaults} onSubmit={onSubmit} onOpenChange={onOpenChange}>
        <Input name="name" aria-label="Nombre" defaultValue="Ejemplo" />
      </FormDialog>,
    )
    await user.click(screen.getByRole('textbox', { name: 'Nombre' }))
    await user.keyboard('{Enter}')
    expect(onSubmit).toHaveBeenCalledOnce()
    expect(onOpenChange).not.toHaveBeenCalled()
    expect(screen.getByRole('dialog')).toBeTruthy()
  })

  it('preserves native required-field validation', async () => {
    const onSubmit = vi.fn()
    render(
      <FormDialog {...defaults} onSubmit={onSubmit}>
        <Input name="name" aria-label="Nombre" required />
      </FormDialog>,
    )
    await userEvent.click(screen.getByRole('button', { name: 'Guardar' }))
    expect(onSubmit).not.toHaveBeenCalled()
    expect((screen.getByRole('textbox') as HTMLInputElement).checkValidity()).toBe(false)
  })

  it('blocks outside dismissal by default but supports Cancel and Escape', async () => {
    const onOpenChange = vi.fn()
    render(
      <FormDialog {...defaults} onOpenChange={onOpenChange}>
        <Input aria-label="Nombre" />
      </FormDialog>,
    )
    const dialog = screen.getByRole('dialog')
    await userEvent.click(dialog.parentElement!)
    expect(onOpenChange).not.toHaveBeenCalled()
    await userEvent.click(screen.getByRole('button', { name: 'Cancelar' }))
    expect(onOpenChange).toHaveBeenCalledWith(false)
    onOpenChange.mockClear()
    fireEvent.keyDown(dialog, { key: 'Escape' })
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })

  it('can opt into outside dismissal', async () => {
    const onOpenChange = vi.fn()
    render(
      <FormDialog {...defaults} isDismissable onOpenChange={onOpenChange}>
        Campos
      </FormDialog>,
    )
    await userEvent.click(screen.getByRole('dialog').parentElement!)
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })

  it('keeps pending operations open and prevents repeat submissions', async () => {
    const onOpenChange = vi.fn()
    const onSubmit = vi.fn()
    render(
      <FormDialog
        {...defaults}
        loading
        isDismissable
        onOpenChange={onOpenChange}
        onSubmit={onSubmit}
        loadingLabel="Creando…"
      >
        Campos
      </FormDialog>,
    )
    const dialog = screen.getByRole('dialog')
    const form = dialog.querySelector('form')!
    expect(form.getAttribute('aria-busy')).toBe('true')
    expect(screen.getByRole('button', { name: 'Creando…' }).hasAttribute('disabled')).toBe(true)
    expect(screen.getByRole('button', { name: 'Cancelar' }).hasAttribute('disabled')).toBe(true)
    expect(screen.queryByRole('button', { name: 'Cerrar diálogo' })).toBeNull()
    fireEvent.submit(form)
    fireEvent.keyDown(dialog, { key: 'Escape' })
    await userEvent.click(dialog.parentElement!)
    expect(onSubmit).not.toHaveBeenCalled()
    expect(onOpenChange).not.toHaveBeenCalled()
  })

  it('disables only submission when submitDisabled is set', async () => {
    const onSubmit = vi.fn()
    const onOpenChange = vi.fn()
    render(
      <FormDialog {...defaults} submitDisabled onSubmit={onSubmit} onOpenChange={onOpenChange}>
        Campos
      </FormDialog>,
    )
    fireEvent.submit(screen.getByRole('dialog').querySelector('form')!)
    expect(onSubmit).not.toHaveBeenCalled()
    await userEvent.click(screen.getByRole('button', { name: 'Cancelar' }))
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })

  it('re-enables dismissal and submission when loading finishes', async () => {
    const onSubmit = vi.fn()
    const onOpenChange = vi.fn()
    const { rerender } = render(
      <FormDialog {...defaults} loading onSubmit={onSubmit} onOpenChange={onOpenChange}>
        Campos
      </FormDialog>,
    )
    rerender(
      <FormDialog {...defaults} onSubmit={onSubmit} onOpenChange={onOpenChange}>
        Campos
      </FormDialog>,
    )
    expect(screen.getByRole('dialog').querySelector('form')?.hasAttribute('aria-busy')).toBe(false)
    await userEvent.click(screen.getByRole('button', { name: 'Guardar' }))
    expect(onSubmit).toHaveBeenCalledOnce()
    await userEvent.click(screen.getByRole('button', { name: 'Cerrar diálogo' }))
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })

  it('forwards form attributes and refs without forcing a two-column layout', async () => {
    const formRef = vi.fn()
    render(
      <FormDialog
        {...defaults}
        size="lg"
        bodyClassName="sm:grid-cols-2"
        formProps={{ id: 'edit-form', ref: formRef, noValidate: true, className: 'custom-form' }}
      >
        Campos
      </FormDialog>,
    )
    const form = document.getElementById('edit-form')!
    expect(form.hasAttribute('novalidate')).toBe(true)
    expect(form.classList.contains('custom-form')).toBe(true)
    expect(document.querySelector('[data-slot="form-dialog-body"]')?.className).toContain(
      'sm:grid-cols-2',
    )
    await waitFor(() => expect(formRef).toHaveBeenCalledWith(form))
  })

  it('renders nothing while closed', () => {
    render(
      <FormDialog {...defaults} open={false}>
        Campos
      </FormDialog>,
    )
    expect(screen.queryByRole('dialog')).toBeNull()
  })
})
