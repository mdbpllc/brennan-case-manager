import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Honor an assigned PORT (parallel Claude sessions each get their own);
  // falls back to Vite's default 5173.
  server: { port: Number(process.env.PORT) || 5173 },
})
