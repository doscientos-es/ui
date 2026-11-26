import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState, type FormEvent } from 'react'
import { expect, userEvent, waitFor, within } from 'storybook/test'

import { Button } from '../button/button'
import { Card, CardContent } from '../card/card'
import { PageHeader, PageStack } from '../page-header/page-header'
import { SelectField } from '../select/select'
import { TextareaField, TextField } from '../text-field/text-field'

const priorities = [
  { id: 'normal', label: 'Normal' },
  { id: 'high', label: 'Alta' },
]
const meta = {
  title: 'Application/Recipes/Customer form',
  tags: ['test:ui'],
  parameters: {
    docs: { description: { component: 'Formulario de ejemplo con guardado en memoria, sin API.' } },
  },
} satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

function CustomerForm() {
  const [name, setName] = useState('')
  const [notes, setNotes] = useState('')
  const [priority, setPriority] = useState<string | number | null>('normal')
  const [nameError, setNameError] = useState<string>()
  const [saved, setSaved] = useState<{ name: string; notes: string; priority: string }>()

  function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const trimmedName = name.trim()
    if (!trimmedName) {
      setNameError('Introduce el nombre del cliente.')
      setSaved(undefined)
      return
    }
    setNameError(undefined)
    setSaved({
      name: trimmedName,
      notes: notes.trim(),
      priority: priorities.find((item) => item.id === priority)?.label ?? '',
    })
  }

  return (
    <PageStack>
      <PageHeader heading="Nuevo cliente" description="Añade los datos básicos del cliente." />
      <Card>
        <CardContent>
          <form className="grid gap-5" noValidate onSubmit={save}>
            <TextField
              label="Nombre"
              name="name"
              required
              description="Nombre de la persona o empresa."
              errorMessage={nameError}
              value={name}
              onChange={(value) => { setName(value); setSaved(undefined) }}
            />
            <SelectField
              label="Prioridad"
              description="Ayuda a organizar el seguimiento."
              name="priority"
              items={priorities}
              getItemKey={(item) => item.id}
              getItemLabel={(item) => item.label}
              value={priority}
              onChange={(value) => { setPriority(value); setSaved(undefined) }}
            />
            <TextareaField
              label="Observaciones"
              name="notes"
              description="Comparte información útil para el equipo."
              rows={3}
              value={notes}
              onChange={(value) => { setNotes(value); setSaved(undefined) }}
            />
            <div><Button type="submit">Guardar cliente</Button></div>
            {saved && (
              <output>
                Cliente guardado: {saved.name}. Prioridad: {saved.priority}.
                {saved.notes && ` Observaciones: ${saved.notes}.`}
              </output>
            )}
          </form>
        </CardContent>
      </Card>
    </PageStack>
  )
}

export const Formulario: Story = {
  render: () => <CustomerForm />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const page = within(canvasElement.ownerDocument.body)
    const name = canvas.getByRole('textbox', { name: /Nombre/ })
    await userEvent.click(canvas.getByRole('button', { name: 'Guardar cliente' }))
    await expect(canvas.getByRole('alert')).toHaveTextContent('Introduce el nombre del cliente.')
    await expect(name).toHaveAttribute('aria-invalid', 'true')
    await userEvent.type(name, 'Ana García')
    await userEvent.click(canvas.getByRole('button', { name: /Prioridad/ }))
    await userEvent.click(await page.findByRole('option', { name: 'Alta' }))
    await userEvent.type(canvas.getByRole('textbox', { name: 'Observaciones' }), 'Llamar mañana')
    await userEvent.click(canvas.getByRole('button', { name: 'Guardar cliente' }))
    await waitFor(() => expect(canvas.getByRole('status')).toHaveTextContent('Cliente guardado: Ana García. Prioridad: Alta. Observaciones: Llamar mañana.'))
    await expect(name).not.toHaveAttribute('aria-invalid')
  },
}