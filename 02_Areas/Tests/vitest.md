#Tests

[Documentação](vitest.dev/guide)
Para usar o vitest, precisamos criar o arquivo vitet.config.ts também podemos configurar um config personalizado


`import { defineConfig } from 'vitest/config'`

`export default defineConfig({`
  `test: {`
    `globals: true,`
    `root: './',`
  `},`
  `plugins: [],`
`})`