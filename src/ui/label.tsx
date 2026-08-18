import type * as React from "react";
import { Label as LabelPrimitive } from "react-aria-components";
import { cn } from "../lib/cn";

export function Label({ className, ...props }: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return <LabelPrimitive.Root data-slot="label" className={cn("flex items-center gap-2 text-sm font-medium leading-none select-none", className)} {...props} />;
}
