import type { Ref } from 'react'
import { Input as AriaInput, type InputProps as AriaInputProps } from 'react-aria-components'

import { cn } from '../../lib/cn'

/** Props for a single-line text input. */
export type InputProps = Omit<AriaInputProps, 'ref'> & {
  /** Native input ref, passed as a regular prop in React 19. */
  ref?: Ref<HTMLInputElement>
}

/** Accessible single-line input. `ref` is a regular prop in React 19. */
export function Input({ className, type, ref, ...props }: InputProps) {
  return (
    <AriaInput
      ref={ref}
      type={type}
      data-slot="input"
      className={cn(
        'box-border h-9 w-full min-w-0 rounded-lg border border-border bg-background px-3 py-1 text-sm text-foreground shadow-[var(--ui-shadow-hairline)] outline-none transition-[background-color,border-color,box-shadow] placeholder:text-muted-foreground hover:border-border-strong focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive',
        className,
      )}
      {...props}
    />
  )
}
