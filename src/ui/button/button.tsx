'use client'

import type { VariantProps } from 'class-variance-authority'
import { LoaderCircle } from 'lucide-react'
import type * as React from 'react'
import {
  Button as ButtonPrimitive,
  type ButtonProps as ButtonPrimitiveProps,
  Link as LinkPrimitive,
  type LinkProps as LinkPrimitiveProps,
  ProgressBar,
} from 'react-aria-components'

import { useActionRipple } from '../../lib/action-ripple'
import { cn } from '../../lib/cn'
import { buttonVariants } from './button-variants'

/** Props for a button that triggers an in-page action. */
export type ButtonProps = Omit<ButtonPrimitiveProps, 'className' | 'ref'> &
  VariantProps<typeof buttonVariants> & {
    /** Native button ref, passed as a regular prop in React 19. */
    ref?: React.Ref<HTMLButtonElement>
    /** @deprecated Use `isDisabled`. Kept as an HTML-compatible alias. */
    disabled?: boolean
    /** Visual treatment for the action's priority and intent. */
    variant?: VariantProps<typeof buttonVariants>['variant']
    /** Preset height, spacing and icon dimensions. */
    size?: VariantProps<typeof buttonVariants>['size']
    /** Optional progress label for `isPending`. Space is reserved before the action starts. */
    pendingLabel?: string
    className?: string
  }

function ButtonPendingContent({
  children,
  isPending,
  label,
}: {
  children: React.ReactNode
  isPending: boolean
  label: string
}) {
  const layer = 'col-start-1 row-start-1 flex items-center justify-center gap-[inherit]'

  return (
    <span className="inline-grid gap-[inherit]">
      <span aria-hidden={isPending || undefined} className={cn(layer, isPending && 'invisible')}>
        {children}
      </span>
      <span
        aria-hidden={!isPending || undefined}
        className={cn(
          layer,
          'pointer-events-none motion-safe:transition-opacity motion-safe:duration-150',
          !isPending && 'opacity-0',
        )}
      >
        <ProgressBar aria-label={label} isIndeterminate className="flex items-center">
          <LoaderCircle
            aria-hidden="true"
            className={cn('size-3.5', isPending && 'motion-safe:animate-spin')}
          />
        </ProgressBar>
        <span>{label}</span>
      </span>
    </span>
  )
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
  ref,
  onClick,
  onPress,
  pendingLabel,
  ...props
}: ButtonProps) {
  const { ripple, triggerRipple } = useActionRipple(variant !== 'link')

  return (
    <ButtonPrimitive
      ref={ref}
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
      {(renderProps) => {
        const content = typeof children === 'function' ? children(renderProps) : children
        return (
          <>
            {pendingLabel ? (
              <ButtonPendingContent label={pendingLabel} isPending={renderProps.isPending}>
                {content}
              </ButtonPendingContent>
            ) : (
              content
            )}
            {ripple}
          </>
        )
      }}
    </ButtonPrimitive>
  )
}

/** Props for a link styled consistently with {@link Button}. */
export type LinkButtonProps = Omit<LinkPrimitiveProps, 'className' | 'ref'> &
  VariantProps<typeof buttonVariants> & {
    /** Native anchor ref, passed as a regular prop in React 19. */
    ref?: React.Ref<HTMLAnchorElement>
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
  ref,
  onClick,
  onPress,
  ...props
}: LinkButtonProps) {
  const { ripple, triggerRipple } = useActionRipple(variant !== 'link')

  return (
    <LinkPrimitive
      ref={ref}
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
