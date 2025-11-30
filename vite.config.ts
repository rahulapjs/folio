import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  // 🔥 Performance optimizations
  build: {
    // Split vendor libraries (React, Framer Motion, etc.)
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          motion: ['framer-motion'],
        }
      }
    },

    // Reduce bundle size
    minify: 'esbuild', // default but fastest
    sourcemap: false,
  },

  // Optional: better caching
  resolve: {
    dedupe: ['react', 'react-dom']
  },
})
