import {
  DialogTrigger as AriaDialogTrigger,
  Popover as AriaPopover,
  type DialogTriggerProps,
  type PopoverProps as AriaPopoverProps,
} from "react-aria-components";
import { cn } from "../lib/cn";

export type PopoverProps = Omit<AriaPopoverProps, "className"> & { className?: string };
export type { DialogTriggerProps as PopoverTriggerProps };

/** Wrap a trigger and Popover surface; React Aria handles focus and positioning. */
export const PopoverTrigger = AriaDialogTrigger;

export function Popover({ className, ...props }: PopoverProps) {
  return <AriaPopover data-slot="popover" offset={6} className={cn("min-w-48 rounded-xl border border-border bg-background p-1.5 text-foreground shadow-lg outline-none data-entering:animate-in data-entering:fade-in-0 data-entering:zoom-in-95 data-exiting:animate-out data-exiting:fade-out-0 data-exiting:zoom-out-95", className)} {...props} />;
}

export const PopoverContent = Popover;