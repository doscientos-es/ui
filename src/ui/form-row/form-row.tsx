import { useId, type ReactNode } from 'react'

import { cn } from '../../lib/cn'

/** Accessibility props to spread onto the labelled native form control. */
export type FormRowControlProps = {
  id: string
  required?: boolean
  'aria-describedby'?: string
  'aria-invalid'?: true
}

export type FormRowProps = {
  /** Visible label associated with the form control. */
  label: ReactNode
  /** Control identifier. Generated when omitted; required when passing a plain child. */
  htmlFor?: string
  /** Marks the label and, with a render function, the control as required. */
  required?: boolean
  /** Supplementary guidance displayed below the control. */
  hint?: ReactNode
  /** Validation message announced to the user. */
  error?: ReactNode
  className?: string
  /** Render function receives the ID and accessibility props for the control. */
  children: ReactNode | ((controlProps: FormRowControlProps) => ReactNode)
}

/** Labelled form-control row with optional help text and validation feedback. */
export function FormRow({
  label,
  htmlFor,
  required,
  hint,
  error,
  className,
  children,
}: FormRowProps) {
  const generatedId = useId()
  const controlId = htmlFor ?? generatedId
  const hintId = hint ? `${controlId}-hint` : undefined
  const errorId = error ? `${controlId}-error` : undefined
  const controlProps: FormRowControlProps = {
    id: controlId,
    required,
    'aria-describedby': [hintId, errorId].filter(Boolean).join(' ') || undefined,
    'aria-invalid': errorId ? true : undefined,
  }
  return (
    <div data-slot="form-row" className={cn('flex flex-col gap-1.5', className)}>
      <label htmlFor={controlId} className="text-foreground text-sm font-medium">
        {label}
        {required && (
          <>
            <span aria-hidden="true" className="text-destructive ml-0.5">
              *
            </span>
            <span className="sr-only"> (obligatorio)</span>
          </>
        )}
      </label>
      {typeof children === 'function' ? children(controlProps) : children}
      {hint && (
        <p id={hintId} className="text-muted-foreground text-xs">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} role="alert" className="text-destructive text-xs font-medium">
          {error}
        </p>
      )}
    </div>
  )
}
