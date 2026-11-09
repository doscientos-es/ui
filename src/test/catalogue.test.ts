import { readFileSync, readdirSync } from 'node:fs'
import { dirname, relative, resolve, sep } from 'node:path'

import { describe, expect, it } from 'vitest'

// happy-dom supplies an HTTP import.meta.url; filesystem checks use the package root.
const src = resolve(process.cwd(), 'src')
const ui = resolve(src, 'ui')
const publicFamilies = [
  ...new Set(
    [...readFileSync(resolve(src, 'index.ts'), 'utf8').matchAll(/from '\.\/ui\/([^/]+)\//g)].map(
      (match) => match[1]!,
    ),
  ),
].sort()

function filesIn(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = resolve(directory, entry.name)
    return entry.isDirectory() ? filesIn(path) : [path]
  })
}

function referencedFamilies(kind: 'stories' | 'test') {
  const families = new Set<string>()
  for (const file of filesIn(src).filter((path) => new RegExp(`\\.${kind}\\.tsx?$`).test(path))) {
    for (const match of readFileSync(file, 'utf8').matchAll(/from ['"]([^'"]+)['"]/g)) {
      if (!match[1]?.startsWith('.')) continue
      const target = relative(ui, resolve(dirname(file), match[1]))
      if (!target.startsWith('..')) families.add(target.split(sep)[0]!)
    }
  }
  return families
}

describe('public component catalogue', () => {
  it.each(['stories', 'test'] as const)('every public family is represented by %s', (kind) => {
    const referenced = referencedFamilies(kind)
    expect(publicFamilies.filter((family) => !referenced.has(family))).toEqual([])
  })
})
