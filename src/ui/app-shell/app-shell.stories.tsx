import type { Meta, StoryObj } from "@storybook/react-vite";
import { AppShell, AppShellContent, AppShellHeader, AppShellMain } from "./app-shell";
const meta = { title: "Application/AppShell", component: AppShell, parameters: { layout: "fullscreen" } } satisfies Meta<typeof AppShell>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = { render: () => <AppShell><AppShellMain><AppShellHeader><strong>Clientes</strong></AppShellHeader><AppShellContent><div className="rounded-xl border border-border bg-background p-6 shadow-sm"><h1 className="text-lg font-semibold">Overview</h1><p className="mt-1 text-sm text-muted-foreground">Contenido de la aplicación.</p></div></AppShellContent></AppShellMain></AppShell> };
