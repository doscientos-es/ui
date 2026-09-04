import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

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

describe('application patterns', () => {
  it('preserves filter, selection, detail, state and metric semantics', () => {
    render(
      <>
        <FilterBar>
          <ActiveFilters>
            <FilterChip onRemove={() => undefined}>Estado: activo</FilterChip>
          </ActiveFilters>
        </FilterBar>
        <SelectionToolbar count={2}>Acciones</SelectionToolbar>
        <DescriptionList>
          <DescriptionItem>
            <DescriptionTerm>Cliente</DescriptionTerm>
            <DescriptionDetails>Acme</DescriptionDetails>
          </DescriptionItem>
        </DescriptionList>
        <DataViewState>
          <DataViewStateTitle>Sin resultados</DataViewStateTitle>
          <DataViewStateDescription>Ajusta los filtros.</DataViewStateDescription>
          <DataViewStateActions>Crear</DataViewStateActions>
        </DataViewState>
        <MetricGrid>Contenido</MetricGrid>
      </>,
    )

    expect(screen.getByLabelText('Filtros activos')).not.toBeNull()
    expect(screen.getByRole('status').textContent).toContain('2 seleccionados')
    expect(screen.getByText('Cliente').tagName).toBe('DT')
    expect(screen.getByRole('heading', { name: 'Sin resultados' })).toBeTruthy()
    expect(screen.getByText('Contenido').closest('[data-slot="metric-grid"]')).not.toBeNull()
  })
})
