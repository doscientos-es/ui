import { Menu as AriaMenu, MenuItem as AriaMenuItem, MenuTrigger as AriaMenuTrigger, Popover as AriaPopover, Separator as AriaSeparator, type MenuItemProps } from "react-aria-components";
import { cn } from "../../lib/cn";

export const DropdownMenu = AriaMenu;
export const DropdownMenuTrigger = AriaMenuTrigger;

export function DropdownMenuContent({ className, ...props }: React.ComponentProps<typeof AriaPopover>) {
  return <AriaPopover data-slot="dropdown-menu-content" offset={6} className={cn("min-w-40 overflow-hidden rounded-xl border border-border bg-background p-1.5 text-foreground shadow-lg outline-none motion-safe:data-entering:animate-ui-surface-in motion-safe:data-exiting:animate-ui-surface-out", className)} {...props} />;
}

export function DropdownMenuItem({ className, ...props }: MenuItemProps) {
  return <AriaMenuItem data-slot="dropdown-menu-item" className={cn("flex cursor-default items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none data-focused:bg-muted data-disabled:pointer-events-none data-disabled:opacity-50", className)} {...props} />;
}

export function DropdownMenuSeparator({ className, ...props }: React.ComponentProps<typeof AriaSeparator>) {
  return <AriaSeparator data-slot="dropdown-menu-separator" className={cn("my-1 h-px bg-border", className)} {...props} />;
}
