import { Minus, Plus } from 'lucide-react'
import {
  Button as AriaButton,
  Group as AriaGroup,
  Input as AriaInput,
  NumberField as AriaNumberField,
  type NumberFieldProps as AriaNumberFieldProps,
} from 'react-aria-components'

import { cn } from '../../lib/cn'

export type QuantityInputProps = Omit<AriaNumberFieldProps, 'children' | 'className'> & {
  className?: string
  inputClassName?: string
  decrementAriaLabel?: string
  incrementAriaLabel?: string
}

/** A compact quantity control with accessible stepper buttons and numeric keyboard support. */
export function QuantityInput({
  className,
  inputClassName,
  decrementAriaLabel = 'Disminuir cantidad',
  incrementAriaLabel = 'Aumentar cantidad',
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
      className={cn(
        'group/quantity-input inline-flex min-w-0 data-disabled:cursor-not-allowed data-disabled:opacity-50',
        className,
      )}
    >
      <AriaGroup
        data-slot="quantity-input-group"
        className="border-border bg-background text-foreground focus-within:border-ring focus-within:ring-ring/50 group-data-invalid/quantity-input:border-destructive flex h-8 min-w-0 items-stretch overflow-hidden rounded-lg border transition-[border-color,box-shadow] focus-within:ring-3"
      >
        <AriaButton
          slot="decrement"
          aria-label={decrementAriaLabel}
          data-slot="quantity-input-decrement"
          className="border-border text-muted-foreground hover:bg-muted hover:text-foreground data-focus-visible:bg-muted data-pressed:bg-muted flex size-8 shrink-0 cursor-pointer items-center justify-center border-r transition-colors outline-none data-disabled:pointer-events-none"
        >
          <Minus aria-hidden="true" className="size-4" />
        </AriaButton>
        <AriaInput
          data-slot="quantity-input-value"
          className={cn(
            'w-14 min-w-0 bg-transparent px-1 text-center text-sm tabular-nums outline-none',
            inputClassName,
          )}
        />
        <AriaButton
          slot="increment"
          aria-label={incrementAriaLabel}
          data-slot="quantity-input-increment"
          className="border-border text-muted-foreground hover:bg-muted hover:text-foreground data-focus-visible:bg-muted data-pressed:bg-muted flex size-8 shrink-0 cursor-pointer items-center justify-center border-l transition-colors outline-none data-disabled:pointer-events-none"
        >
          <Plus aria-hidden="true" className="size-4" />
        </AriaButton>
      </AriaGroup>
    </AriaNumberField>
  )
}
