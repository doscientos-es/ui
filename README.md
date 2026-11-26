# @doscientos/ui

Primitives React accesibles, rápidas y temables para los productos de Doscientos. No depende de Next.js, Astro, router, backend ni estado de datos.

Requiere React y React DOM 19 o superior.

El criterio visual y de producto está documentado en [DESIGN-GUIDELINES.md](./DESIGN-GUIDELINES.md). Ese documento es parte del contrato del paquete: explica cómo combinar las primitives para que una aplicación Doscientos se sienta premium, no solo qué componentes existen.

## Alcance

- Foundations: tokens CSS, tema claro/oscuro y utilidades de clases y texto.
- Controles y formularios: botones, campos, selección, feedback, búsqueda y validación accesible.
- Navegación y overlays: tabs, menús, breadcrumbs, tooltip, popover, dialogs, drawers y bottom sheets.
- Datos y estados: tablas, cards, avatares, badges, skeletons, alertas y estados vacíos.
- Patrones de aplicación: shell, sidebar, cabeceras, toolbars, paginación, toasts y carga.
- Hooks: debounce, cambios no guardados y autosave sin acoplamiento a transporte o datos.

Los componentes de dominio, llamadas API, navegación, toasts y layouts permanecen en cada aplicación.

La base de accesibilidad interactiva es `react-aria-components`.
Los consumidores importan exclusivamente `@doscientos/ui`: React Aria queda
encapsulado para que las APIs, tokens y accesibilidad sean consistentes.
`DataTable` usa TanStack Table como motor de datos; conserva una tabla HTML nativa.

## Uso en una aplicación React con Tailwind v4

Instala el paquete y React como dependencia de tu aplicación. Después, importa una sola vez los estilos compilados en el punto de entrada CSS.

```css
@layer theme, base, components, utilities;
@import '@doscientos/ui/styles.css';
@import 'tailwindcss';
```

Declara primero el orden de capas y carga los estilos de la biblioteca antes que Tailwind. Así sus utilidades conservan la misma
prioridad que las de la aplicación y las clases de la aplicación pueden ajustar los componentes:
por ejemplo, `pl-8` reserva espacio para un icono aunque el campo incluya `px-3`.

```tsx
import { Button, Field, FieldLabel, Input } from '@doscientos/ui'

export function ProfileName() {
  return (
    <Field>
      <FieldLabel htmlFor="name">Nombre</FieldLabel>
      <Input id="name" />
      <Button>Guardar</Button>
    </Field>
  )
}
```

### Subpaths (cargar solo lo necesario)

Además del barrel `@doscientos/ui`, cada componente tiene su subpath y hay dos subpaths no visuales:

```ts
import { Button } from '@doscientos/ui/button' // un componente
import { useDebouncedValue, useClipboard } from '@doscientos/ui/hooks' // hooks (cliente)
import { cn, getTextMatchParts } from '@doscientos/ui/utils' // helpers puros, válidos en Server Components
```

`utils` no lleva `"use client"` ni depende de React; `hooks` y los componentes sí.

Los proyectos pueden definir los tokens semánticos en `:root` o `.dark` para aplicar la marca del cliente; no deben modificar los componentes. `@doscientos/ui` no sobrescribe esos tokens y usa los valores del tema del backoffice como fallback cuando falte alguno.

Además de los tokens shadcn habituales, el paquete expone capas de producto para evitar
que cada aplicación reconstruya el mismo dashboard: `canvas`, `sidebar`,
`surface-subtle` y `border-strong`. Los fallbacks ya producen una interfaz cálida y
monocroma; una marca puede redefinirlos mediante `--canvas`, `--sidebar`,
`--surface-subtle` y `--border-strong`.

## Recetas para pantallas y agentes

Empieza por los ejemplos interactivos de Storybook: **Application / Recipes / Interactive list**
(búsqueda, vacío y creación), **Settings form** (validación y guardado) y
**Workspace dashboard** (navegación y métricas). Sus datos son ficticios: cada aplicación
debe conectar sus propias consultas, guardado, permisos y estados asíncronos.

