import type * as React from "react";
import { cn } from "../../lib/cn";
import { Label } from "../label/label";

export function Field({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="field" className={cn("flex w-full flex-col gap-2", className)} {...props} />;
}

export function FieldLabel({ className, ...props }: React.ComponentProps<typeof Label>) {
  return <Label data-slot="field-label" className={cn("text-foreground", className)} {...props} />;
}

export function FieldDescription({ className, ...props }: React.ComponentProps<"p">) {
  return <p data-slot="field-description" className={cn("text-sm text-muted-foreground", className)} {...props} />;
}

export function FieldError({ className, children, ...props }: React.ComponentProps<"p">) {
  if (!children) return null;
  return <p role="alert" data-slot="field-error" className={cn("text-sm text-destructive", className)} {...props}>{children}</p>;
}
