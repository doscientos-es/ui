import { spawn } from 'node:child_process'
import { createRequire } from 'node:module'
import { dirname, resolve } from 'node:path'

const require = createRequire(import.meta.url)

function resolveBin(packageName, command) {
  const manifest = require.resolve(`${packageName}/package.json`)
  const { bin } = require(manifest)
  return resolve(dirname(manifest), bin[command])
}

// Launch the JavaScript CLIs directly: Windows .cmd shims require a shell.
const commands = [
  [resolveBin('tsup', 'tsup'), '--watch'],
  [
    resolveBin('@tailwindcss/cli', 'tailwindcss'),
    '-i',
    './src/styles.css',
    '-o',
    './dist/styles.css',
    '--watch',
  ],
]
const processes = commands.map((args) => spawn(process.execPath, args, { stdio: 'inherit' }))

let stopping = false
function stop(exitCode = 0) {
  if (stopping) return
  stopping = true
  for (const child of processes) child.kill()
  process.exitCode = exitCode
}

for (const signal of ['SIGINT', 'SIGTERM']) process.once(signal, () => stop())
for (const child of processes) {
  child.once('error', (error) => {
    console.error(error)
    stop(1)
  })
  child.once('exit', (code) => {
    if (!stopping) stop(code ?? 1)
  })
}
