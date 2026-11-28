import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { expect, userEvent, within } from 'storybook/test'

import { Button } from '../ui/button/button'
import { CardContent } from '../ui/card/card'
import { FieldGroup } from '../ui/field/field'
import { Input } from '../ui/input/input'
import { PasswordInput } from '../ui/password-input/password-input'
import {
  AuthCard,
  AuthDivider,
  AuthMessage,
  AuthPasswordRequirements,
  AuthProviderButton,
  AuthShell,
} from '../ui/auth/auth'

function GoogleMark() {
  return <span className="text-xs font-bold">G</span>
}

function LoginRecipe() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <AuthShell
      logo={<div className="text-lg font-semibold tracking-tight">doscientos</div>}
      title="Bienvenido"
      description="Accede a tu cuenta."
      footer={<>¿Necesitas ayuda? Contacta con tu administrador.</>}
    >
      <AuthCard>
        <CardContent className="flex flex-col gap-4 pt-5">
          <AuthProviderButton provider={<GoogleMark />}>Continuar con Google</AuthProviderButton>
          <AuthDivider />
          <form className="grid gap-4" onSubmit={(event) => event.preventDefault()}>
            <FieldGroup>
              <label className="grid gap-1.5 text-sm font-medium">
                Email
                <Input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
              </label>
              <label className="grid gap-1.5 text-sm font-medium">
                Contraseña
                <PasswordInput value={password} onChange={(event) => setPassword(event.target.value)} />
              </label>
            </FieldGroup>
            <AuthMessage tone="info">Puedes recuperar la contraseña desde el enlace de acceso.</AuthMessage>
            <Button type="submit" isDisabled={!email || !password}>Entrar</Button>
          </form>
        </CardContent>
      </AuthCard>
    </AuthShell>
  )
}

const meta = {
  title: 'Application/Auth',
  tags: ['test:ui'],
} satisfies Meta

export default meta

export const Login: StoryObj<typeof meta> = {
  render: () => <LoginRecipe />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await expect(canvas.getByRole('heading', { name: 'Bienvenido' })).toBeVisible()
    await userEvent.type(canvas.getByRole('textbox', { name: 'Email' }), 'pol@example.com')
    await userEvent.type(canvas.getByLabelText('Contraseña'), 'Secret123!')
    await expect(canvas.getByRole('button', { name: 'Entrar' })).toBeEnabled()
  },
}

export const PasswordPolicy: StoryObj<typeof meta> = {
  render: () => (
    <div className="max-w-sm">
      <AuthPasswordRequirements
        items={[
          { id: 'length', label: 'Al menos 8 caracteres', met: true },
          { id: 'number', label: 'Incluye un número', met: false },
        ]}
      />
    </div>
  ),
}
