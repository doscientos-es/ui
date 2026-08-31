import {
  ComboBox as AriaComboBox,
  Input as AriaInput,
  ListBox,
  ListBoxItem,
  Popover,
  type ComboBoxProps,
  type ListBoxItemProps,
} from 'react-aria-components'

import { cn } from '../../lib/cn'

/** Searchable command palette built from an accessible combobox and option list. */
export function Command<T extends object>({ className, ...props }: ComboBoxProps<T>) {
  return <AriaComboBox data-slot="command" className={cn('w-full', className)} {...props} />
}

export function CommandInput({ className, ...props }: React.ComponentProps<typeof AriaInput>) {
  return (
    <AriaInput
      data-slot="command-input"
      className={cn(
        'h-9 w-full border-0 bg-transparent px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground',
        className,
      )}
      {...props}
    />
  )
}

export function CommandContent({ className, ...props }: React.ComponentProps<typeof Popover>) {
  return (
    <Popover
      data-slot="command-content"
      className={cn(
        'w-(--trigger-width) overflow-hidden rounded-xl border border-border bg-background p-1.5 shadow-lg outline-none',
        className,
      )}
      {...props}
    />
  )
}

export function CommandList<T extends object>({
  className,
  ...props
}: React.ComponentProps<typeof ListBox<T>>) {
  return (
    <ListBox
      data-slot="command-list"
      className={cn('max-h-72 overflow-y-auto', className)}
      {...props}
    />
  )
}

export function CommandItem<T extends object>({ className, ...props }: ListBoxItemProps<T>) {
  return (
    <ListBoxItem
      data-slot="command-item"
      className={cn(
        'flex cursor-default items-center rounded-md px-2 py-1.5 text-sm outline-none data-focused:bg-muted data-disabled:pointer-events-none data-disabled:opacity-50',
        className,
      )}
      {...props}
    />
  )
}
