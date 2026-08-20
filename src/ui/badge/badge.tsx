import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "../lib/cn";

export const badgeVariants = cva("inline-flex w-fit items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium", {
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground",
      secondary: "bg-secondary text-secondary-foreground",
      neutral: "bg-muted text-muted-foreground",
      success: "bg-success/10 text-success",
      warning: "bg-warning/10 text-warning",
      destructive: "bg-destructive/10 text-destructive",
      outline: "border border-border text-foreground",
    },
  },
  defaultVariants: { variant: "default" },
});

export type BadgeProps = React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>;

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />;
}
