// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  base: '/game-shell/', // 👈 GitHub Pages base path
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'es2015', // Ensure compatibility
    rollupOptions: {
      output: {
        format: 'es', // ES modules format
        manualChunks: {
          'react-vendor': ['react', 'react-dom'], // Bundle React separately
          'tailwind-vendor': ['tailwindcss']
        }
      }
    },
    // Ensure proper chunking
    chunkSizeWarningLimit: 1000,
    minify: 'esbuild'
  }
})
