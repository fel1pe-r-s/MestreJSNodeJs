import { build } from 'tsup'

await build({
  entry: ['src/server.ts'],
  outDir: 'dist',
  format: ['esm'],
  clean: true,
  minify: true,
  shims: true,
  bundle: true,
  external: ['@prisma/client', '@prisma/adapter-pg', 'pg', 'bcryptjs'],
})
