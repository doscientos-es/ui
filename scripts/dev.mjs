import { spawn } from 'node:child_process'

const pnpm = process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm'
const processes = [
  spawn(pnpm, ['exec', 'tsup', '--watch'], { stdio: 'inherit' }),
  spawn(
    pnpm,
    ['exec', 'tailwindcss', '-i', './src/styles.css', '-o', './dist/styles.css', '--watch'],
    { stdio: 'inherit' },
  ),
]

let stopping = false
function stop(exitCode = 0) {
  if (stopping) return
  stopping = true
  for (const child of processes) child.kill()
  process.exitCode = exitCode
}

for (const signal of ['SIGINT', 'SIGTERM']) process.once(signal, () => stop())
for (const child of processes) {
  child.once('exit', (code) => {
    if (!stopping) stop(code ?? 1)
  })
}
