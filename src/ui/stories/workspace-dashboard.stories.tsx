import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Activity,
  Bell,
  CircleHelp,
  FileText,
  House,
  Megaphone,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  Users,
  WalletCards,
} from 'lucide-react'

import { cn } from '../../lib/cn'
import { Avatar, AvatarFallback } from '../avatar/avatar'
import { Badge } from '../badge/badge'
import { BrandMark } from '../brand/brand'
import { Breadcrumb, BreadcrumbLink, BreadcrumbPage, Breadcrumbs } from '../breadcrumb/breadcrumb'
import { Button } from '../button/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardToolbar,
} from '../card/card'
import { Input } from '../input/input'
import { MetricCard } from '../metric-card/metric-card'
import { MetricGrid } from '../metric-grid/metric-grid'
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderDescription,
  PageHeaderHeading,
  PageHeaderTitle,
  PageStack,
} from '../page-header/page-header'
import { Separator } from '../separator/separator'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from '../sidebar/sidebar'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableNumber,
  TableRow,
} from '../table/table'

const meta = {
  title: 'Application/Recipes/Workspace dashboard',
  parameters: { layout: 'fullscreen' },
  tags: ['test:ui'],
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const bars = [34, 52, 46, 72, 58, 84, 68, 91, 76, 100, 82, 94]

function MetricBars({ tone = 'info' }: { tone?: 'info' | 'success' | 'warning' }) {
  const color = tone === 'success' ? 'bg-success' : tone === 'warning' ? 'bg-warning' : 'bg-info'
  return (
    <span aria-hidden="true" className="flex h-9 items-end gap-1">
      {bars.slice(4).map((height, index) => (
        <span
          key={`${height}-${index}`}
          className={cn('w-1 rounded-full', color, index < 3 ? 'opacity-40' : 'opacity-90')}
          style={{ height: `${Math.max(18, height * 0.34)}px` }}
        />
      ))}
    </span>
  )
}

function RevenueChart() {
  return (
    <svg
      viewBox="0 0 720 220"
      role="img"
      aria-label="Ingresos crecientes entre enero y junio"
      className="h-auto w-full overflow-visible"
    >
      {[40, 85, 130, 175].map((y) => (
        <line key={y} x1="42" x2="704" y1={y} y2={y} className="stroke-border" />
      ))}
      <path
        d="M44 168 C92 162 92 126 142 132 S218 92 268 112 S344 62 394 88 S470 42 522 68 S606 30 704 42"
        fill="none"
        className="stroke-info"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M44 168 C92 162 92 126 142 132 S218 92 268 112 S344 62 394 88 S470 42 522 68 S606 30 704 42 L704 196 L44 196 Z"
        className="fill-info/8"
      />
      {['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'].map((month, index) => (
        <text
          key={month}
          x={54 + index * 126}
          y="218"
          className="fill-muted-foreground text-[12px]"
        >
          {month}
        </text>
      ))}
    </svg>
  )
}

export const Default: Story = {
  render: () => (
    <SidebarProvider>
      <Sidebar variant="inset">
        <SidebarHeader className="gap-3 p-3">
          <BrandMark name="Estudio Doscientos" size="sm" />
          <SidebarInput aria-label="Buscar" placeholder="Buscar" />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Principal</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton href="#overview" isActive tooltip="Resumen">
                    <House aria-hidden="true" />
                    Resumen
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton href="#customers" tooltip="Clientes">
                    <Users aria-hidden="true" />
                    Clientes
                  </SidebarMenuButton>
                  <SidebarMenuBadge>248</SidebarMenuBadge>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton href="#campaigns" tooltip="Campañas">
                    <Megaphone aria-hidden="true" />
                    Campañas
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton href="#billing" tooltip="Facturación">
                    <WalletCards aria-hidden="true" />
                    Facturación
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Análisis</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton href="#performance" tooltip="Rendimiento">
                    <Activity aria-hidden="true" />
                    Rendimiento
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton href="#reports" tooltip="Informes">
                    <FileText aria-hidden="true" />
                    Informes
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton href="#help">
                <CircleHelp aria-hidden="true" />
                Ayuda
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton href="#settings">
                <Settings aria-hidden="true" />
                Configuración
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg">
                <Avatar className="size-8">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                    GM
                  </AvatarFallback>
                </Avatar>
                <span className="grid flex-1 text-left leading-tight">
                  <span className="truncate font-medium">Guillem Martínez</span>
                  <span className="text-muted-foreground truncate text-xs">Administrador</span>
                </span>
                <MoreHorizontal aria-hidden="true" className="text-muted-foreground ml-auto" />
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>

      <SidebarInset>
        <header className="border-border flex h-14 shrink-0 items-center gap-3 border-b px-4">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-4" />
          <Breadcrumbs>
            <Breadcrumb>
              <BreadcrumbLink href="#workspace">Workspace</BreadcrumbLink>
            </Breadcrumb>
            <Breadcrumb>
              <BreadcrumbPage>Resumen</BreadcrumbPage>
            </Breadcrumb>
          </Breadcrumbs>
          <div className="ml-auto flex items-center gap-1">
            <Button variant="ghost" size="icon-sm" aria-label="Buscar">
              <Search />
            </Button>
            <Button variant="ghost" size="icon-sm" aria-label="Notificaciones">
              <Bell />
            </Button>
          </div>
        </header>

        <div className="min-h-0 min-w-0 flex-1 overflow-y-auto p-4 sm:p-6">
          <PageStack>
            <PageHeader>
              <PageHeaderHeading>
                <PageHeaderTitle>Buenos días, Guillem</PageHeaderTitle>
                <PageHeaderDescription>
                  Este es el pulso del negocio durante los últimos 30 días.
                </PageHeaderDescription>
              </PageHeaderHeading>
              <PageHeaderActions>
                <Button variant="outline">Exportar</Button>
                <Button>
                  <Plus data-icon="inline-start" />
                  Nuevo informe
                </Button>
              </PageHeaderActions>
            </PageHeader>

            <MetricGrid columns={3}>
              <MetricCard
                label="Ingresos netos"
                value="48.290 €"
                icon={<WalletCards aria-hidden="true" />}
                tone="info"
                trend="up"
                delta="18,4%"
                description="frente al periodo anterior"
                visual={<MetricBars />}
                variant="flat"
              />
              <MetricCard
                label="Clientes activos"
                value="248"
                icon={<Users aria-hidden="true" />}
                tone="success"
                trend="up"
                delta="12 nuevos"
                description="este mes"
                visual={<MetricBars tone="success" />}
                variant="flat"
              />
              <MetricCard
                label="Facturas pendientes"
                value="12.840 €"
                icon={<FileText aria-hidden="true" />}
                tone="warning"
                trend="neutral"
                delta="8 facturas"
                description="requieren seguimiento"
                visual={<MetricBars tone="warning" />}
                variant="flat"
              />
            </MetricGrid>

            <div className="grid min-w-0 gap-(--ui-content-gap,1.5rem) xl:grid-cols-[minmax(0,1.55fr)_minmax(22rem,1fr)]">
              <Card size="lg" variant="flat">
                <CardHeader>
                  <CardTitle>Evolución de ingresos</CardTitle>
                  <CardDescription>
                    Comparativa acumulada de los últimos seis meses.
                  </CardDescription>
                  <CardAction>
                    <Button variant="ghost" size="icon-sm" aria-label="Más opciones">
                      <MoreHorizontal />
                    </Button>
                  </CardAction>
                </CardHeader>
                <CardContent>
                  <RevenueChart />
                </CardContent>
              </Card>

              <Card size="lg" variant="flat" className="gap-0">
                <CardHeader className="pb-5">
                  <CardTitle>Actividad reciente</CardTitle>
                  <CardDescription>Movimientos que requieren contexto.</CardDescription>
                </CardHeader>
                <CardToolbar>
                  <div className="relative min-w-44 flex-1">
                    <Search
                      aria-hidden="true"
                      className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
                    />
                    <Input aria-label="Buscar actividad" placeholder="Buscar" className="pl-9" />
                  </div>
                  <Button variant="outline">Filtrar</Button>
                </CardToolbar>
                <CardContent className="px-0">
                  <Table density="compact">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Movimiento</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead className="text-right">Importe</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Cobro · Acme Studio</TableCell>
                        <TableCell>
                          <Badge variant="success">Verificado</Badge>
                        </TableCell>
                        <TableCell>
                          <TableNumber>4.200 €</TableNumber>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Factura · Northwind</TableCell>
                        <TableCell>
                          <Badge variant="warning">Revisar</Badge>
                        </TableCell>
                        <TableCell>
                          <TableNumber>1.840 €</TableNumber>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Suscripción · Contoso</TableCell>
                        <TableCell>
                          <Badge variant="info">Pendiente</Badge>
                        </TableCell>
                        <TableCell>
                          <TableNumber>920 €</TableNumber>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </PageStack>
        </div>
      </SidebarInset>
    </SidebarProvider>
  ),
}
