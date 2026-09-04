import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import {
  ActiveFilters,
  DescriptionDetails,
  DescriptionItem,
  DescriptionList,
  DescriptionTerm,
  FilterBar,
  FilterChip,
  SelectionToolbar,
} from './composition'

describe('composition primitives', () => {
  it('preserves filter, selection and description semantics', () => {
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
      </>,
    )
    expect(screen.getByLabelText('Filtros activos')).not.toBeNull()
    expect(screen.getByRole('status').textContent).toContain('2 seleccionados')
    expect(screen.getByText('Cliente').tagName).toBe('DT')
  })
})
