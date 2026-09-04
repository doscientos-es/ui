import { Check, Minus } from 'lucide-react'
import {
  Checkbox as AriaCheckbox,
  type CheckboxProps as AriaCheckboxProps,
} from 'react-aria-components'

import { cn } from '../../lib/cn'

/** Props for an accessible boolean form control. */
export type CheckboxProps = Omit<AriaCheckboxProps, 'className'> & { className?: string }

/** Checkbox that supports controlled and uncontrolled selection. */
export function Checkbox({ className, children, ...props }: CheckboxProps) {
  return (
    <AriaCheckbox
      data-slot="checkbox"
      className={cn(
        'group inline-flex items-center gap-2 text-sm text-foreground data-disabled:cursor-not-allowed data-disabled:opacity-50',
        className,
      )}
      {...props}
    >
      {(state) => (
        <>
          <span
            aria-hidden="true"
            className={cn(
              'border-border bg-background text-primary-foreground group-data-selected:border-primary group-data-selected:bg-primary group-data-focus-visible:ring-ring/50 grid size-4 place-items-center rounded border transition-colors group-data-focus-visible:ring-3',
              state.isIndeterminate && 'border-primary bg-primary',
            )}
          >
            <Minus
              data-slot="checkbox-indeterminate"
              className={cn(
                'size-3 transition-opacity motion-reduce:transition-none',
                state.isIndeterminate ? 'opacity-100' : 'opacity-0',
              )}
            />
            <Check
              data-slot="checkbox-check"
              className={cn(
                'absolute size-3 transition-opacity motion-reduce:transition-none',
                state.isSelected && !state.isIndeterminate ? 'opacity-100' : 'opacity-0',
              )}
            />
          </span>
          {typeof children === 'function' ? children(state) : children}
        </>
      )}
    </AriaCheckbox>
  )
}
