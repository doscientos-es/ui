import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import {
  KanbanColumn,
  KanbanColumnBody,
  KanbanColumnHeader,
  KanbanColumnTitle,
  KanbanEmpty,
  KanbanViewport,
} from './kanban'

describe('Kanban', () => {
  it('composes a horizontally scrollable column with its semantic slots', () => {
    render(
      <KanbanViewport aria-label="Tablero de tareas" contentClassName="gap-4">
        <KanbanColumn aria-labelledby="todo-title" size="wide">
          <KanbanColumnHeader>
            <KanbanColumnTitle id="todo-title">Por hacer</KanbanColumnTitle>
            <span>2</span>
          </KanbanColumnHeader>
          <KanbanColumnBody>
            <KanbanEmpty>Sin tareas</KanbanEmpty>
          </KanbanColumnBody>
        </KanbanColumn>
      </KanbanViewport>,
    )

    expect(screen.getByLabelText('Tablero de tareas').getAttribute('data-slot')).toBe(
      'kanban-viewport',
    )
    expect(
      screen
        .getByText('Por hacer')
        .closest('[data-slot="kanban-column"]')
        ?.getAttribute('data-size'),
    ).toBe('wide')
    expect(screen.getByText('Por hacer').getAttribute('data-slot')).toBe('kanban-column-title')
    expect(screen.getByText('Sin tareas').getAttribute('data-slot')).toBe('kanban-empty')
  })

  it('marks compact columns and empty states for styling hooks', () => {
    render(
      <KanbanColumn size="compact">
        <KanbanEmpty compact>Sin resultados</KanbanEmpty>
      </KanbanColumn>,
    )

    expect(screen.getByText('Sin resultados').getAttribute('data-compact')).toBe('true')
    expect(screen.getByText('Sin resultados').parentElement?.getAttribute('data-size')).toBe(
      'compact',
    )
  })
})
