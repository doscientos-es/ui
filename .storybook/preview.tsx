import type { Preview } from '@storybook/react-vite'
import { useEffect, type ReactNode } from 'react'

import '../src/styles.css'
import './preview.css'
import { doscientosTheme } from './theme'

function ThemeCanvas({ dark, children }: { dark: boolean; children: ReactNode }) {
  useEffect(() => {
    // Portals live under body, not inside the canvas. Theme both locations.
    const root = document.documentElement
    const previous = root.classList.contains('dark')
    root.classList.toggle('dark', dark)
    return () => {
      root.classList.toggle('dark', previous)
    }
  }, [dark])
  return <div className={dark ? 'storybook-canvas dark' : 'storybook-canvas'}>{children}</div>
}

const preview: Preview = {
  tags: ['autodocs', 'test:ui'],
  initialGlobals: {
    theme:
      (import.meta as ImportMeta & { env: Record<string, string | undefined> }).env
        .VITE_UI_TEST_THEME === 'dark'
        ? 'dark'
        : 'light',
  },
  globalTypes: {
    theme: {
      description: 'Tema de los componentes en el lienzo',
      toolbar: {
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Claro' },
          { value: 'dark', title: 'Oscuro' },
        ],
      },
    },
  },
  parameters: {
    layout: 'padded',
    controls: { expanded: true },
    a11y: { test: 'error' },
    docs: { theme: doscientosTheme },
    viewport: {
      options: {
        mobile: { name: 'Móvil', styles: { width: '375px', height: '812px' }, type: 'mobile' },
        tablet: { name: 'Tablet', styles: { width: '768px', height: '1024px' }, type: 'tablet' },
        desktop: {
          name: 'Escritorio',
          styles: { width: '1280px', height: '900px' },
          type: 'desktop',
        },
      },
    },
    chromatic: {
      modes: {
        'claro escritorio': { theme: 'light', viewport: 'desktop' },
        'oscuro escritorio': { theme: 'dark', viewport: 'desktop' },
        'claro móvil': { theme: 'light', viewport: 'mobile' },
        'oscuro móvil': { theme: 'dark', viewport: 'mobile' },
      },
    },
    options: {
      storySort: {
        order: ['Introducción', 'Foundations', 'Components', 'Patterns', 'Application'],
      },
    },
  },
  decorators: [
    (Story, context) => {
      return (
        <ThemeCanvas dark={context.globals.theme === 'dark'}>
          <Story />
        </ThemeCanvas>
      )
    },
  ],
}

export default preview
