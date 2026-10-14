import type { Ref } from 'react'
import {
  TextArea as AriaTextArea,
  type TextAreaProps as AriaTextAreaProps,
} from 'react-aria-components'

import { cn } from '../../lib/cn'
import { textControlClassName } from '../../lib/text-control'

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
      className={cn(textControlClassName, 'min-h-24 resize-y py-2 leading-relaxed', className)}
      {...props}
    />
  )
}