Para una cabecera habitual, `PageHeader` acepta título, descripción y acciones sin
componer todos sus slots. Para una estructura especial, siguen disponibles
`PageHeaderHeading`, `PageHeaderTitle`, `PageHeaderDescription` y `PageHeaderActions`.

```tsx
<PageHeader
  heading="Clientes"
  description="Consulta y añade clientes."
  actions={<Button onPress={openCreate}>Nuevo cliente</Button>}
/>
```

`FormRow` puede generar el ID y proporcionar al control `required`, `aria-invalid` y
`aria-describedby` para la ayuda y el error. Distribuye las props sobre el control
etiquetable, no sobre un contenedor. Si necesitas un ID estable, pasa `htmlFor`.

```tsx
<FormRow label="Nombre" required description="Nombre legal." errorMessage={error}>
  {(controlProps) => <Input {...controlProps} name="name" />}
</FormRow>
```

También admite el child habitual con `htmlFor`, pero en ese caso la app debe pasar
el mismo `id` y conectar manualmente `aria-describedby`, `aria-invalid` y `required`.
Para controles compuestos como `Select`, usa su API de etiquetado propia, no esta
función para un input nativo. En cualquier receta conserva nombres accesibles y
comprueba teclado, estados de carga, error y vacío.

### Convenciones de API

- La ayuda de un campo es `description` y el mensaje de validación `errorMessage`.
- En acciones y diálogos, `isPending` y `pendingLabel` indican una operación en curso;
  para controles interactivos, `isDisabled` e `isInvalid` describen su estado.
  Los inputs HTML nativos conservan sus atributos `disabled`, `required` y eventos nativos.
- En `Select`, `Combobox`, `AutocompleteCombobox`, `MultiSelectCombobox` y
  `SegmentedControl`, la selección usa `value` / `onChange` o `defaultValue`.
  En comboboxes, `inputValue` / `onInputChange` controla por separado el texto buscado.
  La selección simple usa una clave o `null`; la múltiple, un array de claves.
  Los componentes de composición conservan también la API de React Aria.

## Diálogos y controles cómodos por defecto

`Dialog` y `DialogContent` usan `size="md"` (máximo 32rem / 512px), sin depender de
breakpoints ni de los tokens de ancho de la aplicación. Conservan un margen de 16px
en móvil y desplazan el contenido largo dentro del panel, limitado por `100dvh`.

- Tamaños: `sm` (24rem), `md` (32rem), `lg` (42rem), `xl` (56rem) y `full` (ancho disponible).
- Usa `size="lg"` para formularios amplios y `full` solo cuando la tarea lo necesite;
  `className` sigue permitiendo overrides explícitos.
- Incluye `DialogTitle` y, cuando aporte contexto, `DialogDescription`. Ambos se
  vinculan al diálogo para lectores de pantalla; el cierre no invade el encabezado.
- `isDismissable={false}` evita cerrar al pulsar fuera. `isKeyboardDismissDisabled`
  bloquea Escape; resérvalo para operaciones que realmente no puedan interrumpirse.
- `AlertDialog` no cierra al pulsar fuera. `AlertDialogCancel` y `ConfirmDialog`
  enfocan la cancelación inicialmente; `ConfirmDialog` conserva el estado pendiente.
- `Input`, `Textarea` y `ComboboxInput` comparten foco, error y estados deshabilitados.
  El texto es de 16px en viewports estrechos para evitar el zoom automático de iOS.
- En viewports estrechos, los botones normales, grandes y de icono normal/grande
  alcanzan 44px. Los tamaños compactos explícitos se conservan.

Storybook: **Components / Overlays / Dialog / Default Open**, **Sizes** y **Long Content**.

## Formularios modales y selección reutilizable

Tres patrones de bajo coste componiendo las primitives existentes, sin dependencias nuevas:

- `FormDialog`: título, descripción, formulario nativo, cancelación y `SubmitButton`.
  Recibe `open`, `onOpenChange`, `onSubmit` y los campos como `children`.
  Previene la navegación del submit, conserva validación HTML y entrega el evento
  para leer `FormData`. La app guarda, muestra errores y cierra **solo tras el éxito**.
