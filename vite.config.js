// vite.config.js - GH-PAGES COMPATIBLE
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  base: '/game-shell/', // Must match your repo name
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    target: 'es2015',
    rollupOptions: {
      output: {
        format: 'es',
        manualChunks: {
          'vendor': ['react', 'react-dom']
        }
      }
    }
  }
})
