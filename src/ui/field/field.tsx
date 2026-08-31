import { cva, type VariantProps } from 'class-variance-authority'
import type * as React from 'react'

import { cn } from '../../lib/cn'
import { Label } from '../label/label'
import { Separator } from '../separator/separator'

/** Semantic fieldset for controls that share a {@link FieldLegend}. */
export function FieldSet({ className, ...props }: React.ComponentProps<'fieldset'>) {
  return (
    <fieldset data-slot="field-set" className={cn('flex flex-col gap-4', className)} {...props} />
  )
}

/** Label for a {@link FieldSet}, with heading or label styling. */
export function FieldLegend({
  className,
  variant = 'legend',
  ...props
}: React.ComponentProps<'legend'> & { variant?: 'legend' | 'label' }) {
  return (
    <legend
      data-slot="field-legend"
      data-variant={variant}
      className={cn(
        'mb-1.5 font-medium data-[variant=label]:text-sm data-[variant=legend]:text-base',
        className,
      )}
      {...props}
    />
  )
}

/** Responsive vertical stack for related {@link Field} components. */
export function FieldGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="field-group"
      className={cn(
        'group/field-group @container/field-group flex w-full flex-col gap-5',
        className,
      )}
      {...props}
    />
  )
}

export const fieldVariants = cva(
  'group/field flex w-full gap-2 data-[invalid=true]:text-destructive',
  {
    variants: {
      orientation: {
        vertical: 'flex-col *:w-full [&>.sr-only]:w-auto',
        horizontal:
          'flex-row items-center has-[>[data-slot=field-content]]:items-start *:data-[slot=field-label]:flex-auto',
        responsive:
          'flex-col *:w-full @md/field-group:flex-row @md/field-group:items-center @md/field-group:*:w-auto @md/field-group:*:data-[slot=field-label]:flex-auto',
      },
    },
    defaultVariants: { orientation: 'vertical' },
  },
)

/** Props for the layout wrapper of a labelled form control. */
export type FieldProps = React.ComponentProps<'div'> &
  VariantProps<typeof fieldVariants> & {
    /** Layout of the label and control; `responsive` changes at the field-group container breakpoint. */
    orientation?: VariantProps<typeof fieldVariants>['orientation']
  }

/** Groups a form control, its label and descriptive or error text. */
export function Field({ className, orientation = 'vertical', ...props }: FieldProps) {
  return (
    // biome-ignore lint/a11y/useSemanticElements: FieldSet provides native fieldset semantics when they are appropriate.
    <div
      role="group"
      data-slot="field"
      data-orientation={orientation}
      className={cn(fieldVariants({ orientation }), className)}
      {...props}
    />
  )
}

/** Stacks the label, description and validation message for a {@link Field}. */
export function FieldContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="field-content"
      className={cn('flex flex-1 flex-col gap-0.5 leading-snug', className)}
      {...props}
    />
  )
}

/** Label associated with the control inside a {@link Field}. */
export function FieldLabel({ className, ...props }: React.ComponentProps<typeof Label>) {
  return (
    <Label
      data-slot="field-label"
      className={cn(
        'flex w-fit gap-2 leading-snug text-foreground group-data-[disabled=true]/field:opacity-50',
        className,
      )}
      {...props}
    />
  )
}

/** Short visible title for a {@link Field} that is not a native label. */
export function FieldTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="field-title"
      className={cn('flex w-fit items-center gap-2 text-sm font-medium', className)}
      {...props}
    />
  )
}

/** Helper text that clarifies how to complete a {@link Field}. */
export function FieldDescription({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      data-slot="field-description"
      className={cn(
        'text-left text-sm leading-normal text-muted-foreground [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary',
        className,
      )}
      {...props}
    />
  )
}

/** Visual divider between groups of fields, optionally with a text label. */
export function FieldSeparator({ className, children, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="field-separator"
      data-content={Boolean(children) || undefined}
      className={cn('relative -my-2 h-5 text-sm', className)}
      {...props}
    >
      <Separator className="absolute inset-0 top-1/2" />
      {children ? (
        <span
          data-slot="field-separator-content"
          className="bg-background text-muted-foreground relative mx-auto block w-fit px-2"
        >
          {children}
        </span>
      ) : null}
    </div>
  )
}

/** Props for a validation message rendered by {@link FieldError}. */
export type FieldErrorProps = React.ComponentProps<'div'> & {
  /** Validation errors whose unique messages are rendered when no children are supplied. */
  errors?: Array<{ message?: string } | undefined>
}

/** Announced validation message for a {@link Field}. */
export function FieldError({ className, children, errors, ...props }: FieldErrorProps) {
  const messages = [...new Set(errors?.flatMap((error) => error?.message ?? []) ?? [])]
  const content =
    children ??
    (messages.length === 1 ? (
      messages[0]
    ) : messages.length > 1 ? (
      <ul className="ml-4 list-disc">
        {messages.map((message) => (
          <li key={message}>{message}</li>
        ))}
      </ul>
    ) : null)
  if (!content) return null
  return (
    <div
      role="alert"
      data-slot="field-error"
      className={cn('text-sm text-destructive', className)}
      {...props}
    >
      {content}
    </div>
  )
}
