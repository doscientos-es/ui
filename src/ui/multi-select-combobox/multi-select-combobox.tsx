'use client'

import { CheckIcon, XIcon } from 'lucide-react'
import { useMemo, type ReactNode } from 'react'
import {
  FieldError,
  Label,
  Tag,
  TagGroup,
  TagList,
  Text,
  type ComboBoxProps,
  type Key,
} from 'react-aria-components'

import { cn } from '../../lib/cn'
import { Button } from '../button/button'
import {
  Combobox,
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
} from '../combobox/combobox'

type SelectionItem<T> = { id: Key; label: string; item: T }

export type MultiSelectComboboxProps<T extends object> = Omit<
  ComboBoxProps<SelectionItem<T>, 'multiple'>,
  'children' | 'items' | 'defaultItems' | 'selectionMode' | 'allowsCustomValue'
> & {
  items: readonly T[]
  getItemKey: (item: T) => Key
  getItemLabel: (item: T) => string
  renderItem?: (item: T) => ReactNode
  label?: string
  description?: ReactNode
  errorMessage?: ReactNode
  placeholder?: string
  emptyState?: ReactNode
  selectedLabel?: string
  /** Verb for the remove action; React Aria appends the tag's accessible name. */
  removeLabel?: string
}

/** Searchable multiple selection using the existing combobox slots and React Aria tags. */
export function MultiSelectCombobox<T extends object>({
  items,
  getItemKey,
  getItemLabel,
  renderItem,
  label,
  description,
  errorMessage,
  placeholder = 'Buscar…',
  emptyState = 'No hay resultados.',
  selectedLabel = 'Opciones seleccionadas',
  removeLabel = 'Quitar',
  className,
  ...props
}: MultiSelectComboboxProps<T>) {
  const options = useMemo(
    () => items.map((item) => ({ id: getItemKey(item), label: getItemLabel(item), item })),
    [items, getItemKey, getItemLabel],
  )
  const locked = props.isDisabled || props.isReadOnly

  return (
    <Combobox<SelectionItem<T>, 'multiple'>
      {...props}
      data-slot="multi-select-combobox"
      selectionMode="multiple"
      defaultItems={options}
      allowsEmptyCollection
      className={(state) =>
        cn(
          'flex w-full min-w-0 flex-col gap-1.5',
          typeof className === 'function' ? className(state) : className,
        )
      }
    >
      {label && <Label className="text-foreground text-sm font-medium">{label}</Label>}
      <ComboboxInput placeholder={placeholder} />
      <ComboboxValue<SelectionItem<T>>>
        {({ selectedItems, state }) => (
          <TagGroup
            aria-label={selectedLabel}
            onRemove={
              locked
                ? undefined
                : (keys) => {
                  if (Array.isArray(state.value))
                    state.setValue(state.value.filter((key) => !keys.has(key)))
                }
            }
          >
            <TagList
              items={selectedItems.filter((item) => item !== null)}
              className="flex flex-wrap gap-1.5 empty:hidden"
            >
              {(option) => (
                <Tag
                  id={option.id}
                  textValue={option.label}
                  isDisabled={props.isDisabled}
                  className="bg-muted text-foreground data-focus-visible:ring-ring/50 flex min-w-0 items-center gap-1 rounded-md py-1 pr-1 pl-2 text-sm outline-none data-focus-visible:ring-3"
                >
                  <span className="min-w-0 wrap-break-word">{option.label}</span>
                  {!locked && (
                    <Button
                      slot="remove"
                      variant="ghost"
                      size="icon-sm"
                      className="[@media(pointer:coarse)]:min-h-11 [@media(pointer:coarse)]:min-w-11"
                      aria-label={removeLabel}
                    >
                      <XIcon aria-hidden="true" />
                    </Button>
                  )}
                </Tag>
              )}
            </TagList>
          </TagGroup>
        )}
      </ComboboxValue>
      {description && (
        <Text slot="description" className="text-muted-foreground text-xs">
          {description}
        </Text>
      )}
      {errorMessage && <FieldError className="text-destructive text-xs">{errorMessage}</FieldError>}
      <ComboboxContent>
        <ComboboxList<SelectionItem<T>>
          emptyState={
            <p className="text-muted-foreground px-3 py-7 text-center text-sm">{emptyState}</p>
          }
        >
          {(option) => (
            <ComboboxItem id={option.id} textValue={option.label}>
              {({ isSelected }) => (
                <>
                  <span className="min-w-0 break-words">
                    {renderItem ? renderItem(option.item) : option.label}
                  </span>
                  {isSelected && <CheckIcon aria-hidden="true" className="size-4 shrink-0" />}
                </>
              )}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}
