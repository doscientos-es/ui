import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "../../lib/cn";

export function EmptyState({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-state"
      className={cn(
        "flex min-h-44 w-full min-w-0 flex-1 flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-border p-6 text-center text-balance",
        className,
      )}
      {...props}
    />
  );
}

export function EmptyStateHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-state-header"
      className={cn("flex max-w-sm flex-col items-center gap-2", className)}
      {...props}
    />
  );
}

export const emptyStateMediaVariants = cva(
  "mb-2 flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        icon: "size-8 rounded-lg bg-muted text-foreground [&_svg:not([class*='size-'])]:size-4",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export function EmptyStateMedia({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof emptyStateMediaVariants>) {
  return (
    <div
      data-slot="empty-state-media"
      data-variant={variant}
      className={cn(emptyStateMediaVariants({ variant }), className)}
      {...props}
    />
  );
}

export function EmptyStateTitle({ className, ...props }: React.ComponentProps<"h3">) {
  return (
    <h3
      data-slot="empty-state-title"
      className={cn("text-sm font-medium tracking-tight text-foreground", className)}
      {...props}
    />
  );
}

export function EmptyStateDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="empty-state-description"
      className={cn(
        "max-w-sm text-sm/relaxed text-muted-foreground [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",
        className,
      )}
      {...props}
    />
  );
}

export function EmptyStateContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-state-content"
      className={cn(
        "flex w-full max-w-sm min-w-0 flex-col items-center gap-2.5 text-sm",
        className,
      )}
      {...props}
    />
  );
}
