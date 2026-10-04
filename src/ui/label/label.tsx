import type { ComponentPropsWithRef } from 'react'
import { Label as LabelPrimitive } from 'react-aria-components'

import { cn } from '../../lib/cn'

export type LabelProps = ComponentPropsWithRef<typeof LabelPrimitive>

/** Accessible label associated with a React Aria form control. */
export function Label({ className, ...props }: LabelProps) {
  return (
    <LabelPrimitive
      data-slot="label"
      className={cn(
        'flex items-center gap-2 text-sm font-medium leading-none select-none',
        className,
      )}
      {...props}
    />
  )
}
