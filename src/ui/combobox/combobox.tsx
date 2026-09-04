import { Fragment, useMemo, useState, type ReactNode } from 'react'
import {
  ComboBox as AriaComboBox,
  ComboBoxValue,
  FieldError,
  Input,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  Text,
  type ComboBoxProps,
  type InputProps,
  type Key,
  type ListBoxItemProps,
  type ListBoxProps,
} from 'react-aria-components'

import { cn } from '../../lib/cn'
import { floatingSurfaceClassName } from '../../lib/floating-surface'
import { getTextMatchParts } from '../../lib/text-match'

export const Combobox = AriaComboBox
export { ComboBoxValue as ComboboxValue }
export type { ComboBoxProps }

export function ComboboxInput({ className, ...props }: InputProps) {
  return (
    <Input
      data-slot="combobox-input"
      className={cn(
        'h-9 w-full rounded-lg border border-border bg-background px-2.5 text-sm text-foreground outline-none placeholder:text-muted-foreground focus-visible:ring-3 focus-visible:ring-ring/50',
        className,
      )}
      {...props}
    />
  )
}
export function ComboboxContent({ className, ...props }: React.ComponentProps<typeof Popover>) {
  return (
    <Popover
      data-slot="combobox-content"
      className={cn(
        floatingSurfaceClassName,
        'max-h-72 w-(--trigger-width) overflow-hidden rounded-xl border border-border bg-background p-1.5 text-foreground',
        className,
      )}
      {...props}
    />
  )
}
export function ComboboxList<T extends object>({
  className,
  emptyState,
  ...props
}: ListBoxProps<T> & { emptyState?: React.ReactNode }) {
  return (
    <ListBox
      data-slot="combobox-list"
      className={cn('max-h-64 overflow-y-auto', className)}
      renderEmptyState={emptyState ? () => emptyState : undefined}
      {...props}
    />
  )
}
export function ComboboxItem<T extends object>({
  className,
  children,
  ...props
}: ListBoxItemProps<T>) {
  return (
    <ListBoxItem
      data-slot="combobox-item"
      className={cn(
        'flex w-full cursor-default items-center justify-between rounded-md px-2 py-2 text-sm outline-none transition-colors data-focused:bg-muted data-focused:text-foreground data-hovered:bg-muted data-disabled:pointer-events-none data-disabled:opacity-50',
        className,
      )}
      {...props}
    >
      {children}
    </ListBoxItem>
  )
}
export function HighlightMatch({
  text,
  query,
  className,
}: {
  text: string
  query: string
  className?: string
}) {
  return (
    <span className={className}>
      {getTextMatchParts(text, query).map((part, index) =>
        part.match ? (
          <mark
            key={`${part.text}-${index}`}
            className="bg-accent text-accent-foreground rounded px-0.5"
          >
            {part.text}
          </mark>
        ) : (
          <Fragment key={`${part.text}-${index}`}>{part.text}</Fragment>
        ),
      )}
    </span>
  )
}

export type AutocompleteComboboxProps<T extends object> = Omit<
  ComboBoxProps<T>,
  | 'children'
  | 'items'
  | 'inputValue'
  | 'onInputChange'
  | 'selectedKey'
  | 'onSelectionChange'
  | 'defaultFilter'
  | 'onKeyDown'
> & {
  items: readonly T[]
  getItemKey: (item: T) => Key
  getItemLabel: (item: T) => string
  renderItem?: (item: T, query: string) => ReactNode
  inputValue?: string
  onInputChange?: (value: string) => void
  selectedKey?: Key | null
  onSelectionChange?: (key: Key | null, item?: T) => void
  label?: ReactNode
  description?: ReactNode
  errorMessage?: ReactNode
  emptyState?: ReactNode
  suggestion?: boolean
  placeholder?: string
  /** Keyboard handler for the underlying text input. */
  onKeyDown?: InputProps['onKeyDown']
}

