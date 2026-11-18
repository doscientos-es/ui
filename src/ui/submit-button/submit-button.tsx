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
  isPending,
  size = 'sm',
  ...props
}: SubmitButtonProps) {
  const { pending } = useFormStatus()
  return (
    <Button
      size={size}
      {...props}
      type="submit"
      isPending={pending || loading || isPending}
      pendingLabel={loadingLabel ?? pendingLabel ?? 'Guardando…'}
    >
      {children}
    </Button>
  )
}
