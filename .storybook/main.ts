import { fileURLToPath } from 'node:url'

import type { StorybookConfig } from '@storybook/react-vite'
import tailwindcss from '@tailwindcss/vite'

const srcDirectory = fileURLToPath(new URL('../src', import.meta.url))

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-vitest',
    '@storybook/addon-docs',
    '@storybook/addon-mcp',
    '@chromatic-com/storybook',
  ],
  staticDirs: ['./public'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      propFilter: (prop) => !prop.parent || !prop.parent.fileName.includes('node_modules'),
    },
  },
  viteFinal: async (viteConfig) => {
    const aliases = viteConfig.resolve?.alias
    viteConfig.plugins = [...(viteConfig.plugins ?? []), tailwindcss()]
    viteConfig.resolve = {
      ...viteConfig.resolve,
      alias: Array.isArray(aliases)
        ? [{ find: '~', replacement: srcDirectory }, ...aliases]
        : { ...aliases, '~': srcDirectory },
    }
    return viteConfig
  },
}

export default config
