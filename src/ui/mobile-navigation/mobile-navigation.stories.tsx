import type { Meta, StoryObj } from '@storybook/react-vite'
import { Bell, CalendarDays, House, Search, UserRound } from 'lucide-react'

import { MobileNavigation, MobileNavigationItem } from './mobile-navigation'

const meta = {
  title: 'Components/Navigation/Mobile Navigation',
  component: MobileNavigation,
  parameters: { layout: 'fullscreen', viewport: { defaultViewport: 'mobile1' } },
} satisfies Meta<typeof MobileNavigation>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="bg-muted/40 flex min-h-128 flex-col">
      <main className="flex-1 p-6">
        <p className="text-muted-foreground text-sm">Contenido de la aplicación</p>
      </main>
      <MobileNavigation sticky={false} aria-label="Secciones principales">
        <MobileNavigationItem href="#home" icon={<House />} label="Inicio" active />
        <MobileNavigationItem href="#search" icon={<Search />} label="Buscar" />
        <MobileNavigationItem href="#calendar" icon={<CalendarDays />} label="Agenda" />
        <MobileNavigationItem href="#alerts" icon={<Bell />} label="Avisos" />
        <MobileNavigationItem href="#profile" icon={<UserRound />} label="Perfil" />
      </MobileNavigation>
    </div>
  ),
}
