import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // Production sends this path to the standalone planner via vercel.json.
    // Mirror that route locally so the portfolio's primary project link does
    // not fall through to this app's 404 page during development.
    proxy: {
      '/investmentplanner': {
        target: 'https://investment-project-eta.vercel.app',
        changeOrigin: true,
        rewrite: (url) => url.replace(/^\/investmentplanner/, '') || '/',
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
