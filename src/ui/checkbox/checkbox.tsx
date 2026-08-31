import { Check } from 'lucide-react'
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
            className="border-border bg-background text-primary-foreground group-data-selected:border-primary group-data-selected:bg-primary group-data-focus-visible:ring-ring/50 grid size-4 place-items-center rounded border transition-colors group-data-focus-visible:ring-3"
          >
            <Check className="size-3 opacity-0 transition-opacity group-data-selected:opacity-100 motion-reduce:transition-none" />
          </span>
          {typeof children === 'function' ? children(state) : children}
        </>
      )}
    </AriaCheckbox>
  )
}
