import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../button/button'
import { MetricCard } from '../metric-card/metric-card'
import {
  SectionHeader,
  SectionHeaderActions,
  SectionHeaderHeading,
  SectionHeaderTitle,
} from '../page-header/page-header'
import {
  ActiveFilters,
  DataViewState,
  DataViewStateActions,
  DataViewStateDescription,
  DataViewStateTitle,
  DescriptionDetails,
  DescriptionItem,
  DescriptionList,
  DescriptionTerm,
  FilterBar,
  FilterChip,
  MetricGrid,
  SelectionToolbar,
} from './composition'

const meta = { title: 'Application/Composition patterns', tags: ['test:ui'] } satisfies Meta
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
export const DetailsAndMetrics: Story = {
  render: () => (
    <>
      <SectionHeader>
        <SectionHeaderHeading>
          <SectionHeaderTitle>Resumen del cliente</SectionHeaderTitle>
        </SectionHeaderHeading>
        <SectionHeaderActions>
          <Button size="sm">Editar</Button>
        </SectionHeaderActions>
      </SectionHeader>
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
      <MetricGrid className="mt-6">
        <MetricCard label="Ingresos" value="12.400 €" trend="up" delta="+12%" />
        <MetricCard label="Pendientes" value="3" tone="warning" />
      </MetricGrid>
    </>
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
