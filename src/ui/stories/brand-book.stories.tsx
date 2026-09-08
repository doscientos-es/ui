import type { Meta, StoryObj } from '@storybook/react-vite'
import { CalendarDays, Check, CircleAlert, Euro, LayoutDashboard, Users } from 'lucide-react'

import {
  AppShell,
  AppShellMain,
  AppShellSidebar,
  Badge,
  BrandMark,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Eyebrow,
  MetricCard,
  PageHeader,
  PageHeaderDescription,
  PageHeaderTitle,
} from '../../index'

const meta = {
  title: 'Introducción/Brand Book',
  parameters: { layout: 'fullscreen', chromatic: { disableSnapshot: true } },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

function Swatch({ name, value, className }: { name: string; value: string; className: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className={`size-10 rounded-xl border border-black/5 ${className}`} />
      <div>
        <p className="text-sm font-medium">{name}</p>
        <p className="text-muted-foreground text-xs">{value}</p>
      </div>
    </div>
  )
}

export const Overview: Story = {
  render: () => (
    <main className="bg-background text-foreground min-h-screen p-6 sm:p-12">
      <div className="mx-auto max-w-4xl">
        <BrandMark name="doscientos/ui" />
        <PageHeader className="mt-12">
          <div>
            <Eyebrow>Brand book temporal</Eyebrow>
            <PageHeaderTitle>Quiet confidence.</PageHeaderTitle>
            <PageHeaderDescription>
              Un sistema para construir software operativo premium: calmado, preciso, humano y útil.
            </PageHeaderDescription>
          </div>
        </PageHeader>
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {['Quitar ruido', 'Ordenar la información', 'Hacer obvio el siguiente paso'].map(
            (item, index) => (
              <Card key={item}>
                <CardContent className="p-5">
                  <span className="text-muted-foreground text-sm">0{index + 1}</span>
                  <p className="mt-8 font-medium">{item}</p>
                </CardContent>
              </Card>
            ),
          )}
        </div>
        <p className="text-muted-foreground mt-10 max-w-2xl text-sm leading-6">
          No buscamos decoración. El feeling premium aparece cuando la jerarquía, el espacio, el
          contraste y el feedback están tan bien resueltos que la interfaz parece inevitable.
        </p>
      </div>
    </main>
  ),
}

export const Foundations: Story = {
  render: () => (
    <main className="bg-background text-foreground min-h-screen p-6 sm:p-12">
      <div className="mx-auto max-w-4xl space-y-10">
        <div>
          <Eyebrow>Foundations</Eyebrow>
          <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">
            Aire, contraste y calidez
          </h1>
          <p className="text-muted-foreground mt-2">
            Tres capas de superficie y una paleta semántica que evita el ruido visual.
          </p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Color funcional</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-5 p-5 sm:grid-cols-2">
            <Swatch name="Canvas" value="#f7f7f5 · background" className="bg-background" />
            <Swatch name="Surface" value="#ffffff · card" className="bg-card" />
            <Swatch name="Primary" value="acción y navegación" className="bg-primary" />
            <Swatch name="Muted" value="contexto y metadata" className="bg-muted" />
          </CardContent>
        </Card>
        <div className="grid gap-5 sm:grid-cols-3">
          <div>
            <p className="text-4xl font-semibold tracking-tighter">28.640 €</p>
            <p className="text-muted-foreground mt-2 text-sm">Métrica dominante</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Título de sección</h2>
            <p className="text-muted-foreground mt-2 text-sm">
              Descripción que aporta contexto sin competir.
            </p>
          </div>
          <div>
            <Eyebrow>Label de grupo</Eyebrow>
            <p className="mt-3 text-sm">Jerarquía editorial</p>
          </div>
        </div>
      </div>
    </main>
  ),
}

export const ApplicationPattern: Story = {
  render: () => (
    <div className="bg-background text-foreground h-180">
      <AppShell sidebarBreakpoint="sm">
        <AppShellSidebar className="p-5">
          <BrandMark name="SobreTaula" size="sm" />
          <Eyebrow className="mt-10 px-2">Operativa</Eyebrow>
          <nav className="mt-3 space-y-1">
            <a
              className="bg-secondary flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium"
              href="#overview"
            >
              <LayoutDashboard className="size-4" />
              Resumen
            </a>
            <a
              className="text-muted-foreground flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm"
              href="#reservas"
            >
              <CalendarDays className="size-4" />
              Reservas
            </a>
            <a
              className="text-muted-foreground flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm"
              href="#clientes"
            >
              <Users className="size-4" />
              Clientes
            </a>
          </nav>
        </AppShellSidebar>
        <AppShellMain>
          <div className="border-border/70 text-muted-foreground border-b px-6 py-4 text-sm">
            Workspace / Resumen
          </div>
          <div className="p-6 sm:p-8">
            <Eyebrow>Hoy · martes 9 de septiembre</Eyebrow>
            <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">Buenos días, Alex</h1>
            <p className="text-muted-foreground mt-2">
              Una vista rápida de lo que requiere tu atención.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <MetricCard
                label="Reservas"
                value="24"
                icon={<CalendarDays />}
                trend="up"
                delta="12%"
              />
              <MetricCard
                label="Facturación"
                value="1.284 €"
                icon={<Euro />}
                trend="up"
                delta="8,4%"
              />
              <MetricCard label="Comensales" value="86" icon={<Users />} trend="up" delta="4%" />
            </div>
          </div>
        </AppShellMain>
      </AppShell>
    </div>
  ),
}

export const States: Story = {
  render: () => (
    <div className="bg-background grid max-w-3xl gap-4 p-8 sm:grid-cols-2">
      <Card>
        <CardContent className="flex gap-3 p-5">
          <Check className="text-success mt-0.5 size-5" />
          <div>
            <p className="font-medium">Reserva confirmada</p>
            <p className="text-muted-foreground mt-1 text-sm">
              La mesa 14 está lista para las 20:30.
            </p>
          </div>
          <Badge className="ml-auto" variant="success">
            Listo
          </Badge>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex gap-3 p-5">
          <CircleAlert className="text-warning mt-0.5 size-5" />
          <div>
            <p className="font-medium">Falta información</p>
            <p className="text-muted-foreground mt-1 text-sm">Completa los datos para continuar.</p>
            <Button className="mt-4" size="sm" variant="secondary">
              Revisar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  ),
}
