import type * as React from "react";
import { cn } from "../lib/cn";

export function EmptyState({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="empty-state" className={cn("flex min-h-44 w-full flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border p-6 text-center", className)} {...props} />;
}

export function EmptyStateTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return <h3 data-slot="empty-state-title" className={cn("text-sm font-medium text-foreground", className)} {...props} />;
}

export function EmptyStateDescription({ className, ...props }: React.ComponentProps<"p">) {
  return <p data-slot="empty-state-description" className={cn("max-w-sm text-sm text-muted-foreground", className)} {...props} />;
}