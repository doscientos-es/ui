import type { Meta, StoryObj } from "@storybook/react-vite";
import { Activity } from "lucide-react";

import { MetricCard } from "./metric-card";

const meta = {
  title: "Components/Data Display/MetricCard",
  component: MetricCard,
  tags: ["test:ui"],
  args: {
    label: "Solicitudes activas",
    value: "24",
    description: "Actualizado hace un momento",
    icon: <Activity aria-hidden="true" />,
  },
} satisfies Meta<typeof MetricCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Warning: Story = {
  args: {
    label: "Revisiones pendientes",
    value: "3",
    tone: "warning",
  },
};