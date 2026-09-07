'use client'

import type { VariantProps } from 'class-variance-authority'
import type * as React from 'react'
import {
  Button as ButtonPrimitive,
  type ButtonProps as ButtonPrimitiveProps,
  Link as LinkPrimitive,
  type LinkProps as LinkPrimitiveProps,
} from 'react-aria-components'

import { useActionRipple } from '../../lib/action-ripple'
import { cn } from '../../lib/cn'
import { buttonVariants } from './button-variants'

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
  type = 'button',
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
      type={type}
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
