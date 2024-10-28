// vitest.config.ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true, // to enable global test APIs like `describe` and `it`
    environment: 'jsdom', // for testing in a browser-like environment
  },
})