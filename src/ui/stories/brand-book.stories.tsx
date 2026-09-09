import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  CalendarDays,
  Check,
  ChevronRight,
  CircleAlert,
  Euro,
  LayoutDashboard,
  Plus,
  Search,
  Settings,
  Users,
  X,
} from 'lucide-react'
import type * as React from 'react'

import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
  AppShell,
  AppShellContent,
  AppShellHeader,
  AppShellHeaderActions,
  AppShellHeaderContext,
  AppShellMain,
  AppShellSidebar,
  AppShellSidebarContent,
  AppShellSidebarFooter,
  AppShellSidebarHeader,
  Badge,
  BrandMark,
  Button,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Eyebrow,
  MetricCard,
  cn,
} from '../../index'

const meta = {
  title: 'Introducción/Brand Book',
  parameters: { layout: 'fullscreen', chromatic: { disableSnapshot: true } },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

function BookPage({ children }: { children: React.ReactNode }) {
  return (
    <main className="bg-background text-foreground min-h-screen px-6 py-10 sm:px-12 sm:py-14">
      <div className="mx-auto max-w-4xl space-y-16">{children}</div>
    </main>
  )
}

function BookSection({
  index,
  title,
  description,
  children,
}: {
  index: string
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <section className="space-y-6">
      <div className="border-border border-t pt-5">
        <Eyebrow>{index}</Eyebrow>
        <div className="mt-2 flex flex-wrap items-baseline justify-between gap-x-10 gap-y-2">
          <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
          <p className="text-muted-foreground max-w-md text-sm leading-6">{description}</p>
        </div>
      </div>
      {children}
    </section>
  )
}

function TokenRow({
  token,
  value,
  note,
  swatch,
}: {
  token: string
  value: string
  note: string
  swatch: string
}) {
  return (
    <div className="border-border/60 flex items-center gap-4 border-b py-3 last:border-0">
      <span className={cn('size-9 shrink-0 rounded-lg border border-black/5', swatch)} />
      <div className="min-w-0 flex-1">
        <p className="font-mono text-[0.8125rem] font-medium">{token}</p>
        <p className="text-muted-foreground text-xs">{note}</p>
      </div>
      <code className="text-muted-foreground shrink-0 text-xs">{value}</code>
    </div>
  )
}

export const Portada: Story = {
  render: () => (
    <main className="bg-background text-foreground flex min-h-screen flex-col">
      <header className="flex items-center justify-between px-6 pt-6 sm:px-12 sm:pt-8">
        <BrandMark name="doscientos/ui" />
        <p className="text-muted-foreground text-xs">Brand book · Septiembre 2026</p>
      </header>

      <div className="flex flex-1 flex-col justify-center px-6 py-20 sm:px-12">
        <Eyebrow>Sistema de diseño</Eyebrow>
        <h1 className="mt-8 max-w-4xl text-5xl leading-[1.02] font-semibold tracking-[-0.045em] sm:text-7xl">
          Herramientas serenas
          <br />
          <span className="text-muted-foreground">para negocios ruidosos</span>
          <span className="text-primary">.</span>
        </h1>
        <p className="text-muted-foreground mt-8 max-w-xl text-base leading-7">
          doscientos/ui reúne las primitivas accesibles, los tokens y las pautas con las que
          construimos SobreTaula y el resto de productos internos. Este documento es la referencia
          viva: si una decisión no está aquí, todavía no es una decisión.
        </p>
      </div>

      <footer className="border-border bg-border grid grid-cols-2 gap-px border-t sm:grid-cols-4">
        {[
          ['Foundation', 'React Aria Components'],
          ['Estilos', 'Tailwind CSS v4 + tokens CSS'],
          ['Temas', 'Claro y oscuro'],
          ['Idioma', 'Español por defecto'],
        ].map(([label, value]) => (
          <div key={label} className="bg-background px-6 py-5 sm:px-8">
            <p className="text-muted-foreground text-[0.6875rem] font-semibold tracking-[0.16em] uppercase">
              {label}
            </p>
            <p className="mt-1.5 text-sm font-medium">{value}</p>
          </div>
        ))}
      </footer>
    </main>
  ),
}

export const Marca: Story = {
  render: () => (
    <BookPage>
      <BookSection
        index="01"
        title="El símbolo"
        description="Un círculo punteado abierto: la mesa vista desde arriba y el cero de doscientos. Siempre sobre el token primary, en cualquier tema."
      >
        <div className="flex flex-wrap items-end gap-10">
          <span className="bg-primary text-primary-foreground flex size-24 items-center justify-center rounded-full text-5xl shadow-(--ui-shadow-surface)">
            ◌
          </span>
          <dl className="space-y-1.5 pb-1 text-sm">
            <div className="flex gap-2">
              <dt className="text-muted-foreground w-20">Glifo</dt>
              <dd className="font-mono text-[0.8125rem]">U+25CC · dotted circle</dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-muted-foreground w-20">Fondo</dt>
              <dd className="font-mono text-[0.8125rem]">primary · #2a4227</dd>
            </div>
            <div className="flex gap-2">
              <dt className="text-muted-foreground w-20">Forma</dt>
              <dd>círculo · rounded-xl al 52% del lado</dd>
            </div>
          </dl>
        </div>
      </BookSection>

      <BookSection
        index="02"
        title="Logotipo"
        description="Dos tamaños. El mediano para cabeceras de página, el pequeño para contextos compactos como barras laterales."
      >
        <div className="border-border bg-border grid gap-px overflow-hidden rounded-xl border sm:grid-cols-2">
          <div className="bg-card p-6">
            <BrandMark name="doscientos/ui" />
            <p className="text-muted-foreground mt-4 text-xs">md · símbolo 32px · texto base</p>
          </div>
          <div className="bg-card p-6">
            <BrandMark name="doscientos/ui" size="sm" />
            <p className="text-muted-foreground mt-4 text-xs">
              sm · símbolo 28px · cabeceras compactas
            </p>
          </div>
        </div>
      </BookSection>

      <BookSection
        index="03"
        title="Espacio de respeto"
        description="Media altura del símbolo a cada lado. Nada entra en esa zona: ni texto, ni otros logos, ni bordes de tarjeta."
      >
        <div className="border-border bg-card rounded-xl border p-6">
          <div className="border-border-strong inline-flex rounded-lg border border-dashed p-4">
            <BrandMark name="doscientos/ui" />
          </div>
        </div>
      </BookSection>

      <BookSection index="04" title="Lo que no" description="Tres reglas que no se negocian.">
        <ul className="border-border/60 divide-border/60 divide-y border-y">
          {[
            'No rotar, estirar ni contornear el símbolo.',
            'No cambiar el fondo del símbolo: siempre el token primary.',
            'No añadir sombras, brillos ni gradientes al logotipo.',
          ].map((rule) => (
            <li key={rule} className="flex items-center gap-3 py-3 text-sm">
              <X className="text-destructive size-4 shrink-0" aria-hidden="true" />
              {rule}
            </li>
          ))}
        </ul>
      </BookSection>
    </BookPage>
  ),
}

export const Color: Story = {
  render: () => (
    <BookPage>
      <BookSection
        index="01"
        title="Superficies"
        description="Tres capas separadas por medio tono. La jerarquía se apoya en luz y en bordes hairline, nunca en sombras pesadas."
      >
        <div className="bg-canvas rounded-2xl p-4 sm:p-6">
          <div className="bg-background rounded-xl p-4 sm:p-6">
            <div className="border-border bg-card rounded-lg border p-5 shadow-(--ui-shadow-surface)">
              <p className="text-sm font-medium">card</p>
              <p className="text-muted-foreground mt-1 text-xs">sobre background, sobre canvas</p>
            </div>
          </div>
        </div>
        <div>
          <TokenRow
            token="--ui-canvas"
            value="#ececea"
            note="Fondo de la aplicación, alrededor del shell"
            swatch="bg-canvas"
          />
          <TokenRow
            token="--ui-background"
            value="#f7f7f5"
            note="Fondo de páginas y vistas"
            swatch="bg-background"
          />
          <TokenRow
            token="--ui-card"
            value="#ffffff"
            note="Contenido agrupado: tarjetas y popovers"
            swatch="bg-card"
          />
          <TokenRow
            token="--ui-border"
            value="#e6e6e3"
            note="Siempre hairline, nunca bordes de 2px"
            swatch="bg-border"
          />
        </div>
      </BookSection>

      <BookSection
        index="02"
        title="Marca"
        description="Verde bosque para actuar, lima para celebrar. El lima aparece una vez por pantalla como mucho."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="bg-primary text-primary-foreground rounded-xl p-6">
            <p className="text-lg font-semibold">Verde bosque</p>
            <p className="text-primary-foreground/70 mt-1 font-mono text-xs">primary · #2a4227</p>
            <p className="mt-8 text-sm leading-6">
              Acciones primarias, navegación activa y el símbolo. En tema oscuro pasa a casi blanco:
              manda el token, no el hex.
            </p>
          </div>
          <div className="bg-accent text-accent-foreground rounded-xl p-6">
            <p className="text-lg font-semibold">Lima</p>
            <p className="text-accent-foreground/70 mt-1 font-mono text-xs">accent · #bdff7b</p>
            <p className="mt-8 text-sm leading-6">
              Un acento por pantalla: un dato que celebra, un estado nuevo. Nunca texto pequeño ni
              fondos de página.
            </p>
          </div>
        </div>
      </BookSection>

      <BookSection
        index="03"
        title="Semántico"
        description="Cuatro significados fijos. El color nunca decora: siempre informa."
      >
        <div>
          {(
            [
              {
                variant: 'success',
                label: 'Confirmada',
                token: '--ui-success',
                value: '#166534',
                note: 'Estados finales y buenas noticias',
              },
              {
                variant: 'warning',
                label: 'Sin asignar',
                token: '--ui-warning',
                value: '#854d0e',
                note: 'Pide atención sin bloquear',
              },
              {
                variant: 'info',
                label: 'Sincronizando',
                token: '--ui-info',
                value: '#0369a1',
                note: 'Contexto del sistema, neutral',
              },
              {
                variant: 'danger',
                label: 'Cancelada',
                token: '--ui-destructive',
                value: '#b91c1c',
                note: 'Errores y acciones irreversibles',
              },
            ] as const
          ).map((item) => (
            <div
              key={item.token}
              className="border-border/60 flex items-center gap-4 border-b py-3 last:border-0"
            >
              <Badge variant={item.variant}>{item.label}</Badge>
              <div className="min-w-0 flex-1">
                <p className="font-mono text-[0.8125rem] font-medium">{item.token}</p>
                <p className="text-muted-foreground text-xs">{item.note}</p>
              </div>
              <code className="text-muted-foreground shrink-0 text-xs">{item.value}</code>
            </div>
          ))}
        </div>
      </BookSection>

      <BookSection
        index="04"
        title="Tema oscuro"
        description="Los mismos tokens con valores invertidos. El lima no cambia."
      >
        <div className="dark bg-background rounded-xl p-6">
          <div className="flex flex-wrap gap-2">
            <span className="border-border bg-card text-card-foreground rounded-md border px-3 py-1.5 text-xs">
              card
            </span>
            <span className="bg-primary text-primary-foreground rounded-md px-3 py-1.5 text-xs">
              primary
            </span>
            <span className="bg-accent text-accent-foreground rounded-md px-3 py-1.5 text-xs">
              accent
            </span>
            <span className="bg-muted text-muted-foreground rounded-md px-3 py-1.5 text-xs">
              muted
            </span>
            <span className="bg-secondary text-secondary-foreground rounded-md px-3 py-1.5 text-xs">
              secondary
            </span>
          </div>
          <p className="text-muted-foreground mt-4 font-mono text-xs">
            background oklch(0.145) · card oklch(0.205) · primary oklch(0.922)
          </p>
        </div>
      </BookSection>
    </BookPage>
  ),
}

export const Tipografia: Story = {
  render: () => (
    <BookPage>
      <BookSection
        index="01"
        title="Escala"
        description="Seis niveles bastan. Tracking negativo solo a partir de 20px."
      >
        <div>
          {[
            {
              name: 'Display',
              spec: '30–36px · semibold · −0,04em',
              sample: 'Reservas de hoy',
              className: 'text-3xl font-semibold tracking-[-0.04em]',
            },
            {
              name: 'Título',
              spec: '20px · semibold',
              sample: 'Detalle de reserva',
              className: 'text-xl font-semibold',
            },
            {
              name: 'Cuerpo',
              spec: '14px · regular · interlineado 1.6',
              sample: 'La mesa 14 queda libre a las 22:00.',
              className: 'text-sm leading-6',
            },
            {
              name: 'Metadata',
              spec: '12px · regular · muted-foreground',
              sample: 'Actualizado hace 4 minutos',
              className: 'text-muted-foreground text-xs',
            },
            {
              name: 'Métrica',
              spec: '28–36px · semibold · cifras tabulares',
              sample: '28.640 €',
              className: 'text-3xl font-semibold tracking-[-0.03em] tabular-nums',
            },
          ].map((row) => (
            <div
              key={row.name}
              className="border-border/60 flex flex-wrap items-baseline justify-between gap-x-10 gap-y-2 border-b py-5 last:border-0"
            >
              <p className={row.className}>{row.sample}</p>
              <p className="text-muted-foreground w-60 shrink-0 text-xs">
                <span className="text-foreground font-medium">{row.name}</span> · {row.spec}
              </p>
            </div>
          ))}
          <div className="flex flex-wrap items-baseline justify-between gap-x-10 gap-y-2 py-5">
            <Eyebrow>Operativa</Eyebrow>
            <p className="text-muted-foreground w-60 shrink-0 text-xs">
              <span className="text-foreground font-medium">Eyebrow</span> · 11px · semibold ·
              +0,16em · mayúsculas
            </p>
          </div>
        </div>
      </BookSection>

      <BookSection index="02" title="Reglas" description="Lo que mantiene la tipografía tranquila.">
        <ul className="border-border/60 divide-border/60 divide-y border-y">
          {[
            'Titulares en oración, nunca En Title Case.',
            'La negrita (700) no existe: el peso máximo es semibold (600).',
            'El dinero y las métricas usan tabular-nums para que las columnas no bailen.',
            'Lo secundario va en muted-foreground, no en un gris inventado.',
          ].map((rule) => (
            <li key={rule} className="flex items-center gap-3 py-3 text-sm">
              <Check className="text-success size-4 shrink-0" aria-hidden="true" />
              {rule}
            </li>
          ))}
        </ul>
      </BookSection>

      <BookSection
        index="03"
        title="Composición"
        description="Eyebrow, título, descripción y acciones: la cabecera de página por defecto."
      >
        <div className="border-border bg-card rounded-xl border p-6">
          <Eyebrow>Hoy · martes 9 de septiembre</Eyebrow>
          <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em]">Resumen del servicio</h3>
          <p className="text-muted-foreground mt-1 text-sm">
            24 reservas y 86 comensales entre comida y cena.
          </p>
          <div className="mt-5 flex gap-2">
            <Button size="sm">
              <Plus /> Nueva reserva
            </Button>
            <Button size="sm" variant="outline">
              Exportar
            </Button>
          </div>
        </div>
      </BookSection>
    </BookPage>
  ),
}

