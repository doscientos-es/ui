/** Controlled/uncontrolled open-state props shared by overlay components. */
export type OpenStateProps = {
  /** Controlled open state. */
  open?: boolean
  /** Initial open state when uncontrolled. */
  defaultOpen?: boolean
  /** Called when the overlay requests to open or close. */
  onOpenChange?: (open: boolean) => void
  /** @deprecated Use `open`. */
  isOpen?: boolean
}

/** Resolve the public `open` prop, falling back to the deprecated `isOpen` alias. */
export function resolveOpen({ open, isOpen }: Pick<OpenStateProps, 'open' | 'isOpen'>) {
  return open ?? isOpen
}
