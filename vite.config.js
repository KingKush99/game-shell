// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  base: '/game-shell/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'es2015',
    rollupOptions: {
      output: {
        format: 'es',
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'tailwind-vendor': ['tailwindcss']
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    minify: 'esbuild'
  }
})
