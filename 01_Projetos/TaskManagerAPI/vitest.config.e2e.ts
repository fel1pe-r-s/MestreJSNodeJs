import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    include: ['src/infrastructure/http/controllers/**/*.e2e-spec.ts'],
    globals: true,
    environmentMatchGlobs: [['src/infrastructure/http/controllers/**', 'prisma']],
  },
})
