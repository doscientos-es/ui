import { LoaderCircle } from 'lucide-react'
import type { ReactNode } from 'react'
import { useFormStatus } from 'react-dom'

import { Button, type ButtonProps } from '../button/button'

export type SubmitButtonProps = Omit<ButtonProps, 'type'> & {
  /** Text displayed while the parent form is submitting or loading is set. */
  loadingLabel?: string
  /** @deprecated Use `loadingLabel` instead. */
  pendingLabel?: string
  /** Explicit loading state in addition to the parent form status. */
  loading?: boolean
  children: ReactNode
}

/** Submit button that disables itself and announces progress while a form is pending. */
export function SubmitButton({
  loadingLabel,
  pendingLabel,
  loading = false,
  children,
  isDisabled,
  size = 'sm',
  ...props
}: SubmitButtonProps) {
  const { pending } = useFormStatus()
  const busy = pending || loading
  const label = loadingLabel ?? pendingLabel ?? 'Guardando…'

  return (
    <Button
      size={size}
      {...props}
      type="submit"
      isDisabled={busy || isDisabled}
      aria-busy={busy || undefined}
    >
      {busy ? (
        <>
          <LoaderCircle aria-hidden="true" className="size-3.5 motion-safe:animate-spin" />
          {label}
        </>
      ) : (
        children
      )}
    </Button>
  )
}
