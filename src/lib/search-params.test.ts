import { describe, expect, it } from 'vitest'

import {
  readSearchParamArray,
  readSearchParamEnum,
  readSearchParamInt,
  toSearchParams,
  updateSearchParams,
} from './search-params'

describe('search params', () => {
  it('updates filters without dropping unrelated values and preserves false and zero', () => {
    const next = updateSearchParams('q=hotel&page=3', {
      q: '',
      status: ['active', 'pending'],
      archived: false,
      page: 0,
    })

    expect(next.get('q')).toBeNull()
    expect(next.getAll('status')).toEqual(['active', 'pending'])
    expect(next.get('archived')).toBe('false')
    expect(next.get('page')).toBe('0')
  })

  it('reads params consistently from server-style records', () => {
    const params = toSearchParams({ status: ['active', 'pending'], page: '3', sort: 'name' })

    expect(readSearchParamArray(params, 'status')).toEqual(['active', 'pending'])
    expect(readSearchParamInt(params, 'page', 1, { min: 1, max: 10 })).toBe(3)
    expect(readSearchParamEnum(params, 'sort', ['name', 'date'] as const, 'date')).toBe('name')
  })

  it('falls back for invalid numeric and enum filter values', () => {
    expect(readSearchParamInt('', 'page', 1, { min: 1 })).toBe(1)
    expect(readSearchParamInt('page=-2', 'page', 1, { min: 1 })).toBe(1)
    expect(readSearchParamEnum('sort=unknown', 'sort', ['name', 'date'] as const, 'date')).toBe(
      'date',
    )
  })
})
