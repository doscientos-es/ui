import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { expect, fn, userEvent, waitFor, within } from 'storybook/test'

import { useFormDirty } from '../../hooks/use-form-dirty'
import { Button } from '../button/button'
import { Input } from '../input/input'
import { FormDialog } from './form-dialog'

const meta = {
  title: 'Components/Forms/FormDialog',
  component: FormDialog,
  tags: ['test:ui'],
  args: {
    open: true,
    onOpenChange: fn(),
    title: 'Editar registro',
    onSubmit: fn(),
    children: null,
  },
} satisfies Meta<typeof FormDialog>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: function Example(args) {
    const [open, setOpen] = useState(false)
    const [saved, setSaved] = useState(false)
    return (
      <>
        <Button variant="outline" onPress={() => setOpen(true)}>
          Editar registro
        </Button>
        {saved && <output>Registro actualizado.</output>}
        <FormDialog
          {...args}
          open={open}
          onOpenChange={setOpen}
          description="Actualiza el nombre y guarda los cambios."
          onSubmit={(event) => {
            args.onSubmit(event)
            setSaved(true)
            setOpen(false)
          }}
        >
          <label htmlFor="record-name" className="grid gap-2 text-sm">
            Nombre
            <Input id="record-name" name="name" defaultValue="Registro de ejemplo" required />
          </label>
        </FormDialog>
      </>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const page = within(canvasElement.ownerDocument.body)
    const trigger = canvas.getByRole('button', { name: 'Editar registro' })
    trigger.focus()
    await userEvent.keyboard('{Enter}')
    const input = await page.findByRole('textbox', { name: 'Nombre' })
    await userEvent.click(input)
    await userEvent.clear(input)
    await userEvent.type(input, 'Nombre actualizado{Enter}')
    await waitFor(() => expect(page.queryByRole('dialog')).not.toBeInTheDocument())
    await expect(canvas.getByRole('status')).toHaveTextContent('Registro actualizado.')
    await waitFor(() => expect(trigger).toHaveFocus())
  },
}

export const Loading: Story = {
  args: { isPending: true, pendingLabel: 'Creando registro…' },
  render: (args) => (
    <FormDialog {...args}>
      <label htmlFor="pending-name" className="grid gap-2 text-sm">
        Nombre
        <Input id="pending-name" defaultValue="Registro de ejemplo" />
      </label>
    </FormDialog>
  ),
}

export const Error: Story = {
  render: (args) => (
    <FormDialog {...args}>
      <label htmlFor="error-name" className="grid gap-2 text-sm">
        Nombre
        <Input id="error-name" defaultValue="Registro de ejemplo" />
      </label>
      <p role="alert" className="text-destructive text-sm">
        No se pudo guardar. Tus cambios siguen aquí; inténtalo de nuevo.
      </p>
    </FormDialog>
  ),
}

export const SubmitDisabled: Story = {
  args: { isSubmitDisabled: true },
  render: (args) => (
    <FormDialog {...args} description="Completa los datos obligatorios.">
      <label htmlFor="disabled-name" className="grid gap-2 text-sm">
        Nombre
        <Input id="disabled-name" required />
      </label>
    </FormDialog>
  ),
}

export const UnsavedChanges: Story = {
  render: function Example(args) {
    const [open, setOpen] = useState(false)
    const { formRef, isDirty } = useFormDirty()
    return (
      <>
        <Button onPress={() => setOpen(true)}>Editar nombre</Button>
        <FormDialog
          {...args}
          open={open}
          onOpenChange={setOpen}
          isDirty={isDirty}
          formProps={{ ref: formRef }}
        >
          <label htmlFor="dirty-name" className="grid gap-2 text-sm">
            Nombre
            <Input id="dirty-name" name="name" defaultValue="Ana" />
          </label>
        </FormDialog>
      </>
    )
  },
  play: async ({ canvasElement }) => {
    const page = within(canvasElement.ownerDocument.body)
    await userEvent.click(within(canvasElement).getByRole('button', { name: 'Editar nombre' }))
    const input = await page.findByRole('textbox', { name: 'Nombre' })
    await userEvent.type(input, ' García')
    const cancel = page.getByRole('button', { name: 'Cancelar' })
    await userEvent.click(cancel)
    await waitFor(() =>
      expect(page.getByRole('alertdialog', { name: '¿Descartar los cambios?' })).toBeVisible(),
    )
    await userEvent.click(page.getByRole('button', { name: 'Seguir editando' }))
    await waitFor(() => expect(page.queryByRole('alertdialog')).not.toBeInTheDocument())
    await expect(input).toHaveValue('Ana García')
    await waitFor(() => expect(cancel).toHaveFocus())
    await userEvent.keyboard('{Escape}')
    await userEvent.click(await page.findByRole('button', { name: 'Descartar cambios' }))
    await waitFor(() => expect(page.queryByRole('dialog')).not.toBeInTheDocument())
  },
}

export const LongContent: Story = {
  args: {
    title: 'Formulario con varios campos y un título largo',
    size: 'lg',
    bodyClassName: 'sm:grid-cols-2',
  },
  render: (args) => (
    <FormDialog {...args}>
      {Array.from({ length: 30 }, (_, index) => (
        <label key={index} htmlFor={`field-${index}`} className="grid gap-2 text-sm">
          Campo {index + 1}
          <Input id={`field-${index}`} name={`field-${index}`} placeholder="Dato de ejemplo" />
        </label>
      ))}
    </FormDialog>
  ),
  play: async ({ canvasElement }) => {
    const page = within(canvasElement.ownerDocument.body)
    const dialog = await page.findByRole('dialog')
    const body = dialog.querySelector<HTMLElement>('[data-slot="form-dialog-body"]')
    const title = page.getByText('Formulario con varios campos y un título largo')
    const close = page.getByRole('button', { name: 'Cerrar diálogo' })
    const save = page.getByRole('button', { name: 'Guardar' })
    if (!body) throw new globalThis.Error('Expected a scrollable form body.')
    await waitFor(() => expect(save).toBeVisible())
    await waitFor(() => expect(body.scrollHeight).toBeGreaterThan(body.clientHeight))
    const titleBounds = title.getBoundingClientRect()
    const closeBounds = close.getBoundingClientRect()
    const titlePadding = Number.parseFloat(getComputedStyle(title).paddingRight)
    await expect(titleBounds.right - titlePadding).toBeLessThanOrEqual(closeBounds.left)
    body.scrollTop = body.scrollHeight
    await expect(save).toBeVisible()
    await expect(title).toBeVisible()
    await expect(save.getBoundingClientRect().bottom).toBeLessThanOrEqual(
      canvasElement.ownerDocument.documentElement.clientHeight,
    )
  },
}
