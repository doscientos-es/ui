import { access, mkdir, readdir, rm, writeFile } from 'node:fs/promises'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../', import.meta.url))
const uiDir = join(root, 'src', 'ui')
const entriesDir = join(root, 'src', 'generated-entrypoints')

const folders = (await readdir(uiDir, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort()

await rm(entriesDir, { recursive: true, force: true })
await mkdir(entriesDir, { recursive: true })

const publicEntries = []
for (const name of folders) {
  const source = join(uiDir, name, `${name}.tsx`)
  try {
    await access(source)
  } catch {
    continue
  }
  const entry = join(entriesDir, `${name}.ts`)
  const importPath = relative(entriesDir, source)
    .replaceAll('\\', '/')
    .replace(/\.tsx$/, '')
  await writeFile(
    entry,
    `export * from '${importPath.startsWith('.') ? importPath : `./${importPath}`}'\n`,
  )
  publicEntries.push(name)
}

// Non-visual subpaths. `hooks` is client-only; `utils` is pure and server-safe
// (see tsup.config.ts, which builds it without the "use client" banner).
const groupedEntries = {
  hooks: [
    'hooks/use-async-action',
    'hooks/use-autosave',
    'hooks/use-clipboard',
    'hooks/use-debounced-value',
    'hooks/use-form-dirty',
    'hooks/use-is-mobile',
    'lib/action-ripple',
  ],
  utils: ['lib/cn', 'lib/search-params', 'lib/text-match'],
}
for (const [name, modules] of Object.entries(groupedEntries)) {
  await writeFile(
    join(entriesDir, `${name}.ts`),
    modules.map((module) => `export * from '../${module}'\n`).join(''),
  )
  publicEntries.push(name)
}

await writeFile(join(entriesDir, 'manifest.json'), `${JSON.stringify(publicEntries, null, 2)}\n`)
process.stdout.write(`Generated ${publicEntries.length} @doscientos/ui component entrypoints.\n`)
