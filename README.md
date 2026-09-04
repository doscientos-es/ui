# @doscientos/ui

Primitives React accesibles, rápidas y temables para los productos de Doscientos. No depende de Next.js, Astro, router, backend ni estado de datos.

## Alcance

- Foundations: tokens CSS, tema claro/oscuro y utilidades de clases y texto.
- Controles y formularios: botones, campos, selección, feedback, búsqueda y validación accesible.
- Navegación y overlays: tabs, menús, breadcrumbs, tooltip, popover, dialogs y drawers.
- Datos y estados: tablas, cards, avatares, badges, skeletons, alertas y estados vacíos.
- Patrones de aplicación: shell, sidebar, cabeceras, toolbars, paginación, toasts y carga.
- Hooks: debounce, cambios no guardados y autosave sin acoplamiento a transporte o datos.

Los componentes de dominio, llamadas API, navegación, toasts y layouts permanecen en cada aplicación.

La única foundation de comportamiento interactivo es `react-aria-components`.
Los consumidores importan exclusivamente `@doscientos/ui`: React Aria queda
encapsulado para que las APIs, tokens y accesibilidad sean consistentes.

## Uso en una aplicación React con Tailwind v4

Instala el paquete y React como dependencia de tu aplicación. Después, importa una sola vez los estilos compilados en el punto de entrada CSS.

```css
@import 'tailwindcss';
@import '@doscientos/ui/styles.css';
```

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

Los proyectos pueden definir los tokens semánticos en `:root` o `.dark` para aplicar la marca del cliente; no deben modificar los componentes. `@doscientos/ui` no sobrescribe esos tokens y usa los valores del tema del backoffice como fallback cuando falte alguno.

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
- `DetailDrawer`: marco de drawer para fichas; añade `DetailDrawerHeader`, `DetailDrawerBody` y `DetailDrawerFooter`.
- `SectionHeader`: cabecera de panel con heading y acciones; `PageHeader` se reserva para el `h1` de una página.
- `MetricGrid` y `MetricCard`: grid responsive de KPIs. `MetricCard` admite `loading`, `loadingLabel`, `trend` y `delta`.

## Estado asíncrono, errores y copia

- `useAsyncAction(action)` evita dobles ejecuciones mientras está pendiente y devuelve `run`, `status`, `isPending`, `data`, `error` y `reset`.
- `ErrorBoundary` aporta fallback recuperable, `resetKeys` y `onError`; `AsyncBoundary` combina error boundary con `Suspense`.
- `ErrorState` es el fallback visual componible. La aplicación inyecta su acción de reintento, no el paquete.
- `useClipboard` y `CopyButton` resuelven copia, feedback y errores sin acoplarse a Sileo; usa `onCopied` u `onCopyError` para analytics/toasts de producto.

## Query params sin router

`toSearchParams`, `updateSearchParams`, `readSearchParam`, `readSearchParamArray`, `readSearchParamInt` y `readSearchParamEnum` son funciones puras. Úsalas con el router de cada app:

```ts
const next = updateSearchParams(searchParams, { page: 1, status: ['active'], q: query })
router.replace(`?${next}`)
```

No añadas hooks de Next, React Router ni TanStack Router al paquete. Las stories documentan componentes visuales; los hooks y utilidades puras se documentan aquí y se cubren con pruebas unitarias.

## Desarrollo

- `pnpm test`: pruebas unitarias y de renderizado.
- `pnpm test:storybook`: renderizado, accesibilidad e interacciones de todas las stories en Chromium.
- `pnpm typecheck`: contrato TypeScript.
- `pnpm build`: distribución JS, tipos y CSS Tailwind compilado.
- `pnpm storybook`: catálogo local en el puerto 6006.
- `pnpm build-storybook`: sitio estático en `storybook-static/`, listo para publicar en `ui.doscientos.es`.

Storybook genera documentación automática para todo el catálogo y ofrece temas
claro/oscuro y viewports móvil, tablet y escritorio. Chromatic captura cada
story en claro escritorio, oscuro escritorio y claro móvil. Para activar el job
visual de CI, configura `CHROMATIC_PROJECT_TOKEN` como secreto del repositorio;
el valor se consume mediante el entorno y nunca se pasa como argumento del CLI.

### Criterio de stories

Cada componente público debe tener una story propia. Cuando apliquen, incluye
estado por defecto, variantes, disabled o read-only, error, carga o vacío,
contenido largo y viewport estrecho. Los controles interactivos deben añadir
un flujo `play` que cubra su comportamiento principal con teclado y foco.

Las stories deben usar datos ficticios y permanecer independientes de rutas,
APIs, autenticación y estado de producto.

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
