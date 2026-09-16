import { defineConfig, searchForWorkspaceRoot } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    fs: {
      strict: false,
      allow: [
        searchForWorkspaceRoot(process.cwd()),
        'E:/C#/Flux',
        'E:/Flux_Frontend',
        'E:/Flux_Frontend_App',
        '..'
      ]
    }
  },
  resolve: {
    preserveSymlinks: true,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          three: ['three', '@react-three/fiber', '@react-three/drei'],
          spline: ['@splinetool/react-spline', '@splinetool/runtime'],
          animations: ['framer-motion', 'gsap', 'animejs'],
        }
      }
    }
  }
})
