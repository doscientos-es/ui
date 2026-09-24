import { reactViteConfig } from '@doscientos/configs/oxlint/react-vite'

const designSystemRules = {
  'shadcn/no-raw-colors': 'error',
  'shadcn/no-unknown-classes': 'warn',
  'shadcn/no-arbitrary-values': ['warn', { allow: ['layout'] }],
  'shadcn/no-restyle': ['warn', { allow: ['layout'] }],
}

export default {
  extends: [reactViteConfig],
  jsPlugins: ['@shadcn/lint'],
  settings: {
    shadcn: {
      ui: '~',
      componentImports: ['^\\.\\.?/'],
      ignoreImports: ['^\\.\\.?/lib(?:/|$)', '^\\.\\.?/hooks(?:/|$)'],
      note: 'Usa tokens semánticos y variantes de @doscientos/ui antes de añadir clases propias.',
    },
  },
  rules: designSystemRules,
  overrides: [
    {
      files: ['src/ui/**'],
      rules: {
        'shadcn/no-arbitrary-values': 'off',
        'shadcn/no-restyle': 'off',
      },
    },
    {
      files: ['src/ui/**/*.stories.tsx'],
      rules: {
        'shadcn/no-arbitrary-values': designSystemRules['shadcn/no-arbitrary-values'],
        'shadcn/no-restyle': designSystemRules['shadcn/no-restyle'],
      },
    },
  ],
}
