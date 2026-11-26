import { describe, expect, it } from 'vitest'

import { rankSearchItems, searchScore } from './fuzzy-search'

describe('fuzzy search', () => {
  it.each([
    ['García', 'garcia'],
    ['García', 'garica'],
    ['García', 'garca'],
    ['García', 'garccia'],
    ['García', 'garxia'],
    ['Ana García', 'garica'],
  ])('matches %s with %s', (label, query) => {
    expect(searchScore(label, query)).not.toBeNull()
  })

  it('does not introduce typo matches for short or unrelated queries', () => {
    expect(searchScore('Ana', 'Anx')).toBeNull()
    expect(searchScore('García', 'zzzz')).toBeNull()
    expect(searchScore('García', 'zzzzzzzz')).toBeNull()
  })

  it('prioritizes exact, prefix and substring matches before fuzzy matches', () => {
    const labels = ['García', 'La garcia', 'Garcia Ruiz', 'garcia', 'García Soto', 'Otro']
    expect(rankSearchItems(labels, 'garcia', (label) => label)).toEqual([
      'García', 'garcia', 'Garcia Ruiz', 'García Soto', 'La garcia',
    ])
    expect(rankSearchItems(['garica', 'La garcia', 'garcia'], 'garcia', (label) => label))
      .toEqual(['garcia', 'La garcia', 'garica'])
    expect(rankSearchItems(labels, ' ', (label) => label)).toEqual(labels)
  })
})