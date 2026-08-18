# @doscientos/ui

Primitives React accesibles, rápidas y temables para los productos de Doscientos. No depende de Next.js, Astro, router, backend ni estado de datos.

## Alcance de la primera versión

- Tokens CSS del backoffice y tema claro/oscuro.
- Controles: botón, input, textarea, label, badge y skeleton.
- Formularios: `Field`, descripción y errores accesibles.
- Overlays: `Dialog` y `ConfirmDialog` controlado.
- Búsqueda: `Combobox` composable sobre React Aria y `HighlightMatch` sin distinción de mayúsculas o acentos.
- Hooks: debounce, cambios no guardados y autosave sin acoplamiento a transporte o datos.

Los componentes de dominio, llamadas API, navegación, toasts y layouts permanecen en cada aplicación.

La única foundation de comportamiento interactivo es `react-aria-components`.
Los consumidores importan exclusivamente `@doscientos/ui`: React Aria queda
encapsulado para que las APIs, tokens y accesibilidad sean consistentes.

## Uso en una aplicación React con Tailwind v4

Instala el paquete y React como dependencia de tu aplicación. Después, importa una sola vez los estilos compilados en el punto de entrada CSS.

```css
@import "tailwindcss";
@import "@doscientos/ui/styles.css";
```

```tsx
import { Button, Field, FieldLabel, Input } from "@doscientos/ui";

export function ProfileName() {
  return <Field><FieldLabel htmlFor="name">Nombre</FieldLabel><Input id="name" /><Button>Guardar</Button></Field>;
}
```

Los proyectos pueden definir los tokens semánticos en `:root` o `.dark` para aplicar la marca del cliente; no deben modificar los componentes. `@doscientos/ui` no sobrescribe esos tokens y usa los valores del tema del backoffice como fallback cuando falte alguno.

## Sugerencias y autocompletado

El combobox es composable: la aplicación controla datos, peticiones y caché; la UI resuelve el teclado, foco, filtrado, popup y selección accesible. `HighlightMatch` mantiene el texto original y encuentra coincidencias aunque cambien mayúsculas o acentos.

```tsx
<Combobox items={clients} inputValue={query} onInputChange={setQuery}>
  <ComboboxInput placeholder="Busca un cliente…" />
  <ComboboxContent>
    <ComboboxList emptyState="Sin resultados.">{(client) => <ComboboxItem
      id={client.id} textValue={client.name}>
      <HighlightMatch text={client.name} query={query} />
    </ComboboxItem>}</ComboboxList>
  </ComboboxContent>
</Combobox>
```

## Desarrollo

- `pnpm test`: pruebas unitarias y de renderizado.
- `pnpm typecheck`: contrato TypeScript.
- `pnpm build`: distribución JS, tipos y CSS Tailwind compilado.
- `pnpm storybook`: catálogo local en el puerto 6006.
- `pnpm build-storybook`: sitio estático en `storybook-static/`, listo para publicar en `ui.doscientos.es`.

## Criterio de crecimiento

Un componente entra cuando ya resuelve dos contextos reales o una necesidad transversal de accesibilidad. No se incorporan entidades de negocio, consultas, rutas ni variaciones visuales exclusivas de un cliente.

## Releases

Este paquete usa **Release Please** y Conventional Commits. Los PRs requieren
un título como `feat(ui): add command menu` o `fix: prevent focus loss` y deben
fusionarse con *squash merge* conservando ese título. Release Please abrirá un
PR con la versión y `CHANGELOG.md`; al fusionarlo, crea el tag, GitHub Release y
publica el paquete con npm Trusted Publishing y provenance.

Antes de activar este flujo, `modules/ui` debe vivir en su propio repositorio
GitHub y el publisher de npm debe vincular ese repositorio con
`.github/workflows/release.yml`. Los workflows ya están incluidos para que se
activen al trasladar el módulo a ese repositorio; no hace falta guardar un token
de npm en GitHub.

Proteged `main` para exigir CI y el check de título convencional, y permitid
solo *squash merge*: así el título validado se conserva como el commit que
Release Please analiza.
