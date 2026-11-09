import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { expect, userEvent, within } from 'storybook/test'

import { Button } from '../button/button'
import {
  ErrorState,
  ErrorStateActions,
  ErrorStateDescription,
  ErrorStateIcon,
  ErrorStateTitle,
} from '../error-state/error-state'
import { AsyncBoundary, ErrorBoundary } from './error-boundary'

const meta = {
  title: 'Components/Feedback/Error Boundary',
  component: ErrorBoundary,
  args: { children: <p>Contenido disponible.</p> },
} satisfies Meta<typeof ErrorBoundary>
export default meta
type Story = StoryObj<typeof meta>

function ExampleContent({ fail }: { fail: boolean }) {
  if (fail) throw new Error('Synthetic component failure')
  return <p>Contenido disponible.</p>
}
export const Default: Story = {}
export const Recoverable: Story = {
  render: function Render() {
    const [fail, setFail] = useState(false)
    return (
      <div className="space-y-4">
        <Button variant="outline" onPress={() => setFail(true)}>
          Simular error
        </Button>
        <ErrorBoundary
          fallback={({ reset }) => (
            <ErrorState>
              <ErrorStateIcon />
              <ErrorStateTitle>No se pudo cargar este contenido</ErrorStateTitle>
              <ErrorStateDescription>
                Reintenta sin perder el resto de la página.
              </ErrorStateDescription>
              <ErrorStateActions>
                <Button
                  onPress={() => {
                    setFail(false)
                    reset()
                  }}
                >
                  Reintentar
                </Button>
              </ErrorStateActions>
            </ErrorState>
          )}
        >
          <ExampleContent fail={fail} />
        </ErrorBoundary>
      </div>
    )
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole('button', { name: 'Simular error' }))
    await expect(canvas.getByRole('alert')).toHaveTextContent('Reintenta')
    await userEvent.click(canvas.getByRole('button', { name: 'Reintentar' }))
    await expect(canvas.queryByRole('alert')).not.toBeInTheDocument()
    await expect(canvas.getByText('Contenido disponible.')).toBeVisible()
  },
}
export const AsyncContent: Story = {
  render: () => (
    <AsyncBoundary pending={<p>Cargando contenido…</p>}>
      <p>Contenido disponible.</p>
    </AsyncBoundary>
  ),
}
