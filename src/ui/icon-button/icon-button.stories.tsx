import {
  Download,
  Mail,
  Settings,
} from "lucide-react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { IconButton } from "./icon-button";

const meta = {
  title: "Application/IconButton",
  component: IconButton,
} satisfies Meta<typeof IconButton>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: "Acción" },
  render: () => (
    <div className="flex items-center gap-2">
      <IconButton label="Descargar PDF" variant="outline">
        <DownloadSimpleIcon />
      </IconButton>
      <IconButton label="Enviar email" variant="outline">
        <EnvelopeSimpleIcon />
      </IconButton>
      <IconButton label="Ajustes" variant="ghost">
        <GearIcon />
      </IconButton>
    </div>
  ),
};
