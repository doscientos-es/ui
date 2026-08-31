import { LoaderCircle } from 'lucide-react'
import { useFormStatus } from 'react-dom'

import { Button, type ButtonProps } from '../button/button'

export interface SubmitButtonProps extends Omit<ButtonProps, 'type'> {
  /** Text displayed while the parent form is submitting or loading is set. */
  pendingLabel?: string
  /** Explicit loading state in addition to the parent form status. */
  loading?: boolean
  children: React.ReactNode
}

/** Submit button that disables itself and announces progress while a form is pending. */
export function SubmitButton({
  pendingLabel = 'Guardando…',
  loading = false,
  children,
  isDisabled,
  size = 'sm',
  ...props
}: SubmitButtonProps) {
  const { pending } = useFormStatus()
  const busy = pending || loading
  return (
    <Button
      type="submit"
      size={size}
      isDisabled={busy || isDisabled}
      aria-busy={busy || undefined}
      {...props}
    >
      {busy ? (
        <>
          <LoaderCircle aria-hidden="true" className="size-3.5 animate-spin" />
          {pendingLabel}
        </>
      ) : (
        children
      )}
    </Button>
  )
}
