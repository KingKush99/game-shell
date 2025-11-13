// vite.config.js - MODIFIED TO REMOVE 'base'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  // The 'base' line has been removed from here.
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
