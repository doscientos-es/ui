import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { describe, expect, it } from 'vitest'

const styles = readFileSync(resolve(dirname(fileURLToPath(import.meta.url)), '../styles.css'), 'utf8')

function fallback(token: string) {
  const match = styles.match(new RegExp(`--ui-${token}: var\\(--${token}, (#[0-9a-f]{6})\\)`))
  if (!match) throw new Error(`Missing light-theme fallback for ${token}`)
  return match[1]
}

function luminance(hex: string) {
  const channels = [1, 3, 5].map((offset) => {
    const channel = Number.parseInt(hex.slice(offset, offset + 2), 16) / 255
    return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4
  })
  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722
}

function contrast(first: string, second: string) {
  const values = [luminance(first), luminance(second)].sort((a, b) => b - a)
  return (values[0] + 0.05) / (values[1] + 0.05)
}

describe('Default UI tokens', () => {
  it.each(['background', 'card', 'surface-subtle', 'muted', 'secondary', 'sidebar'])(
    'keeps muted text at AA contrast against %s',
    (surface) =>
      expect(contrast(fallback('muted-foreground'), fallback(surface))).toBeGreaterThanOrEqual(4.5),
  )

  it.each(['background', 'card', 'surface-subtle'])(
    'keeps the default focus indicator visible against %s',
    (surface) => expect(contrast(fallback('primary'), fallback(surface))).toBeGreaterThanOrEqual(3),
  )
})
