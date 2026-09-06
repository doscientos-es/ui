import { readFile } from 'node:fs/promises'

const packageUrl = new URL('../package.json', import.meta.url)
const packageJson = JSON.parse(await readFile(packageUrl, 'utf8'))

if (!packageJson.dependencies?.['lucide-react']) {
  throw new Error(
    'lucide-react debe declararse en dependencies porque @doscientos/ui lo importa internamente.',
  )
}

if (!packageJson.dependencies?.sileo) {
  throw new Error(
    'sileo debe declararse en dependencies porque @doscientos/ui lo usa para los toasts.',
  )
}

// Keep the release gate executable when script names change.
if (packageJson.scripts['quality:quick'] !== 'pnpm format:check && pnpm lint') {
  throw new Error('quality:quick debe comprobar formato y lint sin modificar archivos')
}
if (packageJson.scripts['hooks:install'] !== 'node .githooks/install.mjs') {
  throw new Error('hooks:install debe instalar la receta local revisada')
}
const qualityCommands = packageJson.scripts.quality.split('&&').map((command) => command.trim())
for (const command of qualityCommands) {
  const match = /^pnpm ([a-z:-]+)$/.exec(command)
  if (!match || !packageJson.scripts[match[1]]) {
    throw new Error(`quality referencia un script inexistente o no soportado: ${command}`)
  }
}
for (const required of ['format:check', 'lint', 'typecheck', 'test']) {
  if (!qualityCommands.includes(`pnpm ${required}`)) {
    throw new Error(`quality debe ejecutar pnpm ${required}`)
  }
}
