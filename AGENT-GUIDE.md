# Guía rápida de @doscientos/ui

Usa `@doscientos/ui` y sus subpaths, no importes React Aria directamente. Consulta
el README y Storybook para la API completa; sigue `DESIGN-GUIDELINES.md` para el diseño.
La app conserva las consultas, persistencia, permisos, navegación y estados de datos.

## Elegir componentes

- Texto: `TextField` o `TextareaField` con `label`, `description` y `errorMessage`.
  `TextField` acepta `prefix` / `suffix` estáticos, por ejemplo `€` o `por hora`.
  `value` / `onChange` usan strings; atributos y refs son nativos.
- Búsqueda libre: `SearchField` con `label` o nombre accesible, `value` / `onChange`
  y botón de borrado. No filtra datos. Para retrasar consultas, usa `useDebouncedValue`
  en la app y controla carga, errores y respuestas obsoletas.
- Selección: `SelectField` para una opción sin búsqueda; `AutocompleteCombobox` para
  búsqueda con selección única y `MultiSelectCombobox` para selección múltiple. Usa
  `items`, `getItemKey` y `getItemLabel`. Controla selección con `value` / `onChange`
  y, en comboboxes, la búsqueda con `inputValue` / `onInputChange`.
- Los comboboxes usan fuzzy local por defecto. Para resultados de servidor o filtrados
  por la app, usa `filterMode="external"`: no filtra ni reordena los resultados.
- Tablas: `useDataTable` y `DataTable`; pasa `loading`, `emptyContent` y etiquetas
  según el estado real. Para composición propia usa `Table` y sus componentes.
- Formularios modales: `FormDialog` gestiona la superficie y el estado `isPending`;
  la app valida, guarda, muestra errores y cierra después de guardar correctamente.
- Acciones: `Button` y `SubmitButton` admiten `isPending` / `pendingLabel`. Usa
  `FormRow` o los componentes de bajo nivel solo cuando necesites composición especial.

## Comprobar antes de entregar

- Da nombres accesibles a los controles y a los botones con solo iconos; marca los
  iconos decorativos con `aria-hidden`. Mantén asociados ayuda y errores.
- Comprueba teclado, foco y estados vacío, carga, error y deshabilitado.
- Usa los ejemplos de Storybook en **Application / Recipes** como referencia, no como
  implementación de persistencia: sus datos son ficticios.
