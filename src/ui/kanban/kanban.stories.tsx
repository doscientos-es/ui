import type { Meta, StoryObj } from '@storybook/react-vite'

import {
  KanbanColumn,
  KanbanColumnBody,
  KanbanColumnHeader,
  KanbanColumnTitle,
  KanbanEmpty,
  KanbanViewport,
} from './kanban'

const meta = {
  title: 'Application/Kanban',
  component: KanbanViewport,
  tags: ['test:ui'],
} satisfies Meta<typeof KanbanViewport>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <KanbanViewport aria-label="Tablero de ejemplo">
      {['Por hacer', 'En curso', 'Hecho'].map((title, index) => (
        <KanbanColumn key={title} className="bg-muted/70">
          <KanbanColumnHeader>
            <KanbanColumnTitle>{title}</KanbanColumnTitle>
            <span className="text-muted-foreground text-xs">{index + 1}</span>
          </KanbanColumnHeader>
          <KanbanColumnBody>
            {index === 1 ? (
              <KanbanEmpty>Sin elementos</KanbanEmpty>
            ) : (
              <div className="border-border bg-card rounded-md border p-3 text-sm">
                Tarjeta ejemplo
              </div>
            )}
          </KanbanColumnBody>
        </KanbanColumn>
      ))}
    </KanbanViewport>
  ),
}
