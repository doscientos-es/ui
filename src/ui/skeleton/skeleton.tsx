import type * as React from "react";
import { cn } from "../lib/cn";

export function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return <div aria-hidden="true" data-slot="skeleton" className={cn("animate-pulse rounded-md bg-muted", className)} {...props} />;
}