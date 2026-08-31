import { forwardRef } from 'react'
import {
  TextArea as AriaTextArea,
  type TextAreaProps as AriaTextAreaProps,
} from 'react-aria-components'

import { cn } from '../../lib/cn'

type CompatibleRef<T> = ((instance: T | null) => unknown) | { readonly current: T | null } | null

export type TextareaProps = Omit<AriaTextAreaProps, 'ref'> & {
  ref?: CompatibleRef<HTMLTextAreaElement>
}

const TextareaImpl = forwardRef<HTMLTextAreaElement, AriaTextAreaProps>(function Textarea(
  { className, ...props },
  ref,
) {
  return (
    <AriaTextArea
      ref={ref}
      data-slot="textarea"
      className={cn(
        'min-h-20 w-full rounded-lg border border-border bg-background px-2.5 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive',
        className,
      )}
      {...props}
    />
  )
})

/** Forward-ref component with a ref type compatible across React 19 type releases. */
export const Textarea = TextareaImpl as unknown as (
  props: TextareaProps,
) => ReturnType<typeof TextareaImpl>
