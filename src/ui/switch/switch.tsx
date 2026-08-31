'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { Switch as AriaSwitch, type SwitchProps as AriaSwitchProps } from 'react-aria-components'

import { cn } from '../../lib/cn'

const switchSizes = {
  sm: {
    control: 'h-4 w-[1.875rem] p-0.5',
    thumb: 'h-3',
    idleWidth: '0.75rem',
    activeWidth: '1rem',
    selectedOffset: '0.875rem',
    activeSelectedOffset: '0.625rem',
  },
  md: {
    control: 'h-5 w-9 p-0.5',
    thumb: 'h-4',
    idleWidth: '1rem',
    activeWidth: '1.25rem',
    selectedOffset: '1rem',
    activeSelectedOffset: '0.75rem',
  },
  lg: {
    control: 'h-6 w-11 p-0.5',
    thumb: 'h-5',
    idleWidth: '1.25rem',
    activeWidth: '1.5rem',
    selectedOffset: '1.25rem',
    activeSelectedOffset: '1rem',
  },
} as const

export type SwitchProps = Omit<AriaSwitchProps, 'className'> & {
  className?: string
  size?: keyof typeof switchSizes
  description?: ReactNode
  icon?: ReactNode
  selectedIcon?: ReactNode
}

/** Accessible React Aria switch with semantic tokens and a compact capsule thumb. */
export function Switch({
  className,
  children,
  description,
  icon,
  inputRef,
  isDisabled,
  isReadOnly,
  selectedIcon,
  size = 'sm',
  ...props
}: SwitchProps) {
  const styles = switchSizes[size]
  const fallbackInputRef = useRef<HTMLInputElement>(null)
  const resolvedInputRef = inputRef ?? fallbackInputRef

  useEffect(() => {
    const input = resolvedInputRef.current
    if (!input) return

    const handleDirectionalKey = (event: KeyboardEvent) => {
      if (
        event.target !== input ||
        event.defaultPrevented ||
        isDisabled ||
        isReadOnly ||
        event.altKey ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey
      )
        return

      const nextSelected =
        event.key === 'ArrowRight' ? true : event.key === 'ArrowLeft' ? false : null
      if (nextSelected === null) return

      event.preventDefault()
      if (input.checked !== nextSelected) input.click()
    }

    const ownerDocument = input.ownerDocument
    ownerDocument.addEventListener('keydown', handleDirectionalKey)
    return () => ownerDocument.removeEventListener('keydown', handleDirectionalKey)
  }, [isDisabled, isReadOnly, resolvedInputRef])

  return (
    <AriaSwitch
      data-slot="switch"
      data-size={size}
      inputRef={resolvedInputRef}
      isDisabled={isDisabled}
      isReadOnly={isReadOnly}
      className={cn(
        'group/switch inline-flex cursor-pointer items-center gap-3 text-sm text-foreground outline-none select-none',
        'data-disabled:cursor-not-allowed data-disabled:opacity-50',
        className,
      )}
      {...props}
    >
      {(state) => {
        const isThumbActive = state.isHovered || state.isPressed
        const thumbOffset = state.isSelected
          ? isThumbActive
            ? styles.activeSelectedOffset
            : styles.selectedOffset
          : '0'

        return (
          <>
            <span
              aria-hidden="true"
              data-slot="switch-control"
              className={cn(
                'relative inline-flex shrink-0 items-center overflow-hidden rounded-full border border-border bg-input shadow-inner',
                'transition-[background-color,border-color,box-shadow] duration-200 ease-out motion-reduce:transition-none',
                'group-data-hovered/switch:bg-muted-foreground/25',
                'group-data-selected/switch:border-primary group-data-selected/switch:bg-primary',
                'group-data-selected/switch:group-data-hovered/switch:bg-primary/85',
                'group-data-focus-visible/switch:ring-3 group-data-focus-visible/switch:ring-ring/50',
                styles.control,
              )}
            >
              <span
                data-slot="switch-thumb"
                style={{
                  transform: `translate3d(${thumbOffset}, 0, 0)`,
                  width: isThumbActive ? styles.activeWidth : styles.idleWidth,
                }}
                className={cn(
                  'grid shrink-0 place-items-center rounded-full border border-border/60 bg-background text-[0.625rem] text-muted-foreground shadow-sm',
                  'will-change-[transform,width] transition-[transform,width,background-color,color,border-color] duration-[240ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] motion-reduce:transition-none',
                  'group-data-selected/switch:border-primary-foreground/20',
                  'group-data-selected/switch:bg-primary-foreground group-data-selected/switch:text-primary',
                  styles.thumb,
                )}
              >
                {state.isSelected ? (selectedIcon ?? icon) : icon}
              </span>
            </span>
            {children || description ? (
              <span className="grid gap-0.5 leading-tight">
                {children ? (
                  <span data-slot="switch-label" className="font-medium">
                    {typeof children === 'function' ? children(state) : children}
                  </span>
                ) : null}
                {description ? (
                  <span
                    data-slot="switch-description"
                    className="text-muted-foreground text-xs font-normal"
                  >
                    {description}
                  </span>
                ) : null}
              </span>
            ) : null}
          </>
        )
      }}
    </AriaSwitch>
  )
}
