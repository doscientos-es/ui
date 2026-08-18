import {
  Checkbox as AriaCheckbox,
  type CheckboxProps as AriaCheckboxProps,
} from "react-aria-components";
import { cn } from "../lib/cn";

export type CheckboxProps = Omit<AriaCheckboxProps, "className"> & { className?: string };

export function Checkbox({ className, children, ...props }: CheckboxProps) {
  return <AriaCheckbox data-slot="checkbox" className={cn("group inline-flex items-center gap-2 text-sm text-foreground data-disabled:cursor-not-allowed data-disabled:opacity-50", className)} {...props}>
    {(state) => <><span aria-hidden="true" className="grid size-4 place-items-center rounded border border-border bg-background text-xs text-primary-foreground group-data-selected:border-primary group-data-selected:bg-primary group-data-focus-visible:ring-3 group-data-focus-visible:ring-ring/50">✓</span>{typeof children === "function" ? children(state) : children}</>}
  </AriaCheckbox>;
}
