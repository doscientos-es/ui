'use client'

import { XIcon } from 'lucide-react'
import { type ComponentProps, type ReactNode, useState } from 'react'
import {
  Sheet as AriaSheet,
  SheetBackdrop,
  SheetContent,
  SheetOverlay,
  SheetTrigger,
} from 'react-aria-components'

import { cn } from '../../lib/cn'
import { type OpenStateProps, resolveOpen } from '../../lib/open-state'
import { Button } from '../button/button'
import { OverlayHeader, type OverlayHeaderProps } from '../overlay-header'
import { OverlayDescriptionContext } from '../overlay-header-shared'

export type BottomSheetTriggerProps = Pick<ComponentProps<typeof SheetTrigger>, 'children'> &
  OpenStateProps

/** Pairs a Doscientos Button with a BottomSheet and restores focus on close. */
export function BottomSheetTrigger({ open, isOpen, ...props }: BottomSheetTriggerProps) {
  return <SheetTrigger isOpen={resolveOpen({ open, isOpen })} {...props} />
}

export type BottomSheetProps = OpenStateProps &
  OverlayHeaderProps & {
    title: ReactNode
    children: ReactNode
    className?: string
    /** Initial visible height in pixels or as a CSS length. Omit to open fully. */
    peekHeight?: number | string
    /** Disable swipe-to-dismiss, outside press and Escape. The close button remains available. */
    preventDismissal?: boolean
    closeLabel?: string
    /** Whether to display the built-in close button. */
    showCloseButton?: boolean
    expandLabel?: string
  }

function expandSheet(button: Element) {
  const panel = button.closest('[data-slot="bottom-sheet"]')
  // React Aria 1.22 has no imperative snap API. Use its native scroll container
  // only for the explicit expand button; React Aria still owns gesture handling.
  const scroller = panel?.closest<HTMLElement>('[data-sheet-scroll]')
  if (!panel || !scroller) return

  const view = panel.ownerDocument.defaultView
  if (!view) return

  scroller.scrollTo({
    top: scroller.scrollHeight - scroller.clientHeight,
    behavior: view.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
  })
}

/** Modal panel anchored to the bottom edge, using native scrolling for touch gestures. */
export function BottomSheet({
  title,
  description,
  headerClassName,
  children,
  className,
  peekHeight,
  preventDismissal,
  closeLabel = 'Cerrar',
  showCloseButton = true,
  expandLabel = 'Expandir panel',
  open,
  isOpen,
  ...openProps
}: BottomSheetProps) {
  const snapPoints = peekHeight === undefined ? undefined : [peekHeight]
  const [descriptionId, setDescriptionId] = useState<string>()

  return (
    <SheetOverlay
      data-slot="bottom-sheet-overlay"
      className="group/bottom-sheet z-50"
      isOpen={resolveOpen({ open, isOpen })}
      preventDismissal={preventDismissal}
      snapPoints={snapPoints}
      {...openProps}
    >
      {({ isExpanded }) => (
        <>
          <SheetBackdrop
            className="data-[stack-index=0]:bg-black/35 motion-reduce:animate-none!"
            swipeAnimation="ui-overlay-in"
          />
          <AriaSheet
            data-slot="bottom-sheet"
            className={cn(
              'border-border bg-popover text-popover-foreground box-border flex w-full max-w-[42rem] shrink-0 flex-col overflow-clip rounded-t-2xl border bg-clip-padding text-sm shadow-[var(--ui-shadow-floating)]',
              snapPoints ? 'h-[min(85dvh,42rem)]' : 'max-h-[min(85dvh,42rem)]',
              className,
            )}
          >
            <SheetContent
              aria-describedby={descriptionId}
              className="box-border min-h-0 overflow-hidden overscroll-auto pb-[max(env(safe-area-inset-bottom),var(--sheet-scroll-padding-y,0px))] outline-none group-data-[expanded]/bottom-sheet:overflow-y-auto"
            >
              <div className={cn('relative px-4 pb-4 sm:px-6', !snapPoints && 'pt-5')}>
                {snapPoints ? (
                  <Button
                    aria-label={expandLabel}
                    aria-expanded={isExpanded}
                    variant="ghost"
                    className="mx-auto flex h-11 w-16 rounded-full"
                    onPress={(event) => {
                      if (!isExpanded) expandSheet(event.target)
                    }}
                  >
                    <span
                      aria-hidden="true"
                      className="bg-muted-foreground/50 h-1 w-8 rounded-full"
                    />
                  </Button>
                ) : !preventDismissal ? (
                  <span
                    aria-hidden="true"
                    className="bg-muted-foreground/50 absolute inset-x-0 top-2 mx-auto h-1 w-8 rounded-full"
                  />
                ) : null}
                <OverlayDescriptionContext.Provider value={setDescriptionId}>
                  <div className="flex items-start gap-3">
                    <OverlayHeader
                      slotPrefix="bottom-sheet"
                      title={title}
                      description={description}
                      headerClassName={cn('flex-1 gap-1 py-1', headerClassName)}
                    />
                    {showCloseButton && (
                      <Button
                        slot="close"
                        variant="ghost"
                        size="icon"
                        aria-label={closeLabel}
                        className="ml-auto"
                      >
                        <XIcon aria-hidden="true" />
                      </Button>
                    )}
                  </div>
                  <div className="mt-3">{children}</div>
                </OverlayDescriptionContext.Provider>
              </div>
            </SheetContent>
          </AriaSheet>
        </>
      )}
    </SheetOverlay>
  )
}
