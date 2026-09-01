import type { VariantProps } from 'class-variance-authority'
import type * as React from 'react'

import { cn } from '../../lib/cn'
import { alertVariants } from './alert-variants'

export type AlertProps = React.ComponentProps<'div'> &
  VariantProps<typeof alertVariants> & {
    /** Communicates the alert's semantic intent. */
    variant?: VariantProps<typeof alertVariants>['variant']
  }

/** Announces a concise status, warning or error message. */
function Alert({ className, variant, ...props }: AlertProps) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        'font-medium group-has-[>svg]/alert:col-start-2 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground',
        className,
      )}
      {...props}
    />
  )
}

function AlertDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        'text-sm text-balance text-muted-foreground md:text-pretty [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4',
        className,
      )}
      {...props}
    />
  )
}

function AlertAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-slot="alert-action" className={cn('absolute top-2 right-2', className)} {...props} />
  )
}

export { Alert, AlertAction, AlertDescription, AlertTitle }
