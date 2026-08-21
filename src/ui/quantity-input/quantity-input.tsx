import { Minus, Plus } from "lucide-react";
import {
  Button as AriaButton,
  Group as AriaGroup,
  Input as AriaInput,
  NumberField as AriaNumberField,
  type NumberFieldProps as AriaNumberFieldProps,
} from "react-aria-components";
import { cn } from "../../lib/cn";

export type QuantityInputProps = Omit<AriaNumberFieldProps, "children" | "className"> & {
  className?: string;
  inputClassName?: string;
  decrementAriaLabel?: string;
  incrementAriaLabel?: string;
};

/** A compact quantity control with accessible stepper buttons and numeric keyboard support. */
export function QuantityInput({
  className,
  inputClassName,
  decrementAriaLabel = "Disminuir cantidad",
  incrementAriaLabel = "Aumentar cantidad",
  minValue = 0,
  step = 1,
  ...props
}: QuantityInputProps) {
  return (
    <AriaNumberField
      {...props}
      minValue={minValue}
      step={step}
      data-slot="quantity-input"
      className={cn("group/quantity-input inline-flex min-w-0 data-disabled:cursor-not-allowed data-disabled:opacity-50", className)}
    >
      <AriaGroup
        data-slot="quantity-input-group"
        className="flex h-8 min-w-0 items-stretch overflow-hidden rounded-lg border border-border bg-background text-foreground transition-[border-color,box-shadow] focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50 group-data-invalid/quantity-input:border-destructive"
      >
        <AriaButton slot="decrement" aria-label={decrementAriaLabel} data-slot="quantity-input-decrement" className="flex size-8 shrink-0 cursor-pointer items-center justify-center border-r border-border text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground data-focus-visible:bg-muted data-pressed:bg-muted data-disabled:pointer-events-none">
          <MinusIcon aria-hidden="true" className="size-4" />
        </AriaButton>
        <AriaInput data-slot="quantity-input-value" className={cn("w-14 min-w-0 bg-transparent px-1 text-center text-sm tabular-nums outline-none", inputClassName)} />
        <AriaButton slot="increment" aria-label={incrementAriaLabel} data-slot="quantity-input-increment" className="flex size-8 shrink-0 cursor-pointer items-center justify-center border-l border-border text-muted-foreground outline-none transition-colors hover:bg-muted hover:text-foreground data-focus-visible:bg-muted data-pressed:bg-muted data-disabled:pointer-events-none">
          <PlusIcon aria-hidden="true" className="size-4" />
        </AriaButton>
      </AriaGroup>
    </AriaNumberField>
  );
}