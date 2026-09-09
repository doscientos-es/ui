import type { Meta, StoryObj } from '@storybook/react-vite'
import { CalendarDays, House, MoreHorizontal, Settings, Users } from 'lucide-react'

import { Avatar, AvatarFallback } from '../avatar/avatar'
import { BrandMark } from '../brand/brand'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from './sidebar'

const meta = {
  title: 'Application/Sidebar',
  component: Sidebar,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Sidebar>
export default meta
type Story = StoryObj<typeof meta>

function SidebarNav() {
  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Operativa</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton href="#resumen" isActive tooltip="Resumen">
                <House aria-hidden="true" />
                Resumen
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="#reservas" tooltip="Reservas">
                <CalendarDays aria-hidden="true" />
                Reservas
              </SidebarMenuButton>
              <SidebarMenuBadge>24</SidebarMenuBadge>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="#clientes" tooltip="Clientes">
                <Users aria-hidden="true" />
                Clientes
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      <SidebarGroup>
        <SidebarGroupLabel>Sistema</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton href="#configuracion" tooltip="Configuración">
                <Settings aria-hidden="true" />
                Configuración
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  )
}

function SidebarProfile() {
  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg">
            <Avatar className="size-8">
              <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                AR
              </AvatarFallback>
            </Avatar>
            <span className="grid flex-1 text-left leading-tight">
              <span className="truncate font-medium">Alex Rivera</span>
              <span className="text-muted-foreground truncate text-xs">Encargado</span>
            </span>
            <MoreHorizontal aria-hidden="true" className="text-muted-foreground ml-auto" />
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  )
}

function InsetContent() {
  return (
    <SidebarInset>
      <header className="border-border flex h-14 shrink-0 items-center gap-3 border-b px-4">
        <SidebarTrigger />
        <h1 className="text-sm font-semibold">Resumen</h1>
      </header>
      <div className="text-muted-foreground flex flex-1 items-center justify-center p-6 text-sm">
        El contenido de la aplicación vive en SidebarInset.
      </div>
    </SidebarInset>
  )
}

export const Default: Story = {
  render: () => (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="flex-row items-center justify-between gap-2 px-3 py-3">
          <BrandMark name="SobreTaula" size="sm" />
          <SidebarTrigger />
        </SidebarHeader>
        <SidebarNav />
        <SidebarProfile />
        <SidebarRail />
      </Sidebar>
      <InsetContent />
    </SidebarProvider>
  ),
}

export const IconCollapsible: Story = {
  render: () => (
    <SidebarProvider defaultOpen={false}>
      <Sidebar collapsible="icon">
        <SidebarHeader className="items-center px-3 py-3">
          <BrandMark size="sm" />
        </SidebarHeader>
        <SidebarNav />
        <SidebarProfile />
        <SidebarRail />
      </Sidebar>
      <InsetContent />
    </SidebarProvider>
  ),
}
