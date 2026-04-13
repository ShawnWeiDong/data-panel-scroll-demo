import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    watch: {
      ignored: ['**/weave-mui-toolkit/**'],
    },
  },
  optimizeDeps: {
    exclude: ['@weave-mui/styles', '@weave-mui/material', '@weave-mui/cssbaseline'],
  },
  build: {
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html'),
    },
  },
})
