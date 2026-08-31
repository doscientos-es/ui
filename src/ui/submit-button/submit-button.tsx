import { LoaderCircle } from 'lucide-react'
import { useCallback, useLayoutEffect, useRef } from 'react'
import type * as React from 'react'
import { useFormStatus } from 'react-dom'

import { Button, type ButtonProps } from '../button/button'

function assignRef(ref: React.Ref<HTMLButtonElement> | undefined, node: HTMLButtonElement | null) {
  if (typeof ref === 'function') {
    ref(node)
  } else if (ref) {
    ref.current = node
  }
}

export interface SubmitButtonProps extends Omit<ButtonProps, 'type'> {
  /** Text displayed while the parent form is submitting or loading is set. */
  loadingLabel?: string
  /** @deprecated Use `loadingLabel` instead. */
  pendingLabel?: string
  /** Explicit loading state in addition to the parent form status. */
  loading?: boolean
  children: React.ReactNode
}

/** Submit button that disables itself and announces progress while a form is pending. */
export function SubmitButton({
  loadingLabel,
  pendingLabel,
  loading = false,
  children,
  isDisabled,
  ref: forwardedRef,
  size = 'sm',
  ...props
}: SubmitButtonProps) {
  const { pending } = useFormStatus()
  const busy = pending || loading
  const label = loadingLabel ?? pendingLabel ?? 'Guardando…'
  const buttonRef = useRef<HTMLButtonElement>(null)
  const setButtonRef = useCallback(
    (node: HTMLButtonElement | null) => {
      buttonRef.current = node
      assignRef(forwardedRef, node)
    },
    [forwardedRef],
  )

  useLayoutEffect(() => {
    const button = buttonRef.current
    if (!button) return

    if (busy) button.setAttribute('aria-busy', 'true')
    else button.removeAttribute('aria-busy')
  }, [busy])

  return (
    <Button
      ref={setButtonRef}
      type="submit"
      size={size}
      isDisabled={busy || isDisabled}
      aria-busy={busy || undefined}
      {...props}
    >
      {busy ? (
        <>
          <LoaderCircle aria-hidden="true" className="size-3.5 animate-spin" />
          {label}
        </>
      ) : (
        children
      )}
    </Button>
  )
}
