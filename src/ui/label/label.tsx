import { forwardRef, type ComponentPropsWithRef } from "react";
import { Label as LabelPrimitive } from "react-aria-components";
import { cn } from "../../lib/cn";

/** Accessible label associated with a React Aria form control. */
export const Label = forwardRef<HTMLLabelElement, ComponentPropsWithRef<typeof LabelPrimitive>>(function Label({ className, ...props }, ref) {
  return <LabelPrimitive ref={ref} data-slot="label" className={cn("flex items-center gap-2 text-sm font-medium leading-none select-none", className)} {...props} />;
});

export type LabelProps = ComponentPropsWithRef<typeof Label>;
