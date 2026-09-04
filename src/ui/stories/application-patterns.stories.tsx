import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../button/button'
import {
  DataViewState,
  DataViewStateActions,
  DataViewStateDescription,
  DataViewStateTitle,
} from '../data-view-state/data-view-state'
import {
  DescriptionDetails,
  DescriptionItem,
  DescriptionList,
  DescriptionTerm,
} from '../description-list/description-list'
import { ActiveFilters, FilterBar, FilterChip } from '../filter-bar/filter-bar'
import { MetricGrid } from '../metric-grid/metric-grid'
import { SelectionToolbar } from '../selection-toolbar/selection-toolbar'

const meta = { title: 'Application/Patterns', tags: ['test:ui'] } satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const FiltersAndSelection: Story = {
  render: () => (
    <>
      <FilterBar>
        <ActiveFilters>
          <FilterChip onRemove={() => undefined}>Estado: activo</FilterChip>
          <FilterChip onRemove={() => undefined}>Madrid</FilterChip>
        </ActiveFilters>
        <Button variant="ghost" size="sm">
          Limpiar
        </Button>
      </FilterBar>
      <SelectionToolbar count={3}>
        <Button size="sm">Asignar</Button>
        <Button size="sm" variant="destructive">
          Eliminar
        </Button>
      </SelectionToolbar>
    </>
  ),
}

export const Details: Story = {
  render: () => (
    <>
      <h2 className="text-base font-semibold">Resumen del cliente</h2>
      <DescriptionList className="mt-4">
        <DescriptionItem>
          <DescriptionTerm>Email</DescriptionTerm>
          <DescriptionDetails>ana@example.com</DescriptionDetails>
        </DescriptionItem>
        <DescriptionItem>
          <DescriptionTerm>Plan</DescriptionTerm>
          <DescriptionDetails>Professional</DescriptionDetails>
        </DescriptionItem>
      </DescriptionList>
    </>
  ),
}

export const Metrics: Story = {
  render: () => (
    <MetricGrid>
      <div className="rounded-lg border p-4">Ingresos: 12.400 €</div>
      <div className="rounded-lg border p-4">Pendientes: 3</div>
    </MetricGrid>
  ),
}

export const EmptyDataView: Story = {
  render: () => (
    <DataViewState>
      <DataViewStateTitle>Sin resultados</DataViewStateTitle>
      <DataViewStateDescription>
        Ajusta los filtros o crea el primer registro.
      </DataViewStateDescription>
      <DataViewStateActions>
        <Button>Crear registro</Button>
      </DataViewStateActions>
    </DataViewState>
  ),
}