- `isPending` bloquea submit, cancelación, cierre, Escape y clicks fuera mientras se
  guarda. `isSubmitDisabled` solo bloquea el submit; `pendingLabel`, `submitLabel` y
  `cancelLabel` permiten adaptar el copy. Pasa el estado pendiente de tu acción.
- Conserva el ancho compacto de `Dialog`; usa `size` y `bodyClassName` para ampliar
  o distribuir campos. `formProps` permite `ref`, `id`, `noValidate` y atributos
  nativos. Para forms con `action` de React, compón `Dialog` y `SubmitButton` directamente.
- El cierre al pulsar fuera es opt-in (`isDismissable`). Pasa `isDirty` para pedir
  confirmación antes de cerrar por Cancelar, Escape, la × o fuera. La app controla
  ese estado: puede usar `useFormDirty` con `formProps.ref` para controles nativos
  con `name`, o su propio estado para controles complejos. `discardConfirmation`
  permite personalizar los textos. El cierre tras guardar sigue siendo responsabilidad de la app.
- En formularios largos se desplazan los campos; título y acciones permanecen visibles.
- `SegmentedControl` + `SegmentedControlItem`: elección única con `value`,
  `defaultValue` y `onChange`; cada segmento lleva `value`. Usa un `aria-label`
  para el grupo y texto o un nombre accesible para cada opción. Soporta flechas,
  orientación vertical, `name` para formularios, disabled y read-only.
- Usa `Tabs` para paneles asociados y `ButtonGroup` para acciones independientes;
  el segmented control se reserva para pocas opciones como vista o periodo.
- `MultiSelectCombobox`: recibe `items`, `getItemKey` y `getItemLabel`; selección
  controlada con `value` / `onChange` o inicial con `defaultValue` (arrays de claves).
  Reutiliza los slots del combobox y delega filtrado, teclado y selección a React Aria.
- Los seleccionados se muestran como tags eliminables con teclado y botones;
  `label` o `aria-label`, `description`, `errorMessage`, `emptyState`, `selectedLabel`
  y `removeLabel` adaptan contexto y copy. `removeLabel` es el verbo («Quitar»);
  React Aria añade el nombre de cada tag. Disabled y read-only impiden eliminar.
- `name` envía las claves como valores repetidos en `FormData`; `renderItem`
  personaliza las opciones sin meter entidades de negocio en el paquete.
  El filtrado es local: incluye también las opciones seleccionadas en `items`.
  Fetching, caché y adaptación de resultados remotos siguen en la aplicación.

### Adopción sin duplicidades

Al actualizar la dependencia publicada, sustituye el wrapper visual
`internal/projects/abaco/src/shared/ui/form-dialog.tsx` por un re-export o un adaptador
fino de `FormDialog`; conserva el grid de dos columnas con `bodyClassName`.
`EntityMultiCombobox` del backoffice puede quedarse como adaptador de datos e iconos
de dominio sobre `MultiSelectCombobox`, eliminando su implementación de selección.
No copies estos componentes a cada frontend ni migres imports antes de disponer de
una versión del paquete que los exporte.

Storybook: **Components / Forms / FormDialog**, **SegmentedControl** y **MultiSelectCombobox**.

## Iconos de estado en badges

`Badge` y `BadgeLink` incluyen un icono decorativo según `variant`: `success` → check,
`warning` → reloj, `info` → información, `danger`/`destructive` → alerta. Las variantes
de categoría (`default`, `secondary`, `neutral`, `outline`, `ghost`, `link`) no añaden icono.

```tsx
<Badge variant="info">Emitida</Badge>
<Badge variant="success">Verifactu · Aceptada</Badge>
<Badge variant="success" icon={<ShieldCheck />}>Verificada</Badge>
<Badge variant="warning" icon={false}>Revisión</Badge>
```

Omitir `icon` (o pasar `undefined`) usa el predeterminado. `false` y `null` lo ocultan.
Un elemento lo sustituye; también funciona en variantes neutras. El icono es decorativo
y no altera el nombre accesible: conserva el estado en el texto y evita controles
interactivos dentro de `icon`. Storybook: **Components / Data Display / Badge / Icon Overrides**.

