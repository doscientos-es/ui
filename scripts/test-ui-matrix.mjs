import { spawnSync } from 'node:child_process'
import { mkdtempSync, readFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const reports = mkdtempSync(join(tmpdir(), 'doscientos-ui-matrix-'))
const modes = [
  { name: 'light-desktop', theme: 'light', mobile: '0' },
  { name: 'dark-desktop', theme: 'dark', mobile: '0' },
  { name: 'light-mobile', theme: 'light', mobile: '1' },
  { name: 'dark-mobile', theme: 'dark', mobile: '1' },
]

for (const mode of modes) {
  const reportPath = join(reports, `${mode.name}.json`)
  console.log(`Storybook: ${mode.name}`)
  const result = spawnSync(
    process.execPath,
    [
      join(root, 'node_modules/vitest/vitest.mjs'),
      'run',
      '--project',
      'storybook',
      '--reporter=json',
      `--outputFile=${reportPath}`,
    ],
    {
      cwd: root,
      env: { ...process.env, VITE_UI_TEST_THEME: mode.theme, UI_TEST_MOBILE: mode.mobile },
      encoding: 'utf8',
      timeout: 180_000,
      maxBuffer: 10 * 1024 * 1024,
    },
  )
  let report
  try {
    report = JSON.parse(readFileSync(reportPath, 'utf8'))
  } catch {
    /* Startup failures have no JSON. */
  }
  console.log(`${mode.name}: ${report?.numPassedTests ?? 0}/${report?.numTotalTests ?? 0} passed`)
  if (result.status !== 0 || !report?.success || !report.numTotalTests) {
    process.exitCode = 1
    if (report) {
      for (const suite of report.testResults) {
        if (suite.message) console.error(suite.name, suite.message)
        for (const test of suite.assertionResults ?? []) {
          if (test.status === 'failed')
            console.error(test.fullName, test.failureMessages.join('\n'))
        }
      }
    } else {
      console.error(result.error?.message ?? result.stderr ?? 'Storybook failed to start.')
    }
  }
}
console.log(`Reports: ${reports}`)
