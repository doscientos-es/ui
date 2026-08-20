import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

export type AlertProps = React.ComponentProps<"div"> & { variant?: "default" | "destructive" | "success" | "warning" };

const variants = {
  default: "border-border bg-card text-foreground",
  destructive: "border-destructive/30 bg-destructive/5 text-destructive",
  success: "border-success/30 bg-success/5 text-success",
  warning: "border-warning/30 bg-warning/5 text-warning",
};

export function Alert({ className, variant = "default", ...props }: AlertProps) {
  return <div role="alert" data-slot="alert" data-variant={variant} className={cn("grid w-full gap-1 rounded-lg border px-3 py-2.5 text-sm [&>svg]:size-4", variants[variant], className)} {...props} />;
}

export function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="alert-title" className={cn("font-medium", className)} {...props} />;
}

export function AlertDescription({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="alert-description" className={cn("text-sm opacity-90", className)} {...props} />;
}

export function AlertAction({ className, children, ...props }: React.ComponentProps<"div"> & { children?: ReactNode }) {
  return <div data-slot="alert-action" className={cn("absolute top-2 right-2", className)} {...props}>{children}</div>;
}
