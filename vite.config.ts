import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { configDefaults } from 'vitest/config'
import { resolve } from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Vitest collects only the PRODUCT suite. docs/ holds filed EVIDENCE — the
  // firm-obligations mock's plain-node harness among it (`node test/domain.test.js`,
  // filed 44409ef) — which vitest's default glob otherwise picks up and fails at
  // collection, turning `npm test` red on a docs-only file. Excluded by Michael's
  // ruling 2026-09-11 at the FO build session's baseline stop; the filed files are
  // untouched. The spread keeps vitest's own defaults (node_modules, dist, …).
  test: {
    exclude: [...configDefaults.exclude, 'docs/**'],
  },
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
