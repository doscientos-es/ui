'use client'

import { CheckIcon } from 'lucide-react'
import { useMemo, useState, type ReactNode } from 'react'
import { FieldError, Label, Text, type ComboBoxProps, type Key } from 'react-aria-components'

import { cn } from '../../lib/cn'
import { searchScore } from '../../lib/fuzzy-search'
import {
  Combobox,
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  type ComboboxFilterMode,
} from '../combobox/combobox'
import { MultiSelectTags, type SelectionItem } from './multi-select-tags'

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
  /** Use external for results already filtered and ordered by the caller. Defaults to fuzzy. */
  filterMode?: ComboboxFilterMode
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
  filterMode = 'fuzzy',
  selectedLabel = 'Opciones seleccionadas',
  removeLabel = 'Quitar',
  className,
  inputValue: controlledInputValue,
  defaultInputValue,
  onInputChange,
  defaultFilter,
  ...props
}: MultiSelectComboboxProps<T>) {
  const [internalInputValue, setInternalInputValue] = useState(defaultInputValue ?? '')
  const inputValue = controlledInputValue ?? internalInputValue
  const options = useMemo(() => {
    const mapped = items.map((item) => ({ id: getItemKey(item), label: getItemLabel(item), item }))
    if (filterMode === 'external' || defaultFilter || !inputValue.trim()) return mapped
    return mapped
      .map((option, index) => ({ option, index, score: searchScore(option.label, inputValue) }))
      .sort(
        (left, right) =>
          (left.score ?? Infinity) - (right.score ?? Infinity) || left.index - right.index,
      )
      .map(({ option }) => option)
  }, [items, getItemKey, getItemLabel, inputValue, defaultFilter, filterMode])
  const locked = props.isDisabled || props.isReadOnly

  return (
    <Combobox<SelectionItem<T>, 'multiple'>
      {...props}
      data-slot="multi-select-combobox"
      selectionMode="multiple"
      defaultItems={options}
      inputValue={inputValue}
      onInputChange={(value) => {
        setInternalInputValue(value)
        onInputChange?.(value)
      }}
      defaultFilter={
        filterMode === 'external'
          ? () => true
          : (defaultFilter ?? ((text, query) => searchScore(text, query) !== null))
      }
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
        {(valueProps) => (
          <MultiSelectTags
            {...valueProps}
            locked={locked}
            isDisabled={props.isDisabled}
            selectedLabel={selectedLabel}
            removeLabel={removeLabel}
          />
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
