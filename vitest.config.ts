import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'
import { playwright } from '@vitest/browser-playwright'
import { defineConfig } from 'vitest/config'

const dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  resolve: {
    alias: {
      '~': path.resolve(dirname, 'src'),
    },
  },
  test: {
    coverage: {
      provider: 'v8',
      include: ['src/ui/**/*.{ts,tsx}', 'src/hooks/**/*.ts', 'src/lib/**/*.ts'],
      exclude: ['**/*.test.*', '**/*.stories.*', '**/index.ts', 'src/generated-entrypoints/**'],
      reporter: ['text', 'json-summary', 'html'],
      thresholds: { lines: 85, statements: 80, functions: 80, branches: 80 },
    },
    projects: [
      {
        extends: true,
        test: {
          name: 'unit',
          environment: 'happy-dom',
          pool: 'threads',
          maxWorkers: 4,
          include: ['src/**/*.test.{ts,tsx}'],
          setupFiles: ['./src/test/setup.ts'],
        },
      },
      {
        extends: true,
        plugins: [
          storybookTest({
            configDir: path.join(dirname, '.storybook'),
            tags: { include: ['test:ui'] },
          }),
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            viewport:
              process.env.UI_TEST_MOBILE === '1'
                ? { width: 375, height: 812 }
                : { width: 1280, height: 900 },
            provider: playwright({}),
            instances: [{ browser: 'chromium' }],
          },
        },
      },
    ],
  },
})
