import { createContext, useContext } from 'react'

type DialogContextValue = { open: boolean; setOpen: (open: boolean) => void }

export const DialogContext = createContext<DialogContextValue | null>(null)

export function useDialogContext() {
  const context = useContext(DialogContext)
  if (!context) throw new Error('Dialog components must be rendered within Dialog.')
  return context
}
