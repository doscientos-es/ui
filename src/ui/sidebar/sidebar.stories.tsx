import { GearIcon, HouseIcon, UsersThreeIcon } from "@phosphor-icons/react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarHeader,
	SidebarItem,
	SidebarProvider,
	SidebarSearch,
	SidebarTrigger,
} from "./sidebar";

const meta = {
	title: "Application/Sidebar",
	component: Sidebar,
	parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Sidebar>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => (
		<div className="flex h-[520px]">
			<SidebarProvider>
				<Sidebar>
					<SidebarHeader>
						<strong className="truncate text-sm">Doscientos</strong>
						<SidebarTrigger />
					</SidebarHeader>
					<div className="px-2 pb-2">
						<SidebarSearch />
					</div>
					<SidebarContent>
						<SidebarGroup label="Workspace">
							<SidebarItem
								href="#"
								icon={<HouseIcon />}
								label="Inicio"
								active
							/>
							<SidebarItem
								href="#"
								icon={<UsersThreeIcon />}
								label="Clientes"
								badge="12"
							/>
						</SidebarGroup>
						<SidebarGroup label="Sistema">
							<SidebarItem href="#" icon={<GearIcon />} label="Configuración" />
						</SidebarGroup>
					</SidebarContent>
					<SidebarFooter>
						<SidebarItem href="#" label="Ayuda" />
					</SidebarFooter>
				</Sidebar>
			</SidebarProvider>
		</div>
	),
};

export const Collapsed: Story = {
	render: () => (
		<div className="flex h-[520px]">
			<SidebarProvider defaultCollapsed>
				<Sidebar>
					<SidebarHeader>
						<strong className="sr-only">Doscientos</strong>
						<SidebarTrigger />
					</SidebarHeader>
					<SidebarContent>
						<SidebarGroup>
							<SidebarItem
								href="#"
								icon={<HouseIcon />}
								label="Inicio"
								active
							/>
							<SidebarItem
								href="#"
								icon={<UsersThreeIcon />}
								label="Clientes"
							/>
						</SidebarGroup>
					</SidebarContent>
				</Sidebar>
			</SidebarProvider>
		</div>
	),
};
