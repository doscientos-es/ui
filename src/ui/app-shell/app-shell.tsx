import type * as React from "react";
import { cn } from "../../lib/cn";

export function AppShell({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="app-shell" className={cn("flex min-h-screen w-full bg-muted/30 text-foreground", className)} {...props} />;
}

export function AppShellMain({ className, ...props }: React.ComponentProps<"main">) {
  return <main data-slot="app-shell-main" className={cn("min-w-0 flex-1", className)} {...props} />;
}

export function AppShellHeader({ className, ...props }: React.ComponentProps<"header">) {
  return <header data-slot="app-shell-header" className={cn("sticky top-0 z-10 flex min-h-14 items-center border-b border-border bg-background/85 px-4 backdrop-blur-md supports-[backdrop-filter]:bg-background/70", className)} {...props} />;
}

export function AppShellContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="app-shell-content" className={cn("mx-auto w-full max-w-[1600px] p-4 md:p-6", className)} {...props} />;
}
