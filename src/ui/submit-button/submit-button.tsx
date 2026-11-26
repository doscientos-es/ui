import type { ReactNode } from 'react'
import { useFormStatus } from 'react-dom'

import { Button, type ButtonProps } from '../button/button'

export type SubmitButtonProps = Omit<ButtonProps, 'type'> & {
  children: ReactNode
}

/** Submit button that disables itself and announces progress while a form is pending. */
export function SubmitButton({
  pendingLabel,
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
      isPending={pending || isPending}
      pendingLabel={pendingLabel ?? 'Guardando…'}
    >
      {children}
    </Button>
  )
}
