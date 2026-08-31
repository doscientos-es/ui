import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '../../lib/cn'
import { Button, type ButtonProps } from '../button/button'
import { Input } from '../input/input'
import { Textarea } from '../textarea/textarea'

/** Visually joins an input or textarea with contextual text and actions. */
export function InputGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    // biome-ignore lint/a11y/useSemanticElements: fieldset cannot preserve this inline control composition.
    <div
      role="group"
      data-slot="input-group"
      className={cn(
        'group/input-group relative flex min-h-8 w-full min-w-0 items-center rounded-lg border border-border transition-colors outline-none has-disabled:bg-muted/50 has-disabled:opacity-50 has-[[data-slot=input-group-control]:focus-visible]:border-ring has-[[data-slot=input-group-control]:focus-visible]:ring-3 has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50 has-[[data-slot][aria-invalid=true]]:border-destructive has-[[data-slot][aria-invalid=true]]:ring-3 has-[[data-slot][aria-invalid=true]]:ring-destructive/20 has-[>[data-align^=block]]:h-auto has-[>[data-align^=block]]:flex-col',
        className,
      )}
      {...props}
    />
  )
}

export const inputGroupAddonVariants = cva(
  "flex cursor-text items-center justify-center gap-2 py-1.5 text-sm font-medium text-muted-foreground select-none [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      align: {
        'inline-start': 'order-first pl-2',
        'inline-end': 'order-last pr-2',
        'block-start': 'order-first w-full justify-start px-2.5 pt-2',
        'block-end': 'order-last w-full justify-start px-2.5 pb-2',
      },
    },
    defaultVariants: { align: 'inline-start' },
  },
)
export function InputGroupAddon({
  className,
  align = 'inline-start',
  onClick,
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof inputGroupAddonVariants>) {
  return (
    // biome-ignore lint/a11y/useSemanticElements: this addon delegates focus to its associated input.
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented && !(event.target as HTMLElement).closest('button'))
          event.currentTarget.parentElement?.querySelector<HTMLElement>('input, textarea')?.focus()
      }}
      {...props}
    />
  )
}

const inputGroupButtonVariants = cva('shrink-0 shadow-none', {
  variants: {
    size: { xs: 'h-6 px-1.5 text-xs', sm: 'h-7 px-2', 'icon-xs': 'size-6', 'icon-sm': 'size-7' },
  },
  defaultVariants: { size: 'xs' },
})
export type InputGroupButtonProps = Omit<ButtonProps, 'size'> &
  VariantProps<typeof inputGroupButtonVariants>
export function InputGroupButton({
  className,
  type = 'button',
  variant = 'ghost',
  size = 'xs',
  ...props
}: InputGroupButtonProps) {
  const buttonSize = size === 'icon-xs' || size === 'icon-sm' ? size : size
  return (
    <Button
      data-slot="input-group-button"
      type={type}
      size={buttonSize}
      variant={variant}
      className={cn(inputGroupButtonVariants({ size }), className)}
      {...props}
    />
  )
}

export function InputGroupText({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="input-group-text"
      className={cn(
        "flex items-center gap-2 text-sm text-muted-foreground [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  )
}

export function InputGroupInput({ className, ...props }: React.ComponentProps<typeof Input>) {
  return (
    <Input
      data-slot="input-group-control"
      className={cn(
        'flex-1 rounded-none border-0 bg-transparent shadow-none ring-0 focus-visible:ring-0 disabled:bg-transparent aria-invalid:ring-0',
        className,
      )}
      {...props}
    />
  )
}

export function InputGroupTextarea({ className, ...props }: React.ComponentProps<typeof Textarea>) {
  return (
    <Textarea
      data-slot="input-group-control"
      className={cn(
        'flex-1 resize-none rounded-none border-0 bg-transparent shadow-none ring-0 focus-visible:ring-0',
        className,
      )}
      {...props}
    />
  )
}
