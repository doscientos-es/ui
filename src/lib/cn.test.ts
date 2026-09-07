import { describe, expect, it } from 'vitest'

import { cn } from '~/lib/cn'

describe('cn', () => {
  it('combines conditional values and keeps the final conflicting utility', () => {
    expect(cn('px-2', false, 'px-4', { 'text-sm': true })).toBe('px-4 text-sm')
  })

  it('flattens nested conditional inputs', () => {
    expect(cn('p-2', [null, undefined, false, ['p-4', { hidden: false, flex: true }]])).toBe(
      'p-4 flex',
    )
  })

  it.each([
    ['p-4 px-2', 'px-6', 'p-4 px-6'],
    ['px-2', 'p-4', 'p-4'],
    ['text-sm text-foreground', 'text-destructive', 'text-sm text-destructive'],
    ['border border-border', 'border-destructive', 'border border-destructive'],
    [
      'hover:bg-primary focus:bg-muted',
      'hover:bg-destructive',
      'focus:bg-muted hover:bg-destructive',
    ],
    ['size-8', 'size-10', 'size-10'],
    ['w-[var(--trigger-width)]', 'w-[240px]', 'w-[240px]'],
    ['data-[disabled]:opacity-50', 'data-[disabled]:opacity-100', 'data-[disabled]:opacity-100'],
    ['p-2!', 'p-4!', 'p-4!'],
    ['animate-ui-ripple', 'animate-none', 'animate-none'],
    [
      'motion-safe:data-entering:animate-ui-surface-in',
      'motion-safe:data-entering:animate-ui-overlay-in',
      'motion-safe:data-entering:animate-ui-overlay-in',
    ],
  ])('resolves consumer overrides: %s + %s', (base, override, expected) => {
    expect(cn(base, override)).toBe(expected)
  })

  it('reevaluates mutable conditional objects between calls', () => {
    const classes = { hidden: true, flex: false }
    expect(cn(classes)).toBe('hidden')
    classes.hidden = false
    classes.flex = true
    expect(cn(classes)).toBe('flex')
  })
})
