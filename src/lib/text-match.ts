export type TextMatchPart = {
  text: string
  match: boolean
}

function normalize(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase()
}

function normalizedTextWithRanges(value: string) {
  const ranges: Array<{ start: number; end: number }> = []
  let normalized = ''
  let sourceIndex = 0

  for (const character of value) {
    const start = sourceIndex
    sourceIndex += character.length
    const normalizedCharacter = normalize(character)
    normalized += normalizedCharacter
    for (let index = 0; index < normalizedCharacter.length; index += 1) {
      ranges.push({ start, end: sourceIndex })
    }
  }

  return { normalized, ranges }
}

/**
 * Splits text into matching and non-matching chunks. Matching is case- and
 * accent-insensitive while preserving the original text for rendering.
 */
export function getTextMatchParts(text: string, query: string): TextMatchPart[] {
  const term = normalize(query.trim())
  if (!term) return [{ text, match: false }]

  const { normalized, ranges } = normalizedTextWithRanges(text)
  const parts: TextMatchPart[] = []
  let sourceCursor = 0
  let index = normalized.indexOf(term)

  while (index !== -1) {
    const rangeStart = ranges[index]?.start
    const rangeEnd = ranges[index + term.length - 1]?.end
    if (rangeStart === undefined || rangeEnd === undefined) break
    if (rangeStart > sourceCursor)
      parts.push({ text: text.slice(sourceCursor, rangeStart), match: false })
    parts.push({ text: text.slice(rangeStart, rangeEnd), match: true })
    sourceCursor = rangeEnd
    index = normalized.indexOf(term, index + term.length)
  }

  if (sourceCursor < text.length) parts.push({ text: text.slice(sourceCursor), match: false })
  return parts.length ? parts : [{ text, match: false }]
}
