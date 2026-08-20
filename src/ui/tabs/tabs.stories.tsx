import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tabs, TabsContent, TabsList, TabsPanels, TabsTrigger } from "./tabs";

const meta = { title: "Components/Navigation/Tabs", component: Tabs } satisfies Meta<typeof Tabs>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Tabs defaultSelectedKey="summary" className="w-96"><TabsList aria-label="Vista de proyecto"><TabsTrigger id="summary">Resumen</TabsTrigger><TabsTrigger id="activity">Actividad</TabsTrigger></TabsList><TabsPanels><TabsContent id="summary">El proyecto está activo y actualizado hoy.</TabsContent><TabsContent id="activity">No hay cambios pendientes.</TabsContent></TabsPanels></Tabs>,
};
