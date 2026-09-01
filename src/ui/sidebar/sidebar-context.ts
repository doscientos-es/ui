import { createContext, useContext } from 'react'

export type SidebarContextValue = {
  collapsed: boolean
  setCollapsed: (value: boolean) => void
  toggle: () => void
}

export const SidebarContext = createContext<SidebarContextValue | null>(null)

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (!context) throw new Error('useSidebar must be used inside SidebarProvider')
  return context
}
