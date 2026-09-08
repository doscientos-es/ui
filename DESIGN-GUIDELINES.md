# Doscientos UI — Brand book & design guidelines

## Qué debe sentirse

Doscientos crea software operativo premium: calmado, preciso, humano y con criterio. La interfaz debe parecer una herramienta que un equipo puede usar muchas horas sin fatiga. El lujo no viene de añadir decoración; viene de quitar ruido, ordenar la información y hacer que cada estado sea obvio.

Palabras guía: **quiet confidence**, aireado, editorial, táctil, útil, cálido, preciso.

No buscamos una copia literal de una referencia concreta. Buscamos el mismo lenguaje de producto: canvas suave, superficies limpias, jerarquía tipográfica, navegación agrupada, color funcional y datos presentados con generosidad.

## Principios

1. **Una decisión por superficie.** Cada card, panel o drawer debe tener un propósito reconocible.
2. **Jerarquía antes que ornamentación.** El tamaño, el peso, el espacio y la posición explican qué importa.
3. **Densidad cómoda.** Preferir menos elementos visibles y más espacio entre grupos; usar tablas y listas compactas solo cuando la tarea lo exige.
4. **Color con significado.** El color comunica estado, categoría o acción. Nunca se usa para rellenar.
5. **Feedback que acompaña.** Toda acción tiene un estado visible: hover, focus, pending, success o error.
6. **Composición, no personalización arbitraria.** Las apps deben componer primitives del paquete y reservar las clases ad hoc para el layout de dominio.

## Sistema visual

### Canvas y superficies

- Canvas por defecto: gris cálido muy claro (`#f7f7f5`), nunca blanco puro a pantalla completa.
- En layouts enmarcados, `--canvas` es la capa exterior y `--background` el lienzo de trabajo; no resolver ambas con el mismo color.
- Surface primaria: blanco (`--card`) sobre canvas.
- `--sidebar` y `--surface-subtle` separan navegación, toolbars y footers sin introducir nuevas elevaciones.
- Border: gris muy claro, 1px, bajo contraste.
- Elevación: sombra difusa y corta. Nada de sombras negras duras.
- Radios: `0.75rem` base; `1rem–1.25rem` para cards, drawers y paneles principales.
- Una pantalla debe tener como máximo tres niveles de elevación: canvas, surface, floating.

### Tipografía

- Usar Inter, Geist o una sans humanista equivalente; no mezclar familias salvo una decisión de marca explícita.
- Títulos de página: 30–36px, semibold, tracking ligeramente negativo.
- Títulos de sección: 16–20px, semibold.
- Texto de producto: 14–16px.
- Metadatos y labels: 11–13px, muted; labels de grupo pueden usar uppercase con tracking amplio.
- Números y KPIs: grandes, semibold y con tracking negativo; alinear cifras por la derecha en comparativas.
- No usar más de tres pesos tipográficos en una vista.

### Color

La paleta semántica es la API. Las aplicaciones pueden cambiar el valor de los tokens, pero no deben inventar colores directamente en cada componente.

- `primary`: acción principal y navegación activa.
- `accent`: detalle de marca o llamada secundaria.
- `success`, `warning`, `destructive`, `info`: estados y feedback.
- `muted-foreground`: metadatos, ayudas y contexto.
- Para métricas, elegir un color por categoría y repetirlo consistentemente en icono, leyenda y visualización.
- Mantener contraste AA; el muted no debe usarse para información necesaria para completar una tarea.

### Iconografía

Usar iconos lineales, simples y de peso uniforme. Un icono no sustituye el texto cuando la acción no es universalmente reconocible. Tamaños recomendados: 16px en navegación, 18–20px en acciones, 20–24px en estados vacíos.

## Layout y navegación

