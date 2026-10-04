import type { Ref } from 'react'
import {
  TextArea as AriaTextArea,
  type TextAreaProps as AriaTextAreaProps,
} from 'react-aria-components'

import { cn } from '../../lib/cn'

/** Props for a multi-line text input. */
export type TextareaProps = Omit<AriaTextAreaProps, 'ref'> & {
  /** Native textarea ref, passed as a regular prop in React 19. */
  ref?: Ref<HTMLTextAreaElement>
}

/** Accessible multi-line input. `ref` is a regular prop in React 19. */
export function Textarea({ className, ref, ...props }: TextareaProps) {
  return (
    <AriaTextArea
      ref={ref}
      data-slot="textarea"
      className={cn(
        'box-border min-h-20 w-full rounded-lg border border-border bg-background px-2.5 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive',
        className,
      )}
      {...props}
    />
  )
}
