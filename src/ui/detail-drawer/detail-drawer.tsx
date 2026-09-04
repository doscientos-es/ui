import type * as React from 'react'

import { cn } from '../../lib/cn'
import { DrawerContent, DrawerFooter, DrawerHeader } from '../drawer/drawer'

/**
 * Drawer content frame for record details.
 * Use it as the content of `DrawerTrigger`, or control it directly with `isOpen` and `onOpenChange`.
 */
export function DetailDrawer({ children, ...props }: React.ComponentProps<typeof DrawerContent>) {
  return <DrawerContent {...props}>{children}</DrawerContent>
}
export function DetailDrawerBody({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="detail-drawer-body"
      className={cn('min-h-0 flex-1 overflow-y-auto px-4', className)}
      {...props}
    />
  )
}
export { DrawerFooter as DetailDrawerFooter, DrawerHeader as DetailDrawerHeader }