Al actualizar consumidores: elimina los iconos de estado insertados manualmente en
`children`, pásalos por `icon` si son específicos del dominio, o usa `icon={false}`
para conservar una composición anterior. En el backoffice, al instalar la nueva
versión, elimina el mapa local de iconos de `StatusBadge`: su `...rest` ya propagará
`icon` y el paquete resolverá el predeterminado. Actualiza dependencia y wrapper juntos.

## Sugerencias y autocompletado

El combobox es composable: la aplicación controla datos, peticiones y caché; la UI resuelve el teclado, foco, filtrado, popup y selección accesible. `HighlightMatch` mantiene el texto original y encuentra coincidencias aunque cambien mayúsculas o acentos.

```tsx
<Combobox items={clients} inputValue={query} onInputChange={setQuery}>
  <ComboboxInput placeholder="Busca un cliente…" />
  <ComboboxContent>
    <ComboboxList emptyState="Sin resultados.">
      {(client) => (
        <ComboboxItem id={client.id} textValue={client.name}>
          <HighlightMatch text={client.name} query={query} />
        </ComboboxItem>
      )}
    </ComboboxList>
  </ComboboxContent>
</Combobox>
```

## Patrones de aplicación

Las primitivas de composición no conocen rutas, entidades ni transporte: cada frontend conserva esos detalles y reutiliza una UI accesible.

- `FilterBar`, `FilterGroup`, `ActiveFilters` y `FilterChip`: toolbar de filtros. Combínalos con `updateSearchParams`; la app decide cómo escribir la URL.
- `SelectionToolbar`: muestra selección masiva mediante `count` y recibe las acciones como `children`.
- `DescriptionList`, `DescriptionItem`, `DescriptionTerm` y `DescriptionDetails`: detalles semánticos de solo lectura con `dl`/`dt`/`dd`.
- `DataViewState`: estado vacío, de carga o recuperable de una vista de datos; compón título, descripción y acciones.
- `DetailDrawer`: marco de drawer para fichas; pasa `title` y `description`, y compón `DetailDrawerBody` y `DetailDrawerFooter` según necesites.
- `SectionHeader`: cabecera de panel con heading y acciones; `PageHeader` se reserva para el `h1` de una página.
- `PageStack`: ritmo vertical compartido entre la cabecera y las secciones de una página.
- `MetricGrid` y `MetricCard`: grid responsive de KPIs. `MetricCard` admite `loading`, `trend`, `delta`, `action`, `visual` y `footer`; el gráfico sigue siendo responsabilidad de la app.
- `BrandMark`: lockup de producto consistente para headers y sidebars.
- `Eyebrow`: label editorial de sección para navegación y agrupaciones de contenido.
- `AppShellSidebarHeader`, `AppShellSidebarContent` y `AppShellSidebarFooter`: slots para construir la sidebar tipo workspace con marca arriba, navegación desplazable y utilidades/perfil fijados abajo.
- `AppShell variant="inset"`: enmarca el producto sobre `canvas` en escritorio, como en herramientas SaaS editoriales, sin alterar el layout móvil.
- `SidebarWorkspace` y `SidebarProfile`: resuelven el selector de espacio y la cuenta fijada al pie; `Sidebar` también se puede usar directamente como hijo de `AppShell`.
- `Card variant="flat"`, `CardToolbar`, `Toolbar variant="surface|attached"` y `Table density="compact"`: permiten paneles de datos completos sin repetir clases de borde, sombra y densidad.

La story `Application/Recipes/Workspace dashboard` es la receta de referencia para
combinar estos componentes en una pantalla completa sin acoplar el paquete a un
dominio ni a una librería de gráficas.

### Tabla de datos y búsqueda global

- **`@doscientos/ui/data-table`**: define `DataTableColumn<T>[]`, prepara el modelo con
  `useDataTable({ columns, data, getRowId })` y pásalo a `<DataTable table={table} />`.
  Mantén estables `columns`, `data` y los ID. Proporciona `caption` o `aria-label`.
