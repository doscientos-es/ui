import { Fragment } from "react";
import {
  ComboBox as AriaComboBox,
  ComboBoxValue,
  Input,
  ListBox,
  ListBoxItem,
  Popover,
  type ComboBoxProps,
  type InputProps,
  type ListBoxItemProps,
  type ListBoxProps,
} from "react-aria-components";
import { cn } from "../lib/cn";
import { getTextMatchParts } from "../lib/text-match";

export const Combobox = AriaComboBox;
export { ComboBoxValue as ComboboxValue };

export type { ComboBoxProps };

export function ComboboxInput({ className, ...props }: InputProps) {
  return <Input data-slot="combobox-input" className={cn("h-8 w-full rounded-lg border border-border bg-background px-2.5 text-sm text-foreground outline-none placeholder:text-muted-foreground focus-visible:ring-3 focus-visible:ring-ring/50", className)} {...props} />;
}

export function ComboboxContent({ className, ...props }: React.ComponentProps<typeof Popover>) {
  return <Popover data-slot="combobox-content" className={cn("max-h-72 w-(--trigger-width) overflow-hidden rounded-xl border border-border bg-background p-1.5 text-foreground shadow-lg motion-safe:data-entering:animate-ui-surface-in motion-safe:data-exiting:animate-ui-surface-out", className)} {...props} />;
}

export function ComboboxList<T extends object>({ className, emptyState, ...props }: ListBoxProps<T> & { emptyState?: React.ReactNode }) {
  return <ListBox data-slot="combobox-list" className={cn("max-h-64 overflow-y-auto", className)} renderEmptyState={emptyState ? () => emptyState : undefined} {...props} />;
}

export function ComboboxItem<T extends object>({ className, children, ...props }: ListBoxItemProps<T>) {
  return <ListBoxItem data-slot="combobox-item" className={cn("flex w-full cursor-default items-center justify-between rounded-md px-2 py-1.5 text-sm outline-none data-focused:bg-muted data-disabled:pointer-events-none data-disabled:opacity-50", className)} {...props}>
    {children}
  </ListBoxItem>;
}

/** Accent-insensitive visual highlighting for suggestion labels. */
export function HighlightMatch({ text, query, className }: { text: string; query: string; className?: string }) {
  return <span className={className}>{getTextMatchParts(text, query).map((part, index) => part.match ? <mark key={`${part.text}-${index}`} className="rounded bg-accent px-0.5 text-accent-foreground">{part.text}</mark> : <Fragment key={`${part.text}-${index}`}>{part.text}</Fragment>)}</span>;
}
