import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // For the recommended 1marieCurie.github.io repository, keep "/".
  // If you deploy to a normal project repository, set VITE_BASE_PATH=/repository-name/
  base: process.env.VITE_BASE_PATH || '/',
})