- Ordenación, filtros y paginación funcionan en local por defecto. Con datos del servidor,
  usa `manualSorting`, `manualFiltering` y `manualPagination` según corresponda, controla
  `state` y sus callbacks `on…Change`, y pasa `rowCount` o `pageCount`. La app resuelve la
  consulta y decide cuándo volver a la primera página. `renderPagination` sustituye el pie
  predeterminado, no el modelo de paginación.
- Compón controles con `table.setGlobalFilter`, `column.toggleVisibility` o
  `table.setColumnOrder`. `createDataTableSelectionColumn` añade casillas de fila y de la
  página actual; pasa `getRowId` para conservar la selección al cambiar de página o datos.
  Los encabezados ordenables deben contener texto, no otros controles interactivos.
- **`@doscientos/ui/global-search`**: compón `GlobalSearch` dentro de un `Dialog` o en una
  página. Pasa `items` ya ordenados (`id`, `title` y los campos de tu app), `query`,
  `onQueryChange` y `onAction`. El componente no vuelve a filtrar. React Aria gestiona el
  teclado y el foco en la lista; la app gestiona peticiones, permisos, ranking, atajos
  globales, apertura y navegación. Usa `status`, `loading` y `feedback` para comunicar
  los resultados y permitir reintentos sin ocultar resultados parciales.
- **Ábaco** puede sustituir el combobox artesanal del panel por el componente publicado,
  conservando `useSearchResults`, su diálogo, el pie de atajos y la navegación en `onAction`.
  Usa `focusOnMount={mode !== 'mobile'}` para enfocar el campo solo al abrir en escritorio.

Storybook: **Components / Data Display / DataTable** y **Components / Navigation / GlobalSearch**.

## Cabeceras de diálogos y paneles flotantes

Pasa `title` y, si aporta contexto, `description` a `Dialog`, `Drawer`, `AlertDialog`,
`Popover`, `BottomSheet` o `ResponsiveDialog`. El paquete aplica la tipografía y el
espaciado, y usa la cabecera como nombre y descripción accesibles. Usa
`headerClassName` si necesitas ajustar la cabecera sin modificar el contenido.

```tsx
<Dialog trigger="Editar" title="Editar cliente" description="Actualiza sus datos.">
  <ClientForm />
</Dialog>
<Popover trigger="Ver estado" title="Cliente activo" description="Actualizado hace 2 minutos." />
```

Con `Dialog` también puedes omitir `trigger` y controlar la apertura con `open` y
`onOpenChange`. Para composición avanzada, pasa esas props de cabecera a
`DialogContent`, `DrawerContent`, `AlertDialogContent` o `PopoverContent`, o sigue
componiendo tu propia cabecera con las piezas existentes (sin duplicarla con las props).
En `Popover`, las props de cabecera activan un diálogo accesible. Omítelas si pasas
contenido con su propia semántica, como una lista de opciones o un diálogo personalizado.

Usa `ResponsiveDialog` para filtros, detalles y formularios cortos que deben abrirse
como diálogo centrado en escritorio y `BottomSheet` arrastrable en móvil. Pasa
`title`, `trigger` (texto o botón) y el contenido una sola vez. Puedes controlar
la apertura con `open` y `onOpenChange`, o usar `defaultOpen`. La presentación se
elige al abrir: si cambia el viewport mientras está abierto, no se desmonta el
contenido ni se pierde el foco. `DialogClose` funciona en ambas presentaciones.

La receta `Application/Recipes/Responsive filters` muestra un `Select` y un
`Popover` anidados. Usa `size` para configurar el ancho en escritorio y `peekHeight`
para añadir una altura inicial en móvil (px o longitud CSS); deja visibles el
título y el botón de cierre a esa altura. Si ocultas el botón de cierre con
`showCloseButton={false}`, incluye una acción de cierre en el contenido.
Para un panel exclusivamente móvil, usa `BottomSheet` con `BottomSheetTrigger`
y `Button` para restaurar el foco al cerrar.

Para acciones asíncronas, usa `Button` con `isPending` y `pendingLabel`: el botón
reserva espacio para el indicador, conserva el foco y bloquea nuevas pulsaciones.
`SubmitButton` aplica este patrón automáticamente al enviar un formulario.

