import { defineConfig } from 'tsup'

const shared = {
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  // `dist` is emptied by the build:js script: parallel configs must not clean each other.
  clean: false,
  external: ['react', 'react-dom', 'react/jsx-runtime'],
} as const

export default defineConfig([
  {
    ...shared,
    // Components and hooks need an RSC client boundary in Next.js apps.
    entry: ['src/index.ts', 'src/generated-entrypoints/*.ts', '!src/generated-entrypoints/utils.ts'],
    banner: { js: '"use client";' },
  },
  {
    ...shared,
    // Pure helpers (`@doscientos/ui/utils`) stay callable from Server Components.
    // No splitting: each output is self-contained and cannot collide with client chunks.
    entry: { 'generated-entrypoints/utils': 'src/generated-entrypoints/utils.ts' },
    splitting: false,
  },
])
