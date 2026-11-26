import { Check, ChevronDown } from 'lucide-react'
import type { ReactNode } from 'react'
import {
  Button as AriaButton,
  Select as AriaSelect,
  SelectValue as AriaSelectValue,
  FieldError,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  Text,
  type SelectProps as AriaSelectProps,
  type ButtonProps,
  type Key,
  type ListBoxItemProps,
  type ListBoxProps,
} from 'react-aria-components'

import { cn } from '../../lib/cn'
import { floatingSurfaceClassName } from '../../lib/floating-surface'

/** State container for an accessible select control and its option collection. */
export const Select = AriaSelect
export type { AriaSelectProps as SelectProps }

export type SelectFieldProps<T extends object> = Omit<
  AriaSelectProps<T>,
  'children' | 'selectedKey' | 'defaultSelectedKey' | 'onSelectionChange'
> & {
  items: readonly T[]
  getItemKey: (item: T) => Key
  getItemLabel: (item: T) => string
  renderItem?: (item: T) => ReactNode
  label?: ReactNode
  description?: ReactNode
  errorMessage?: ReactNode
}

/** A labelled single selection with the same item API as the comboboxes. */
export function SelectField<T extends object>({
  items,
  getItemKey,
  getItemLabel,
  renderItem,
  label,
  description,
  errorMessage,
  className,
  ...props
}: SelectFieldProps<T>) {
  return (
    <Select<T>
      {...props}
      className={(state) =>
        cn(
          'flex w-full min-w-0 flex-col gap-1.5',
          typeof className === 'function' ? className(state) : className,
        )
      }
    >
      {label && <Label className="text-foreground text-sm font-medium">{label}</Label>}
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      {description && (
        <Text slot="description" className="text-muted-foreground text-xs">
          {description}
        </Text>
      )}
      {errorMessage && <FieldError className="text-destructive text-xs">{errorMessage}</FieldError>}
      <SelectContent>
        <SelectList<T> items={items}>
          {(item) => (
            <SelectItem id={getItemKey(item)} textValue={getItemLabel(item)}>
              {renderItem ? renderItem(item) : getItemLabel(item)}
            </SelectItem>
          )}
        </SelectList>
      </SelectContent>
    </Select>
  )
}

/** Button that opens the option list of its parent {@link Select}. */
export function SelectTrigger({ className, children, ...props }: ButtonProps) {
  return (
    <AriaButton
      data-slot="select-trigger"
      className={(state) =>
        cn(
          'group/select-trigger border-input bg-background text-foreground enabled:hover:border-muted-foreground data-focus-visible:border-ring data-focus-visible:ring-ring in-data-invalid:border-destructive in-data-invalid:data-focus-visible:border-destructive in-data-invalid:data-focus-visible:ring-destructive box-border flex h-9 w-full min-w-0 items-center gap-2 rounded-lg border px-3 text-left text-base shadow-[var(--ui-shadow-hairline)] transition-[background-color,border-color,box-shadow] outline-none data-disabled:cursor-not-allowed data-disabled:opacity-50 data-focus-visible:ring-3 motion-reduce:transition-none md:text-sm',
          typeof className === 'function' ? className(state) : className,
        )
      }
      {...props}
    >
      {(state) => (
        <>
          {typeof children === 'function' ? children(state) : children}
          <ChevronDown
            aria-hidden="true"
            className="text-muted-foreground ml-auto size-4 shrink-0 transition-transform group-aria-expanded/select-trigger:rotate-180 motion-reduce:transition-none"
          />
        </>
      )}
    </AriaButton>
  )
}

/** Displays the selected option or its placeholder. */
export function SelectValue({ className, ...props }: React.ComponentProps<typeof AriaSelectValue>) {
  return (
    <AriaSelectValue
      data-slot="select-value"
      className={(state) =>
        cn(
          'data-placeholder:text-muted-foreground min-w-0 flex-1 truncate',
          typeof className === 'function' ? className(state) : className,
        )
      }
      {...props}
    />
  )
}

/** Floating surface that contains a {@link SelectList}. */
export function SelectContent({ className, ...props }: React.ComponentProps<typeof Popover>) {
  return (
    <Popover
      data-slot="select-content"
      className={(state) =>
        cn(
          floatingSurfaceClassName,
          'border-border bg-background text-foreground w-(--trigger-width) overflow-hidden rounded-xl border p-1.5',
          typeof className === 'function' ? className(state) : className,
        )
      }
      {...props}
    />
  )
}

/** Scrollable list of {@link SelectItem} options. */
export function SelectList<T extends object>({ className, ...props }: ListBoxProps<T>) {
  return (
    <ListBox
      data-slot="select-list"
      className={(state) =>
        cn(
          'max-h-64 overflow-y-auto overscroll-contain outline-none',
          typeof className === 'function' ? className(state) : className,
        )
      }
      {...props}
    />
  )
}

/** Selectable option within a {@link SelectList}. */
export function SelectItem<T extends object>({
  className,
  children,
  ...props
}: ListBoxItemProps<T>) {
  return (
    <ListBoxItem
      data-slot="select-item"
      className={(state) =>
        cn(
          'data-focused:bg-muted data-selected:bg-muted flex min-h-9 cursor-default items-center gap-2 rounded-md px-2 py-2 text-sm outline-none data-disabled:pointer-events-none data-disabled:opacity-50',
          typeof className === 'function' ? className(state) : className,
        )
      }
      {...props}
    >
      {(state) => (
        <>
          <span className="min-w-0 flex-1">
            {typeof children === 'function' ? children(state) : children}
          </span>
          {state.isSelected && <Check aria-hidden="true" className="size-4 shrink-0" />}
        </>
      )}
    </ListBoxItem>
  )
}
