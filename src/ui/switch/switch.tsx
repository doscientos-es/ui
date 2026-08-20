import {
  Switch as AriaSwitch,
  type SwitchProps as AriaSwitchProps,
} from "react-aria-components";
import { cn } from "../lib/cn";

export type SwitchProps = Omit<AriaSwitchProps, "className"> & { className?: string };

export function Switch({ className, children, ...props }: SwitchProps) {
  return <AriaSwitch data-slot="switch" className={cn("group inline-flex items-center gap-2 text-sm text-foreground data-disabled:cursor-not-allowed data-disabled:opacity-50", className)} {...props}>
    {(state) => <><span aria-hidden="true" className="flex h-5 w-9 items-center rounded-full bg-muted p-0.5 transition-colors group-data-selected:bg-primary group-data-focus-visible:ring-3 group-data-focus-visible:ring-ring/50"><span className="size-4 rounded-full bg-background shadow-sm transition-transform group-data-selected:translate-x-4" /></span>{typeof children === "function" ? children(state) : children}</>}
  </AriaSwitch>;
}
