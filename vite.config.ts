import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Use async config with dynamic import to avoid ESM-only package issues
export default defineConfig(async ({ mode }) => {
  const plugins = [react()]

  if (mode === 'development') {
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