## Estado asíncrono, errores y copia

- `useAsyncAction(action)` evita dobles ejecuciones mientras está pendiente y devuelve `run`, `status`, `isPending`, `data`, `error` y `reset`.
- `reset` no cancela peticiones y no oculta una operación pendiente. Cada ejecución
  limpia el resultado anterior para que un fallo no presente datos de un éxito antiguo.
- `useAutosave` serializa las escrituras de una instancia para que una petición
  antigua no termine sobrescribiendo la siguiente. `saveNow` cancela el debounce
  pendiente y fuerza un guardado explícito; los errores quedan en `status`/`error`.
  Usa datos inmutables y una instancia por documento (remonta con `key` al cambiar
  de entidad). El servidor todavía necesita control de versión para varios usuarios
  o pestañas; un timeout no prueba que una escritura remota no se haya confirmado.
  Al desmontar se descartan guardados en cola, no se cancelan escrituras ya enviadas.
- `ErrorBoundary` aporta fallback recuperable, `resetKeys` y `onError`; `AsyncBoundary` combina error boundary con `Suspense`.
- `fallback={null}` oculta el contenido explícitamente. Los errores lanzados que no
  sean instancias de `Error` se normalizan. No sustituye los errores de loaders,
  promesas o eventos: esos se gestionan en el router o en la acción correspondiente.
- `ErrorState` es el fallback visual componible. La aplicación inyecta su acción de reintento, no el paquete.
- `useClipboard` y `CopyButton` resuelven copia, feedback y errores sin acoplarse a Sileo; usa `onCopied` u `onCopyError` para analytics/toasts de producto.

## Query params sin router

`toSearchParams`, `updateSearchParams`, `readSearchParam`, `readSearchParamArray`, `readSearchParamInt` y `readSearchParamEnum` son funciones puras. Úsalas con el router de cada app:

```ts
const next = updateSearchParams(searchParams, { page: 1, status: ['active'], q: query })
router.replace(`?${next}`)
```

No añadas hooks de Next, React Router ni TanStack Router al paquete. Las stories documentan componentes visuales; los hooks y utilidades puras se documentan aquí y se cubren con pruebas unitarias.

## Contratos de estilos y navegación

- Los slots composables de Combobox conservan tanto clases estáticas como funciones
  `className(state)` de React Aria, combinándolas con los estilos base.
- `Pagination` normaliza página y vecinos; `siblingCount` se limita a 0–10 para no
  generar listas de botones sin límite. Estado visual y `aria-current` coinciden.
- Para que los overlays portaled hereden la marca y el tema, aplica los tokens y
  `.dark` en la raíz del documento, no solo en un contenedor del contenido.
- No hay integración con un router implícita: la aplicación configura navegación
  SPA mediante las APIs del router o del proveedor de React Aria según corresponda.
- Los resets de formulario, links y listas se limitan a elementos con `data-slot`
  dentro de la capa CSS `base`; no se impone Preflight global al consumidor.
- `--input` distingue límites necesarios de controles (3:1) de `--border`, reservado
  para separadores decorativos. Comprueba ambos temas si tu marca redefine `--input`.

### Calendar

`Calendar` es una composición de agenda, mes y horario semanal/diario; no es un
selector de fechas. Usa fechas locales, semana desde el lunes y eventos con `id`
único. `getItemLabel` da nombre accesible cuando `renderItem` no aporta texto.

- `onItemMove` habilita edición; `editable={false}` en un evento la bloquea.
- Alt + ↑/↓ mueve por `minuteStep`, Alt + RePág/AvPág cambia de día y Alt + ←/→
  cambia de recurso. El resultado se anuncia y se conserva el foco si sigue visible.
- La aplicación actualiza `items`, valida colisiones/permisos y decide persistencia.
  El componente conserva duración y no modifica las fechas recibidas.
- Usa `agenda` en móvil cuando sea preferible a desplazar el horario horizontalmente.
  No incluye recurrencia, resolución de solapes ni edición/redimensionado táctil.

## Desarrollo

