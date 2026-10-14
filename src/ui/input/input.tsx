import type { Ref } from 'react'
import { Input as AriaInput, type InputProps as AriaInputProps } from 'react-aria-components'

import { cn } from '../../lib/cn'
import { textControlClassName } from '../../lib/text-control'

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
        textControlClassName,
        'h-9 py-1',
        className,
      )}
      {...props}
    />
  )
}
