import type { Preview } from '@storybook/react'
import '../src/app/globals.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'canvas',
      values: [
        { name: 'canvas', value: '#EDEBE6' },
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#0A0A0F' },
        { name: 'obi-surface', value: '#F8FAFC' },
      ],
    },
  },
}

export default preview
