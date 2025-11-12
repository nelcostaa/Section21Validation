import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // Use relative base so the site works whether hosted at repo subpath or root
  base: './',
  plugins: [react()],
})