- `pnpm quality`: formato, lint, tipos y tests; es el control del paquete en CI.
- `pnpm quality:quick`: formato y lint sin fixes; feedback rápido, no sustituye `quality`.
- `pnpm hooks:install`: activa el pre-commit nativo una vez por clon. Rehúsa reemplazar
  hooks existentes; no instala dependencias ni cambia Git global. Requiere Node/pnpm en
  PATH también en la GUI. El hook comprueba el árbol de trabajo completo, sin stash,
  staging automático, tests ni build. CI comprueba el contenido realmente subido.
- `pnpm test`: pruebas del contrato de empaquetado, unitarias y de renderizado.
- `pnpm test:storybook`: renderizado, accesibilidad e interacciones de todas las stories en Chromium.
- `node scripts/test-ui-matrix.mjs`: stories en claro/oscuro × escritorio/móvil,
  con informes JSON temporales y exit code fallido si falla alguna combinación.
- `pnpm exec vitest run --project unit --coverage`: cobertura de todo `src/ui`,
  hooks y utilidades, incluidos archivos nunca importados. Stories, tests y barrels
  no inflan el informe. La representación de familias se comprueba por separado.
- `pnpm typecheck`: contrato TypeScript.
- `pnpm build`: distribución JS, tipos y CSS Tailwind compilado.
- `pnpm storybook`: catálogo local en el puerto 6006.
- `pnpm build-storybook`: sitio estático en `storybook-static/`, listo para publicar en `ui.doscientos.es`.

Storybook genera documentación automática para todo el catálogo y ofrece temas
claro/oscuro y viewports móvil, tablet y escritorio. Chromatic está configurado para
claro/oscuro en escritorio/móvil. Para activar el job
visual de CI, configura `CHROMATIC_PROJECT_TOKEN` como secreto del repositorio;
el valor se consume mediante el entorno y nunca se pasa como argumento del CLI.

### Criterio de stories

Cada componente público debe tener una story propia. Cuando apliquen, incluye
estado por defecto, variantes, disabled o read-only, error, carga o vacío,
contenido largo y viewport estrecho. Los controles interactivos deben añadir
un flujo `play` que cubra su comportamiento principal con teclado y foco.

Las stories deben usar datos ficticios y permanecer independientes de rutas,
APIs, autenticación y estado de producto.

Los [tiers y el contrato de calidad](./DESIGN-GUIDELINES.md#tiers-qué-reutilizar-y-dónde)
definen cuándo usar foundations, primitives, composiciones y recetas. Axe detecta
problemas automatizables, no certifica accesibilidad completa. Antes de entregar
una web, revisa manualmente teclado, foco, zoom, contenido largo y lector de pantalla
con sus colores de marca reales.

## Criterio de crecimiento

Un componente entra cuando ya resuelve dos contextos reales o una necesidad transversal de accesibilidad. No se incorporan entidades de negocio, consultas, rutas ni variaciones visuales exclusivas de un cliente.

## Releases

Cada push directo a `main` valida el paquete, incrementa automáticamente la
versión de parche, crea el commit y tag `vX.Y.Z`, y publica ese artefacto en npm
con Trusted Publishing y provenance. No modifiques `version` manualmente.

Antes de activar este flujo, `modules/ui` debe vivir en su propio repositorio
GitHub y el publisher de npm debe vincular ese repositorio con
`.github/workflows/release.yml`. Los workflows ya están incluidos para que se
activen al trasladar el módulo a ese repositorio; no hace falta guardar un token
de npm en GitHub.

Proteged `main` para exigir CI. El commit de versión se realiza con
`github-actions[bot]` y el workflow lo ignora para evitar un ciclo de publicación.

## Licencia y crédito

Licencia propia [DAL v1.0](./LICENSE): uso gratuito, también comercial, instalando el paquete desde npm sin modificarlo, a cambio de dar crédito visible a Doscientos (por ejemplo: «Built with @doscientos/ui by Doscientos — https://doscientos.es»). No se permite modificar, redistribuir ni ofrecer el paquete como servicio. Las versiones publicadas antes bajo MIT siguen siendo MIT.
