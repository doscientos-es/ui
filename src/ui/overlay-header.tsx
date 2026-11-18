'use client'

import { type ComponentProps, type ReactNode, useContext, useEffect, useId } from 'react'
import { Heading, Text } from 'react-aria-components'

import { cn } from '../lib/cn'
import {
  hasOverlayHeaderContent,
  OverlayDescriptionContext,
  overlayHeaderClassName,
} from './overlay-header-shared'

export type OverlayHeaderProps = {
  /** Visible heading used as the overlay's accessible name. */
  title?: ReactNode
  /** Supporting text announced with the overlay. */
  description?: ReactNode
  headerClassName?: string
}

export function OverlayTitle({
  className,
  ...props
}: Omit<ComponentProps<typeof Heading>, 'slot'>) {
  return (
    <Heading
      slot="title"
      className={cn('text-lg leading-snug font-semibold tracking-tight break-words', className)}
      {...props}
    />
  )
}

export function OverlayDescription({
  className,
  id,
  ...props
}: Omit<ComponentProps<typeof Text>, 'slot'>) {
  const generatedId = useId()
  const descriptionId = id ?? generatedId
  const setDescriptionId = useContext(OverlayDescriptionContext)

  useEffect(() => {
    setDescriptionId?.(descriptionId)
    return () => setDescriptionId?.((current) => (current === descriptionId ? undefined : current))
  }, [descriptionId, setDescriptionId])

  return (
    <Text
      slot="description"
      id={descriptionId}
      className={cn(
        'text-muted-foreground *:[a]:hover:text-foreground text-sm leading-relaxed break-words *:[a]:underline *:[a]:underline-offset-3',
        className,
      )}
      {...props}
    />
  )
}

export function OverlayHeader({
  title,
  description,
  slotPrefix,
  headerClassName,
}: OverlayHeaderProps & { slotPrefix: string }) {
  const hasTitle = hasOverlayHeaderContent(title)
  const hasDescription = hasOverlayHeaderContent(description)
  if (!hasTitle && !hasDescription) return null

  return (
    <div data-slot={`${slotPrefix}-header`} className={cn(overlayHeaderClassName, headerClassName)}>
      {hasTitle && <OverlayTitle data-slot={`${slotPrefix}-title`}>{title}</OverlayTitle>}
      {hasDescription && (
        <OverlayDescription data-slot={`${slotPrefix}-description`}>
          {description}
        </OverlayDescription>
      )}
    </div>
  )
}
