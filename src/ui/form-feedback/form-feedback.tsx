import { CheckCircle, CircleAlert, LoaderCircle } from 'lucide-react'

import { cn } from '../../lib/cn'

export type FormFeedbackState =
  | { status: 'idle' }
  | { status: 'pending' }
  | { status: 'success'; message?: string }
  | { status: 'error'; message: string }

export interface FormFeedbackProps {
  /** Current submission state and optional user-facing result message. */
  state: FormFeedbackState
  className?: string
  /** Text announced while the form submission is pending. */
  pendingLabel?: string
  /** Fallback text used when a successful state has no message. */
  successLabel?: string
}

/** Live status message for pending, successful and failed form submissions. */
export function FormFeedback({
  state,
  className,
  pendingLabel = 'Guardando…',
  successLabel = 'Guardado',
}: FormFeedbackProps) {
  if (state.status === 'idle')
    return <span aria-hidden="true" className={cn('inline-flex h-5 items-center', className)} />
  const error = state.status === 'error'
  const success = state.status === 'success'
  return (
    <span
      role={error ? 'alert' : undefined}
      aria-live="polite"
      className={cn(
        'inline-flex h-5 items-center gap-1.5 text-xs',
        error && 'text-destructive',
        success && 'text-success',
        state.status === 'pending' && 'text-muted-foreground',
        className,
      )}
    >
      {state.status === 'pending' && (
        <LoaderCircle aria-hidden="true" className="size-3.5 animate-spin" />
      )}
      {success && <CheckCircle aria-hidden="true" className="size-3.5" />}
      {error && <CircleAlert aria-hidden="true" className="size-3.5" />}
      <span>
        {state.status === 'pending'
          ? pendingLabel
          : success
            ? (state.message ?? successLabel)
            : state.message}
      </span>
    </span>
  )
}
