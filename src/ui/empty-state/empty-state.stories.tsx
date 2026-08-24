import type { Meta, StoryObj } from "@storybook/react-vite";
import { SearchX } from "lucide-react";
import { Button } from "../button/button";
import {
  EmptyState,
  EmptyStateContent,
  EmptyStateDescription,
  EmptyStateHeader,
  EmptyStateMedia,
  EmptyStateTitle,
} from "./empty-state";

const meta = {
  title: "Components/Feedback/Empty State",
  component: EmptyState,
  tags: ["test:ui"],
} satisfies Meta<typeof EmptyState>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <EmptyState className="w-96">
      <EmptyStateHeader>
        <EmptyStateMedia variant="icon">
          <SearchX />
        </EmptyStateMedia>
        <EmptyStateTitle>No hay facturas</EmptyStateTitle>
        <EmptyStateDescription>
          Crea la primera factura o modifica los filtros de búsqueda.
        </EmptyStateDescription>
      </EmptyStateHeader>
      <EmptyStateContent>
        <Button>Nueva factura</Button>
      </EmptyStateContent>
    </EmptyState>
  ),
};
