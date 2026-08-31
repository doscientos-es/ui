import { describe, expect, it } from 'vitest'

import { actionRipple } from './action-ripple'

describe('actionRipple', () => {
  it('provides reusable clipping and stacking styles', () => {
    const className = actionRipple()

    expect(className).toContain('overflow-hidden')
    expect(className).toContain('isolate')
    expect(className).not.toContain('active:after')
  })

  it('accepts additional classes', () => {
    expect(actionRipple({ className: 'rounded-xl' })).toContain('rounded-xl')
  })
})
