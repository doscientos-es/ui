'use client'

import { ChevronDown, ShieldAlert } from 'lucide-react'
import type * as React from 'react'
import {
  Button as DisclosureButton,
  Disclosure,
  DisclosurePanel,
  Heading,
} from 'react-aria-components'

import { cn } from '../../lib/cn'
import { Card, CardContent } from '../card/card'

export type DangerZoneProps = {
  children: React.ReactNode
  className?: string
  defaultOpen?: boolean
  description?: string
  title?: string
}

/** Collapsed-by-default container for actions that are hard to reverse. */
export function DangerZone({
  title = 'Zona de peligro',
  description = 'Acciones irreversibles. Ábrela solo si estás seguro.',
  defaultOpen = false,
  className,
  children,
}: DangerZoneProps) {
  return (
    <Disclosure defaultExpanded={defaultOpen}>
      <Card className={cn('border-destructive/30', className)}>
        <Heading className="flex">
          <DisclosureButton
            slot="trigger"
            data-slot="danger-zone-trigger"
            className="group/danger focus-visible:ring-ring/50 flex w-full items-center gap-3 px-4 text-left outline-none focus-visible:ring-3"
          >
            <ShieldAlert className="text-destructive size-4 shrink-0" />
            <span className="flex flex-1 flex-col gap-0.5">
              <span className="font-heading text-destructive text-base leading-snug font-medium">
                {title}
              </span>
              <span className="text-muted-foreground text-xs">{description}</span>
            </span>
            <ChevronDown className="text-muted-foreground size-4 shrink-0 transition-transform group-aria-expanded/danger:rotate-180" />
          </DisclosureButton>
        </Heading>
        <DisclosurePanel data-slot="danger-zone-content">
          <CardContent>{children}</CardContent>
        </DisclosurePanel>
      </Card>
    </Disclosure>
  )
}