- Shell de escritorio: sidebar persistente de aproximadamente 248px y contenido flexible.
- Sidebar: marca arriba, navegación agrupada en secciones, ajustes y ayuda abajo.
- Sidebar tipo workspace: puede añadir búsqueda bajo la marca, favoritos o registros en grupos separados, utilidades antes del footer y perfil fijado al fondo. Usa `AppShellSidebarHeader`, `AppShellSidebarContent` y `AppShellSidebarFooter` para heredar esta composición.
- Navegación activa: surface secundaria suave, radio amplio, texto foreground; evitar pills completamente redondas.
- Header: 56–64px, sticky cuando el contenido lo necesite, fondo translúcido y borde tenue.
- Contenido: max-width amplio (`80rem–100rem`) y padding 24–32px en desktop.
- Página: `PageHeader` → contexto/acciones → primer bloque de trabajo; no empezar con una pared de controles.
- En móvil, conservar la jerarquía y convertir la navegación en patrón mobile; no simplemente comprimir la sidebar.
- Para el patrón de las referencias, componer `SidebarProvider` → `AppShell variant="inset"` → `Sidebar` + `AppShellMain`; usar `AppShellHeaderContext/Actions` y `PageStack` para que la geometría quede resuelta por el paquete.

## Patrones de datos

- KPI: nombre corto, valor dominante, comparación y contexto temporal.
- `MetricCard` reserva `visual` para una sparkline o strip pequeño y `footer` para contexto; no convertir el KPI en una mini página.
- Cards: una idea principal; evitar cards anidadas salvo que representen una relación clara.
- Tablas: encabezados discretos, filas con altura cómoda, alineación numérica consistente y estados vacíos explícitos.
- Gráficas: una serie principal fuerte, series de comparación apagadas, gridlines muy suaves y tooltips informativos.
- Actividad: timestamp corto, evento, contexto y estado; separar grupos con líneas tenues.
- Kanban: encabezado de columna, contador, cards escaneables y acciones de contexto en hover/focus.
- En paneles mixtos, usar `CardToolbar` y `Table density="compact"`; la densidad se decide una vez en el contenedor, no celda a celda.

## Estados, interacción y motion

- Hover: elevar contraste o cambiar superficie; no mover el layout.
- Focus: siempre visible y con `ring` semántico.
- Pending: mantener el contexto y deshabilitar solo la acción afectada.
- Empty: explicar qué falta y ofrecer una acción principal.
- Error: explicar impacto y siguiente paso; evitar mensajes técnicos sin traducción.
- Motion: 100–200ms para superficies y controles, easing suave, sin rebotes. Respetar `prefers-reduced-motion`.

## Copy

Escribir como un compañero experto: breve, directo y específico. Preferir “Aún no hay reservas” a “No se encontraron registros”. Las acciones empiezan con verbo: “Crear reserva”, “Ver facturas”, “Reintentar”. Evitar mayúsculas decorativas y frases genéricas como “Haz clic aquí”.

## Accesibilidad y calidad

- Cada vista debe funcionar con teclado y tener foco visible.
- Los iconos decorativos llevan `aria-hidden`; los iconos accionables tienen nombre accesible.
- No comunicar estado solo con color.
- Probar contenido largo, zoom, viewport estrecho, loading, error y empty.
- Cada primitive pública necesita story con estado base y, cuando aplique, estados interactivos.

## Checklist para agentes y Augment

Antes de crear una UI, responder: ¿cuál es la tarea principal?, ¿qué información debe dominar?, ¿qué puede desaparecer?, ¿qué estado verá el usuario después de actuar?

Implementar siguiendo este orden:

1. Usar tokens semánticos, `AppShell`, `PageHeader`, `Card`, `MetricCard`, `Table`, `DataViewState` y primitives existentes.
2. Resolver jerarquía con espacio y tipografía antes de añadir color.
3. Agrupar navegación y controles por intención.
4. Añadir color solo para estado, categoría o acción.
5. Verificar responsive, keyboard focus, loading, empty y error.
6. Si un patrón aparece en dos productos, abstraerlo en `@doscientos/ui`; si conoce entidades, rutas o API, debe quedarse en la app.

## Qué queda fuera del paquete

Branding específico de cada cliente, copy de negocio, iconos de dominio, gráficos acoplados a una métrica concreta, layouts de una sola aplicación, routing, fetching, permisos y lógica de estado.
