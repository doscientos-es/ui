import { Combobox as ComboboxPrimitive } from "@base-ui/react";
import { Fragment } from "react";
import { cn } from "../lib/cn";
import { getTextMatchParts } from "../lib/text-match";

export const Combobox = ComboboxPrimitive.Root;
export const ComboboxValue = ComboboxPrimitive.Value;
export const ComboboxCollection = ComboboxPrimitive.Collection;

export function ComboboxInput({ className, ...props }: ComboboxPrimitive.Input.Props) {
  return <ComboboxPrimitive.Input data-slot="combobox-input" className={cn("h-8 w-full rounded-lg border border-border bg-background px-2.5 text-sm text-foreground outline-none placeholder:text-muted-foreground focus-visible:ring-3 focus-visible:ring-ring/50", className)} {...props} />;
}

export function ComboboxContent({ className, side = "bottom", sideOffset = 6, align = "start", ...props }: ComboboxPrimitive.Popup.Props & Pick<ComboboxPrimitive.Positioner.Props, "side" | "sideOffset" | "align">) {
  return <ComboboxPrimitive.Portal><ComboboxPrimitive.Positioner side={side} sideOffset={sideOffset} align={align} className="z-50">
    <ComboboxPrimitive.Popup data-slot="combobox-content" className={cn("max-h-72 w-(--anchor-width) overflow-hidden rounded-xl border border-border bg-background p-1.5 text-foreground shadow-lg", className)} {...props} />
  </ComboboxPrimitive.Positioner></ComboboxPrimitive.Portal>;
}

export function ComboboxList({ className, ...props }: ComboboxPrimitive.List.Props) {
  return <ComboboxPrimitive.List data-slot="combobox-list" className={cn("max-h-64 overflow-y-auto", className)} {...props} />;
}

export function ComboboxItem({ className, children, ...props }: ComboboxPrimitive.Item.Props) {
  return <ComboboxPrimitive.Item data-slot="combobox-item" className={cn("flex w-full cursor-default items-center justify-between rounded-md px-2 py-1.5 text-sm outline-none data-highlighted:bg-muted data-disabled:pointer-events-none data-disabled:opacity-50", className)} {...props}>
    {children}<ComboboxPrimitive.ItemIndicator aria-hidden="true">✓</ComboboxPrimitive.ItemIndicator>
  </ComboboxPrimitive.Item>;
}

export function ComboboxEmpty({ className, ...props }: ComboboxPrimitive.Empty.Props) {
  return <ComboboxPrimitive.Empty data-slot="combobox-empty" className={cn("px-3 py-7 text-center text-sm text-muted-foreground", className)} {...props} />;
}

/** Accent-insensitive visual highlighting for suggestion labels. */
export function HighlightMatch({ text, query, className }: { text: string; query: string; className?: string }) {
  return <span className={className}>{getTextMatchParts(text, query).map((part, index) => part.match ? <mark key={`${part.text}-${index}`} className="rounded bg-accent px-0.5 text-accent-foreground">{part.text}</mark> : <Fragment key={`${part.text}-${index}`}>{part.text}</Fragment>)}</span>;
}
