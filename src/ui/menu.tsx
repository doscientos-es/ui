import {
  Menu as AriaMenu,
  MenuItem as AriaMenuItem,
  MenuTrigger as AriaMenuTrigger,
  Popover,
  type MenuItemProps,
  type MenuProps,
} from "react-aria-components";
import { cn } from "../lib/cn";

export const MenuTrigger = AriaMenuTrigger;

export function MenuContent({ className, ...props }: React.ComponentProps<typeof Popover>) {
  return <Popover data-slot="menu-content" className={cn("min-w-40 overflow-hidden rounded-xl border border-border bg-background p-1.5 text-foreground shadow-lg", className)} {...props} />;
}

export function Menu<T extends object>({ className, ...props }: MenuProps<T>) {
  return <AriaMenu data-slot="menu" className={cn("outline-none", className)} {...props} />;
}

export function MenuItem<T extends object>({ className, children, ...props }: MenuItemProps<T>) {
  return <AriaMenuItem data-slot="menu-item" className={cn("flex cursor-default items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none data-focused:bg-muted data-disabled:pointer-events-none data-disabled:opacity-50", className)} {...props}>{children}</AriaMenuItem>;
}