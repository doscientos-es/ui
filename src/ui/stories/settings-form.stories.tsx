import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState, type FormEvent } from 'react'
import { expect, userEvent, within } from 'storybook/test'

import { Button } from '../button/button'
import { Card, CardContent } from '../card/card'
import { FormRow } from '../form-row/form-row'
import { Input } from '../input/input'
import {
  PageHeader,
  PageStack,
  SectionHeader,
  SectionHeaderDescription,
  SectionHeaderHeading,
  SectionHeaderTitle,
} from '../page-header/page-header'

const meta = {
  title: 'Application/Recipes/Settings form',
  tags: ['test:ui'],
  parameters: {
    docs: {
      description: { component: 'Formulario con validación y guardado local de ejemplo, sin API.' },
    },
  },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

function SettingsForm() {
  const [name, setName] = useState('Estudio Doscientos')
  const [error, setError] = useState<string>()
  const [savedName, setSavedName] = useState<string>()

  function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) {
      setError('Introduce un nombre.')
      setSavedName(undefined)
      return
    }
    setName(trimmed)
    setError(undefined)
    setSavedName(trimmed)
  }

  return (
    <PageStack>
      <PageHeader heading="Ajustes" description="Configura los datos de tu espacio." />
      <Card>
        <CardContent>
          <form className="grid gap-5" noValidate onSubmit={save}>
            <SectionHeader>
              <SectionHeaderHeading>
                <SectionHeaderTitle>Datos generales</SectionHeaderTitle>
                <SectionHeaderDescription>
                  Información visible para el equipo.
                </SectionHeaderDescription>
              </SectionHeaderHeading>
            </SectionHeader>
            <FormRow
              label="Nombre del espacio"
              required
              hint="Se muestra a los miembros del equipo."
              error={error}
            >
              {(props) => (
                <Input
                  {...props}
                  name="name"
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value)
                    setSavedName(undefined)
                  }}
                />
              )}
            </FormRow>
            <div>
              <Button type="submit">Guardar cambios</Button>
            </div>
            {savedName && <p role="status">Cambios guardados: {savedName}.</p>}
          </form>
        </CardContent>
      </Card>
    </PageStack>
  )
}

export const Ajustes: Story = {
  render: () => <SettingsForm />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const input = canvas.getByRole('textbox', { name: /Nombre del espacio/ })
    await userEvent.clear(input)
    await userEvent.click(canvas.getByRole('button', { name: 'Guardar cambios' }))
    await expect(canvas.getByRole('alert')).toHaveTextContent('Introduce un nombre.')
    await expect(input).toHaveAttribute('aria-invalid', 'true')
    await userEvent.type(input, 'Nuevo espacio')
    await userEvent.click(canvas.getByRole('button', { name: 'Guardar cambios' }))
    await expect(canvas.getByRole('status')).toHaveTextContent('Cambios guardados: Nuevo espacio.')
    await expect(input).not.toHaveAttribute('aria-invalid')
  },
}
