'use client'

import type { VariantProps } from 'class-variance-authority'
import type * as React from 'react'
import { useState } from 'react'
import {
  Button as ButtonPrimitive,
  type ButtonProps as ButtonPrimitiveProps,
  Link as LinkPrimitive,
  type LinkProps as LinkPrimitiveProps,
} from 'react-aria-components'

import { cn } from '../../lib/cn'
import { buttonVariants } from './button-variants'

type RipplePosition = {
  x: string
  y: string
}

type Ripple = {
  id: number
  position: RipplePosition
}

const centeredRipplePosition: RipplePosition = { x: '50%', y: '50%' }

type RippleEvent = {
  pointerType?: string
  x?: number
  y?: number
}

function getRipplePosition(event: RippleEvent): RipplePosition {
  if (event.pointerType === 'keyboard' || event.pointerType === 'virtual') {
    return centeredRipplePosition
  }

  if (event.x === undefined || event.y === undefined) {
    return centeredRipplePosition
  }

  return {
    x: `${event.x}px`,
    y: `${event.y}px`,
  }
}

function useActionRipple(enabled: boolean) {
  const [ripple, setRipple] = useState<Ripple | null>(null)

  function triggerRipple(event: RippleEvent) {
    if (!enabled) return

    const position = getRipplePosition(event)
    setRipple((currentRipple) => ({
      id: (currentRipple?.id ?? 0) + 1,
      position,
    }))
  }

  const rippleElement = ripple ? (
    <span
      key={ripple.id}
      aria-hidden="true"
      data-slot="button-ripple"
      className="animate-ui-ripple pointer-events-none absolute aspect-square w-full rounded-full motion-reduce:hidden"
      style={{ left: ripple.position.x, top: ripple.position.y }}
      onAnimationEnd={() =>
        setRipple((currentRipple) => (currentRipple?.id === ripple.id ? null : currentRipple))
      }
    />
  ) : null

  return { ripple: rippleElement, triggerRipple }
}

/** Props for a button that triggers an in-page action. */
export type ButtonProps = Omit<ButtonPrimitiveProps, 'className'> &
  React.RefAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    /** HTML-compatible alias for `isDisabled`. */
    disabled?: boolean
    /** Visual treatment for the action's priority and intent. */
    variant?: VariantProps<typeof buttonVariants>['variant']
    /** Preset height, spacing and icon dimensions. */
    size?: VariantProps<typeof buttonVariants>['size']
    className?: string
  }

/**
 * Accessible button with visual variants and a press ripple.
 * Provide an `aria-label` when it contains only an icon.
 */
export function Button({
  className,
  variant = 'default',
  size = 'default',
  children,
  disabled,
  isDisabled,
  onClick,
  onPress,
  ...props
}: ButtonProps) {
  const { ripple, triggerRipple } = useActionRipple(variant !== 'link')

  return (
    <ButtonPrimitive
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      onClick={onClick}
      isDisabled={isDisabled ?? disabled}
      onPress={(event) => {
        onPress?.(event)
        triggerRipple(event)
      }}
      {...props}
    >
      {(renderProps) => (
        <>
          {typeof children === 'function' ? children(renderProps) : children}
          {ripple}
        </>
      )}
    </ButtonPrimitive>
  )
}

/** Props for a link styled consistently with {@link Button}. */
export type LinkButtonProps = Omit<LinkPrimitiveProps, 'className'> &
  VariantProps<typeof buttonVariants> & {
    /** Visual treatment for the navigation action's priority and intent. */
    variant?: VariantProps<typeof buttonVariants>['variant']
    /** Preset height, spacing and icon dimensions. */
    size?: VariantProps<typeof buttonVariants>['size']
    className?: string
  }

/**
 * Navigation link styled as a {@link Button}.
 * Provide an `aria-label` when it contains only an icon.
 */
export function LinkButton({
  className,
  variant = 'default',
  size = 'default',
  children,
  onClick,
  onPress,
  ...props
}: LinkButtonProps) {
  const { ripple, triggerRipple } = useActionRipple(variant !== 'link')

  return (
    <LinkPrimitive
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      onClick={onClick}
      onPress={(event) => {
        onPress?.(event)
        triggerRipple(event)
      }}
      {...props}
    >
      {(renderProps) => (
        <>
          {typeof children === 'function' ? children(renderProps) : children}
          {ripple}
        </>
      )}
    </LinkPrimitive>
  )
}
