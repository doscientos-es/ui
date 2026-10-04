import { LoaderCircle } from 'lucide-react'
import { type ReactNode, useLayoutEffect, useRef } from 'react'
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
  ref,
  ...props
}: SubmitButtonProps) {
  const { pending } = useFormStatus()
  const busy = pending || loading
  const label = loadingLabel ?? pendingLabel ?? 'Guardando…'
  const innerRef = useRef<HTMLButtonElement | null>(null)

  // React Aria's Button drops `aria-busy`, so it is applied on the DOM node.
  useLayoutEffect(() => {
    const node = innerRef.current
    if (!node) return
    if (busy) node.setAttribute('aria-busy', 'true')
    else node.removeAttribute('aria-busy')
  }, [busy])

  const setRef = (node: HTMLButtonElement | null) => {
    innerRef.current = node
    if (typeof ref === 'function') ref(node)
    else if (ref) (ref as { current: HTMLButtonElement | null }).current = node
  }

  return (
    <Button
      size={size}
      {...props}
      ref={setRef}
      type="submit"
      isDisabled={busy || isDisabled}
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
