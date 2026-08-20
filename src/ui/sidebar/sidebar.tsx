import {
	CaretLeftIcon,
	CaretRightIcon,
	DotsThreeIcon,
	MagnifyingGlassIcon,
} from "@phosphor-icons/react";
import {
	createContext,
	type ReactNode,
	useContext,
	useMemo,
	useState,
} from "react";
import { Link, type LinkProps } from "react-aria-components";
import { cn } from "../../lib/cn";
import { Button, type ButtonProps } from "../button/button";

type SidebarContextValue = {
	collapsed: boolean;
	setCollapsed: (value: boolean) => void;
	toggle: () => void;
};
const SidebarContext = createContext<SidebarContextValue | null>(null);

export function useSidebar() {
	const context = useContext(SidebarContext);
	if (!context)
		throw new Error("useSidebar must be used inside SidebarProvider");
	return context;
}

export function SidebarProvider({
	defaultCollapsed = false,
	children,
}: {
	defaultCollapsed?: boolean;
	children: ReactNode;
}) {
	const [collapsed, setCollapsed] = useState(defaultCollapsed);
	const value = useMemo(
		() => ({
			collapsed,
			setCollapsed,
			toggle: () => setCollapsed((current) => !current),
		}),
		[collapsed],
	);
	return (
		<SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
	);
}

export function Sidebar({
	className,
	...props
}: React.ComponentProps<"aside">) {
	const { collapsed } = useSidebar();
	return (
		<aside
			data-slot="sidebar"
			data-collapsed={collapsed || undefined}
			className={cn(
				"group/sidebar flex h-full w-56 shrink-0 flex-col border-r border-border bg-card text-foreground transition-[width] duration-200 ease-out motion-reduce:transition-none data-[collapsed]:w-16",
				className,
			)}
			{...props}
		/>
	);
}

export function SidebarHeader({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="sidebar-header"
			className={cn("flex items-center gap-2 px-4 py-5", className)}
			{...props}
		/>
	);
}

export function SidebarSearch({
	label = "Buscar…",
	shortcut = "⌘K",
	className,
	...props
}: React.ComponentProps<"button"> & { label?: string; shortcut?: string }) {
	return (
		<button
			type="button"
			data-slot="sidebar-search"
			className={cn(
				"group flex w-full items-center gap-2 rounded-md border border-border bg-background px-2.5 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
				className,
			)}
			{...props}
		>
			<MagnifyingGlassIcon className="size-4 shrink-0" />
			<span className="flex-1 text-left">{label}</span>
			<kbd className="rounded bg-secondary px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
				{shortcut}
			</kbd>
		</button>
	);
}

export function SidebarContent({
	className,
	...props
}: React.ComponentProps<"nav">) {
	return (
		<nav
			data-slot="sidebar-content"
			aria-label="Navegación principal"
			className={cn("min-h-0 flex-1 overflow-y-auto px-2 py-1", className)}
			{...props}
		/>
	);
}

export function SidebarFooter({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="sidebar-footer"
			className={cn(
				"mt-auto flex flex-col gap-2 border-t border-border p-2",
				className,
			)}
			{...props}
		/>
	);
}

export function SidebarGroup({
	label,
	className,
	children,
	...props
}: React.ComponentProps<"section"> & { label?: string }) {
	const { collapsed } = useSidebar();
	return (
		<section
			data-slot="sidebar-group"
			className={cn("mb-4 last:mb-0", className)}
			{...props}
		>
			{label && (
				<h2
					className={cn(
						"mb-1 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
						collapsed && "sr-only",
					)}
				>
					{label}
				</h2>
			)}
			{children}
		</section>
	);
}

export type SidebarItemProps = LinkProps & {
	icon?: ReactNode;
	active?: boolean;
	badge?: ReactNode;
	label?: string;
};
export function SidebarItem({
	icon,
	active,
	badge,
	label,
	children,
	className,
	...props
}: SidebarItemProps) {
	const { collapsed } = useSidebar();
	const content = typeof children === "function" ? label : (children ?? label);
	return (
		<Link
			data-slot="sidebar-item"
			aria-current={active ? "page" : undefined}
			aria-label={collapsed && label ? label : undefined}
			className={cn(
				"group/item relative flex min-h-9 items-center gap-2.5 rounded-md px-2.5 py-2 text-sm text-muted-foreground outline-none transition-[background-color,color,transform] duration-150 hover:bg-secondary/60 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40 data-[current=page]:bg-secondary data-[current=page]:font-medium data-[current=page]:text-foreground data-pressed:scale-[0.98] motion-reduce:transition-none",
				collapsed && "justify-center px-0",
				typeof className === "function" ? className : className,
			)}
			{...props}
		>
			{(values) => (
				<>
					<span className="flex size-4 shrink-0 items-center justify-center">
						{icon}
					</span>
					<span
						className={cn("min-w-0 flex-1 truncate", collapsed && "sr-only")}
					>
						{typeof children === "function" ? children(values) : content}
					</span>
					{badge && !collapsed && (
						<span className="text-xs text-muted-foreground">{badge}</span>
					)}
				</>
			)}
		</Link>
	);
}

export function SidebarSeparator({
	className,
	...props
}: React.ComponentProps<"hr">) {
	return (
		<hr
			data-slot="sidebar-separator"
			className={cn("my-2 h-px border-0 bg-border", className)}
			{...props}
		/>
	);
}

export function SidebarTrigger({ className, ...props }: ButtonProps) {
	const { collapsed, toggle } = useSidebar();
	return (
		<Button
			aria-label={collapsed ? "Expandir navegación" : "Colapsar navegación"}
			onPress={toggle}
			size="icon"
			variant="ghost"
			className={cn("ml-auto", className)}
			{...props}
		>
			{collapsed ? <CaretRightIcon /> : <CaretLeftIcon />}
		</Button>
	);
}

export function SidebarRail({
	className,
	...props
}: React.ComponentProps<"button">) {
	const { toggle } = useSidebar();
	return (
		<button
			type="button"
			aria-label="Alternar navegación"
			onClick={toggle}
			className={cn(
				"absolute inset-y-0 right-0 z-20 hidden w-1 -translate-x-1/2 cursor-ew-resize bg-transparent transition-colors hover:bg-border lg:block",
				className,
			)}
			{...props}
		/>
	);
}

export function SidebarMore({ className, ...props }: ButtonProps) {
	return (
		<Button
			aria-label="Más opciones"
			size="icon"
			variant="ghost"
			className={cn("size-7", className)}
			{...props}
		>
			<DotsThreeIcon weight="bold" />
		</Button>
	);
}
