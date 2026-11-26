import { normalizeSearchText } from './normalize-search-text'

// A single insertion, deletion, substitution, or adjacent transposition.
function isOneEditAway(left: string, right: string) {
  if (Math.abs(left.length - right.length) > 1) return false
  let index = 0
  while (index < left.length && left[index] === right[index]) index += 1
  if (index === left.length || index === right.length) return true
  if (left.length === right.length) {
    return left.slice(index + 1) === right.slice(index + 1) || (
      left[index] === right[index + 1] && left[index + 1] === right[index] &&
      left.slice(index + 2) === right.slice(index + 2)
    )
  }
  return left.length > right.length
    ? left.slice(index + 1) === right.slice(index)
    : left.slice(index) === right.slice(index + 1)
}

/** Rank exact, prefix, substring, and one-edit substring matches; null means no match. */
export function searchScore(text: string, query: string): number | null {
  const label = normalizeSearchText(text)
  const term = normalizeSearchText(query.trim())
  if (!term) return 0
  if (label === term) return 0
  if (label.startsWith(term)) return 1
  if (label.includes(term)) return 2
  if (term.length < 4) return null

  for (let start = 0; start < label.length; start += 1) {
    for (const length of [term.length - 1, term.length, term.length + 1]) {
      if (start + length <= label.length && isOneEditAway(label.slice(start, start + length), term)) {
        return 3
      }
    }
  }
  return null
}

/** Return matches in relevance order, keeping the original order for equal scores. */
export function rankSearchItems<T>(items: readonly T[], query: string, getLabel: (item: T) => string): T[] {
  return items
    .map((item, index) => ({ item, index, score: searchScore(getLabel(item), query) }))
    .filter((entry): entry is typeof entry & { score: number } => entry.score !== null)
    .sort((left, right) => left.score - right.score || left.index - right.index)
    .map(({ item }) => item)
}