export const Aplicacion: Story = {
  render: () => (
    <div className="bg-background text-foreground h-180">
      <AppShell sidebarBreakpoint="sm">
        <AppShellSidebar>
          <AppShellSidebarHeader>
            <BrandMark name="SobreTaula" size="sm" />
          </AppShellSidebarHeader>
          <AppShellSidebarContent className="space-y-1">
            {[
              { icon: LayoutDashboard, label: 'Resumen', active: true },
              { icon: CalendarDays, label: 'Reservas', active: false },
              { icon: Users, label: 'Clientes', active: false },
              { icon: Settings, label: 'Configuración', active: false },
            ].map((item) => (
              <a
                key={item.label}
                href={`#${item.label.toLowerCase()}`}
                aria-current={item.active ? 'page' : undefined}
                className="text-muted-foreground flex items-center gap-3 rounded-lg px-3 py-2 text-sm"
              >
                <item.icon className="size-4" aria-hidden="true" />
                {item.label}
              </a>
            ))}
          </AppShellSidebarContent>
          <AppShellSidebarFooter>
            <div className="flex items-center gap-3 px-2 py-1.5">
              <span className="bg-secondary flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold">
                AR
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">Alex Rivera</p>
                <p className="text-muted-foreground text-xs">Encargado</p>
              </div>
            </div>
          </AppShellSidebarFooter>
        </AppShellSidebar>
        <AppShellMain>
          <AppShellHeader>
            <AppShellHeaderContext>
              <span className="text-muted-foreground text-sm">SobreTaula</span>
              <ChevronRight className="text-muted-foreground size-3.5" aria-hidden="true" />
              <span className="text-sm font-medium">Resumen</span>
            </AppShellHeaderContext>
            <AppShellHeaderActions>
              <Button size="sm" variant="outline">
                <Search /> Buscar
              </Button>
              <Button size="sm">
                <Plus /> Nueva reserva
              </Button>
            </AppShellHeaderActions>
          </AppShellHeader>
          <AppShellContent>
            <Eyebrow>Hoy · martes 9 de septiembre</Eyebrow>
            <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em]">Buenos días, Alex</h1>
            <p className="text-muted-foreground mt-1 text-sm">
              24 reservas y 86 comensales entre comida y cena.
            </p>

            <Alert variant="warning" className="mt-6">
              <CircleAlert aria-hidden="true" />
              <AlertTitle>2 reservas sin mesa asignada</AlertTitle>
              <AlertDescription>
                Asigna mesa antes de las 14:00 para evitar esperas en la barra.
              </AlertDescription>
              <AlertAction>
                <Button size="xs" variant="outline">
                  Asignar
                </Button>
              </AlertAction>
            </Alert>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
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

            <Card variant="flat" className="mt-6">
              <CardHeader>
                <CardTitle>Próximas reservas</CardTitle>
                <CardDescription>Entre ahora y el cierre de la cena</CardDescription>
                <CardAction>
                  <Badge variant="warning">2 sin asignar</Badge>
                </CardAction>
              </CardHeader>
              <CardContent>
                <div className="divide-border/60 divide-y">
                  {(
                    [
                      {
                        time: '13:30',
                        name: 'Marta Gil',
                        note: '2 pax · terraza',
                        variant: 'success',
                        status: 'Confirmada',
                      },
                      {
                        time: '14:00',
                        name: 'Comida equipo Norte',
                        note: '8 pax · sin mesa',
                        variant: 'warning',
                        status: 'Sin asignar',
                      },
                      {
                        time: '20:30',
                        name: 'Aniversario Rovira',
                        note: '2 pax · junto a la ventana',
                        variant: 'success',
                        status: 'Confirmada',
                      },
                      {
                        time: '21:00',
                        name: 'Grupo Andanza',
                        note: '12 pax · menú cerrado',
                        variant: 'neutral',
                        status: 'Pendiente',
                      },
                    ] as const
                  ).map((row) => (
                    <div
                      key={row.time + row.name}
                      className="flex items-center gap-4 py-3 first:pt-0 last:pb-0"
                    >
                      <span className="text-muted-foreground w-12 shrink-0 text-sm tabular-nums">
                        {row.time}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">{row.name}</p>
                        <p className="text-muted-foreground text-xs">{row.note}</p>
                      </div>
                      <Badge variant={row.variant}>{row.status}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </AppShellContent>
        </AppShellMain>
      </AppShell>
    </div>
  ),
}

export const Feedback: Story = {
  render: () => (
    <BookPage>
      <BookSection
        index="01"
        title="Badges"
        description="Una etiqueta, un significado. El icono es automático según la variante."
      >
        <div className="flex flex-wrap gap-2">
          <Badge variant="success">Pagada</Badge>
          <Badge variant="info">En curso</Badge>
          <Badge variant="warning">Sin asignar</Badge>
          <Badge variant="danger">Cancelada</Badge>
          <Badge variant="neutral">Borrador</Badge>
          <Badge variant="outline">Tarde</Badge>
          <Badge variant="secondary">VIP</Badge>
        </div>
      </BookSection>

      <BookSection
        index="02"
        title="Alertas"
        description="Un mensaje, una acción. Si no hay nada que hacer, no hay alerta."
      >
        <div className="space-y-3">
          <Alert variant="success">
            <Check aria-hidden="true" />
            <AlertTitle>Reserva confirmada</AlertTitle>
            <AlertDescription>
              La mesa 14 queda reservada hoy a las 20:30 a nombre de Rovira.
            </AlertDescription>
          </Alert>
          <Alert variant="warning">
            <CircleAlert aria-hidden="true" />
            <AlertTitle>Faltan los alérgenos del menú de grupo</AlertTitle>
            <AlertDescription>
              El menú del viernes no se puede imprimir hasta completar la ficha.
            </AlertDescription>
            <AlertAction>
              <Button size="xs" variant="outline">
                Revisar
              </Button>
            </AlertAction>
          </Alert>
          <Alert variant="destructive">
            <CircleAlert aria-hidden="true" />
            <AlertTitle>No se pudo cobrar la cuenta</AlertTitle>
            <AlertDescription>
              El TPV rechazó la tarjeta terminada en 4417. Prueba con otro medio de pago.
            </AlertDescription>
          </Alert>
        </div>
      </BookSection>

      <BookSection
        index="03"
        title="Botones"
        description="Una acción primaria por vista. El resto son secundarias u outline; destructive solo cuando hay pérdida de datos."
      >
        <div className="flex flex-wrap items-center gap-2">
          <Button>Guardar cambios</Button>
          <Button variant="secondary">Duplicar</Button>
          <Button variant="outline">Exportar</Button>
          <Button variant="ghost">Ver detalle</Button>
          <Button variant="destructive">Eliminar</Button>
          <Button disabled>Guardando…</Button>
        </div>
      </BookSection>
    </BookPage>
  ),
}
