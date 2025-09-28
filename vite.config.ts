import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig(async ({ command }) => {
  const plugins = [react()]

  // Load lovable-tagger only in dev via dynamic import to avoid ESM/CJS issues
  if (command === 'serve') {
    const { componentTagger } = await import('lovable-tagger')
    plugins.push(componentTagger())
  }

  return {
    server: {
      host: '::',
      port: 8080,
    },
    plugins,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  }
})