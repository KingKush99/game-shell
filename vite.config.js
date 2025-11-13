// vite.config.js - MODIFIED to remove 'base' and set a specific port
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  // The 'base' line has been removed.
  plugins: [react(), tailwindcss()],
  
  // Add this 'server' block to specify the port
  server: {
    port: 5839,
  },

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
