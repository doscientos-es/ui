import {
  Tooltip as AriaTooltip,
  TooltipTrigger as AriaTooltipTrigger,
  type TooltipProps as AriaTooltipProps,
  type TooltipTriggerComponentProps,
} from "react-aria-components";
import { cn } from "../lib/cn";

export type TooltipProps = Omit<AriaTooltipProps, "className"> & { className?: string };
export type { TooltipTriggerComponentProps };

export const TooltipTrigger = AriaTooltipTrigger;

export function Tooltip({ className, ...props }: TooltipProps) {
  return <AriaTooltip data-slot="tooltip" offset={6} className={cn("max-w-xs rounded-md bg-foreground px-2.5 py-1.5 text-xs text-background shadow-md outline-none data-entering:animate-in data-entering:fade-in-0 data-entering:zoom-in-95 data-exiting:animate-out data-exiting:fade-out-0 data-exiting:zoom-out-95", className)} {...props} />;
}

export const TooltipContent = Tooltip;