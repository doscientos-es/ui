import type * as React from "react";
import { cn } from "../../lib/cn";

export type AppShellBreakpoint = "sm" | "md" | "lg";

export type AppShellProps = React.ComponentProps<"div"> & {
  /** Breakpoint at which the persistent sidebar replaces the mobile header. */
  sidebarBreakpoint?: AppShellBreakpoint;
};

/** Application layout foundation for a responsive sidebar, header and content area. */
export function AppShell({
  className,
  sidebarBreakpoint = "md",
  ...props
}: AppShellProps) {
  return (
    <div
      data-slot="app-shell"
      data-sidebar-breakpoint={sidebarBreakpoint}
      className={cn("bg-background text-foreground", className)}
      {...props}
    />
  );
}

export function AppShellSidebar({ className, ...props }: React.ComponentProps<"aside">) {
  return (
    <aside
      data-slot="app-shell-sidebar"
      className={cn("w-56 shrink-0 border-r border-border bg-card text-foreground", className)}
      {...props}
    />
  );
}

export function AppShellMain({ className, ...props }: React.ComponentProps<"main">) {
  return <main data-slot="app-shell-main" className={cn("bg-background", className)} {...props} />;
}

export function AppShellHeader({ className, ...props }: React.ComponentProps<"header">) {
  return (
    <header
      data-slot="app-shell-header"
      className={cn("border-b border-border bg-background px-4", className)}
      {...props}
    />
  );
}

export function AppShellMobileHeader({
  className,
  ...props
}: React.ComponentProps<"header">) {
  return (
    <header
      data-slot="app-shell-mobile-header"
      className={cn("h-14 shrink-0 items-center gap-2 border-b border-border bg-background px-3", className)}
      {...props}
    />
  );
}

export type AppShellContentProps = React.ComponentProps<"div"> & {
  /** Maximum content width. Use `full` for dense application screens. */
  size?: "default" | "wide" | "full";
  /** Adds the standard responsive content padding. */
  padded?: boolean;
  /** Lets this region scroll while the surrounding shell remains fixed. */
  scrollable?: boolean;
};

export function AppShellContent({
  className,
  size = "wide",
  padded = true,
  scrollable = true,
  ...props
}: AppShellContentProps) {
  return (
    <div
      data-slot="app-shell-content"
      data-size={size}
      data-padded={padded || undefined}
      data-scrollable={scrollable || undefined}
      className={className}
      {...props}
    />
  );
}