/** A safe, keyboard-first autocomplete for users, contracts and other entities. */
export function AutocompleteCombobox<T extends object>({
  items,
  getItemKey,
  getItemLabel,
  renderItem,
  inputValue: controlledInputValue,
  onInputChange,
  selectedKey,
  onSelectionChange,
  label,
  description,
  errorMessage,
  emptyState = (
    <p className="text-muted-foreground px-3 py-7 text-center text-sm">No hay resultados.</p>
  ),
  suggestion = true,
  placeholder,
  className,
  onKeyDown,
  ...props
}: AutocompleteComboboxProps<T>) {
  const [internalInputValue, setInternalInputValue] = useState('')
  const inputValue = controlledInputValue ?? internalInputValue
  const setInputValue = (value: string) => {
    setInternalInputValue(value)
    onInputChange?.(value)
  }
  const normalizedQuery = inputValue.trim().toLocaleLowerCase()
  const filteredItems = useMemo(
    () =>
      normalizedQuery
        ? items.filter((item) => getItemLabel(item).toLocaleLowerCase().includes(normalizedQuery))
        : [...items],
    [getItemLabel, items, normalizedQuery],
  )
  const suggestedItem = useMemo(
    () =>
      !suggestion || !normalizedQuery
        ? undefined
        : items.find(
            (item) =>
              getItemLabel(item).toLocaleLowerCase().startsWith(normalizedQuery) &&
              getItemLabel(item).length > inputValue.length,
          ),
    [getItemLabel, inputValue.length, items, normalizedQuery, suggestion],
  )
  const suggestionLabel = suggestedItem ? getItemLabel(suggestedItem) : undefined
  const acceptSuggestion = () => {
    if (!suggestedItem || !suggestionLabel) return false
    setInputValue(suggestionLabel)
    onSelectionChange?.(getItemKey(suggestedItem), suggestedItem)
    return true
  }
  const handleKeyDown = (event: Parameters<NonNullable<InputProps['onKeyDown']>>[0]) => {
    onKeyDown?.(event)
    if (event.defaultPrevented) return
    if ((event.key === 'Tab' || event.key === 'Enter') && acceptSuggestion()) event.preventDefault()
  }
  return (
    <AriaComboBox<T>
      {...props}
      className={cn('group/combobox flex w-full flex-col gap-1.5', className)}
      items={filteredItems}
      selectedKey={selectedKey}
      inputValue={inputValue}
      onInputChange={setInputValue}
      onSelectionChange={(key) => {
        const item = filteredItems.find(
          (candidate) => String(getItemKey(candidate)) === String(key),
        )
        if (item) setInputValue(getItemLabel(item))
        onSelectionChange?.(key, item)
      }}
    >
      {label && <Label className="text-foreground text-sm font-medium">{label}</Label>}
      <div className="relative">
        {suggestionLabel && (
          <span
            aria-hidden="true"
            className="text-muted-foreground/60 pointer-events-none absolute inset-y-0 left-2.5 z-0 flex items-center text-sm whitespace-pre"
          >
            <span className="text-transparent">{inputValue}</span>
            {suggestionLabel.slice(inputValue.length)}
          </span>
        )}
        <ComboboxInput
          aria-autocomplete={suggestionLabel ? 'both' : 'list'}
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          className="relative z-10 bg-transparent"
        />
      </div>
      {description && (
        <Text slot="description" className="text-muted-foreground text-xs">
          {description}
        </Text>
      )}
      {errorMessage && <FieldError className="text-destructive text-xs">{errorMessage}</FieldError>}
      <ComboboxContent>
        <ComboboxList<T> emptyState={emptyState}>
          {(item) => (
            <ComboboxItem id={getItemKey(item)} textValue={getItemLabel(item)}>
              {renderItem ? (
                renderItem(item, inputValue)
              ) : (
                <HighlightMatch text={getItemLabel(item)} query={inputValue} />
              )}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </AriaComboBox>
  )
}
