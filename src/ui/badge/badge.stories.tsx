import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge, BadgeLink } from "./badge";

const meta = {
  title: "Components/Data Display/Badge",
  component: Badge,
  tags: ["test:ui"],
  args: { children: "Badge" },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "secondary",
        "neutral",
        "success",
        "warning",
        "info",
        "danger",
        "destructive",
        "outline",
        "ghost",
        "link",
      ],
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Statuses: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="success">Pagada</Badge>
      <Badge variant="warning">Pendiente</Badge>
      <Badge variant="info">Borrador</Badge>
      <Badge variant="danger">Vencida</Badge>
      <Badge variant="neutral">Archivada</Badge>
    </div>
  ),
};
export const AsLink: Story = {
  render: () => (
    <BadgeLink href="#invoices" variant="outline">
      3 facturas pendientes
    </BadgeLink>
  ),
};
