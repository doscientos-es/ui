'use client'

import { createContext, type Dispatch, type ReactNode, type SetStateAction } from 'react'

// React Aria only associates the description slot automatically for alertdialog.
export const OverlayDescriptionContext = createContext<Dispatch<
  SetStateAction<string | undefined>
> | null>(null)

export const overlayHeaderClassName = 'flex min-w-0 flex-col gap-2'

export function hasOverlayHeaderContent(content: ReactNode) {
  return typeof content === 'string'
    ? content.trim().length > 0
    : content !== null && content !== undefined && typeof content !== 'boolean'
}
