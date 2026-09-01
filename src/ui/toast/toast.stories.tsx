import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../button/button'
import { Toaster } from './toast'
import { toast } from './toast-store'
const meta = { title: 'Application/Toast', component: Toaster } satisfies Meta<typeof Toaster>
export default meta
type Story = StoryObj<typeof meta>
function Demo() {
  return (
    <div className="flex gap-2">
      <Button
        onPress={() =>
          toast.success('Cambios guardados', { description: 'El cliente se ha actualizado.' })
        }
      >
        Éxito
      </Button>
      <Button
        variant="outline"
        onPress={() =>
          toast.error('No se ha podido guardar', {
            description: 'Revisa los campos e inténtalo de nuevo.',
          })
        }
      >
        Error
      </Button>
      <Toaster />
    </div>
  )
}
export const Default: Story = { render: () => <Demo /> }
export const Action: Story = {
  render: () => (
    <>
      <Button
        onPress={() =>
          toast.success('Contrato archivado', {
            action: { label: 'Deshacer', onPress: () => toast.info('Acción deshecha') },
          })
        }
      >
        Mostrar acción
      </Button>
      <Toaster />
    </>
  ),
}
export const PromiseToast: Story = {
  render: () => (
    <>
      <Button
        onPress={() => {
          void toast.promise(new Promise((resolve) => window.setTimeout(resolve, 1200)), {
            loading: 'Guardando…',
            success: 'Guardado correctamente',
            error: 'No se ha podido guardar',
          })
        }}
      >
        Guardar
      </Button>
      <Toaster />
    </>
  ),
}
