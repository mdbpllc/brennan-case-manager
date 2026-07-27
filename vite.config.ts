import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Honor an assigned PORT (parallel Claude sessions each get their own);
  // falls back to Vite's default 5173.
  server: { port: Number(process.env.PORT) || 5173 },
  build: {
    rollupOptions: {
      input: {
        // The app.
        main: resolve(__dirname, 'index.html'),
        // The MSAL sign-in redirect target. A second entry, not a public/
        // asset: it has to be processed so its module script resolves. Dev
        // serves root HTML automatically; production needs it declared here or
        // the Outlook popup 404s after a build. See blank.html.
        blank: resolve(__dirname, 'blank.html'),
      },
    },
  },
})
