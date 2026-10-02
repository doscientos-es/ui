import { access, readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../', import.meta.url))
const manifest = JSON.parse(
  await readFile(join(root, 'src', 'generated-entrypoints', 'manifest.json'), 'utf8'),
)
const packageJson = JSON.parse(await readFile(join(root, 'package.json'), 'utf8'))

if (!packageJson.exports['./*']) throw new Error('package.json debe exponer el wildcard ./*')
for (const name of manifest) {
  for (const extension of ['js', 'cjs', 'd.ts']) {
    await access(join(root, 'dist', 'generated-entrypoints', `${name}.${extension}`))
  }
}
// `utils` must stay callable from Server Components: no client boundary, no React.
for (const extension of ['js', 'cjs']) {
  const source = await readFile(
    join(root, 'dist', 'generated-entrypoints', `utils.${extension}`),
    'utf8',
  )
  if (/^\s*["']use client["']/.test(source) || /["']react["']/.test(source)) {
    throw new Error(`utils.${extension} no debe ser un módulo cliente ni depender de React`)
  }
}
process.stdout.write(`Verified ${manifest.length} public component entrypoints.\n`)
