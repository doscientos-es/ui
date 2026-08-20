import {
  Button as AriaButton,
  Select as AriaSelect,
  SelectValue as AriaSelectValue,
  ListBox,
  ListBoxItem,
  Popover,
  type SelectProps as AriaSelectProps,
  type ButtonProps,
  type ListBoxItemProps,
  type ListBoxProps,
} from "react-aria-components";
import { cn } from "../lib/cn";

export const Select = AriaSelect;
export type { AriaSelectProps as SelectProps };

export function SelectTrigger({ className, children, ...props }: ButtonProps) {
  return <AriaButton data-slot="select-trigger" className={cn("flex h-8 w-full min-w-36 items-center gap-2 rounded-lg border border-border bg-background px-2.5 text-left text-sm text-foreground outline-none data-focus-visible:ring-3 data-focus-visible:ring-ring/50 data-disabled:cursor-not-allowed data-disabled:opacity-50", className)} {...props}>{(state) => <>{typeof children === "function" ? children(state) : children}<span aria-hidden="true" className="ml-auto text-muted-foreground">⌄</span></>}</AriaButton>;
}

export function SelectValue({ className, ...props }: React.ComponentProps<typeof AriaSelectValue>) {
  return <AriaSelectValue data-slot="select-value" className={cn("flex-1 truncate data-placeholder:text-muted-foreground", className)} {...props} />;
}

export function SelectContent({ className, ...props }: React.ComponentProps<typeof Popover>) {
  return <Popover data-slot="select-content" className={cn("w-(--trigger-width) overflow-hidden rounded-xl border border-border bg-background p-1.5 text-foreground shadow-lg motion-safe:data-entering:animate-ui-surface-in motion-safe:data-exiting:animate-ui-surface-out", className)} {...props} />;
}

export function SelectList<T extends object>({ className, ...props }: ListBoxProps<T>) {
  return <ListBox data-slot="select-list" className={cn("max-h-64 overflow-y-auto", className)} {...props} />;
}

export function SelectItem<T extends object>({ className, children, ...props }: ListBoxItemProps<T>) {
  return <ListBoxItem data-slot="select-item" className={cn("flex cursor-default items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none data-focused:bg-muted data-selected:bg-muted data-disabled:pointer-events-none data-disabled:opacity-50", className)} {...props}>{children}</ListBoxItem>;
}
