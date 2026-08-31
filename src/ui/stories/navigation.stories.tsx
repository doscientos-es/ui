import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../button/button'
import { Kbd, KbdGroup } from '../kbd/kbd'
import { Popover, PopoverTrigger } from '../popover/popover'
import { Separator } from '../separator/separator'
import { Tabs, TabsContent, TabsList, TabsPanels, TabsTrigger } from '../tabs/tabs'
import { Tooltip, TooltipTrigger } from '../tooltip/tooltip'

const meta = { title: 'Patterns/Navigation' } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const TabsPattern: Story = {
  render: () => (
    <Tabs defaultSelectedKey="summary" className="w-96">
      <TabsList aria-label="Vista de proyecto">
        <TabsTrigger id="summary">Resumen</TabsTrigger>
        <TabsTrigger id="activity">Actividad</TabsTrigger>
      </TabsList>
      <TabsPanels>
        <TabsContent id="summary">El proyecto está activo y actualizado hoy.</TabsContent>
        <TabsContent id="activity">No hay cambios pendientes.</TabsContent>
      </TabsPanels>
    </Tabs>
  ),
}

export const Overlays: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <TooltipTrigger delay={0}>
        <Button variant="outline">Información</Button>
        <Tooltip>Se muestra al enfocar o pasar el cursor.</Tooltip>
      </TooltipTrigger>
      <PopoverTrigger>
        <Button>Opciones</Button>
        <Popover>
          <div className="p-2 text-sm">Contenido contextual accesible.</div>
        </Popover>
      </PopoverTrigger>
    </div>
  ),
}

export const DividerAndShortcut: Story = {
  render: () => (
    <div className="w-72 space-y-3">
      <p className="text-sm">Guarda los cambios</p>
      <Separator />
      <p className="flex items-center justify-between text-sm">
        Abrir búsqueda{' '}
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </p>
    </div>
  ),
}
