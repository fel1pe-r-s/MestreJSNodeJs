#Programação

[TypeScript: Documentation](https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html)

[Decoreitor no TypeScript](Decoreitor%20no%20TypeScript.md)

https://github.com/tsconfig/bases



Primeiramente para rodar um código TS precisamos converter para JavaScript 
Podemos usar o comando tsc caminho do arquivo
Ou podemos baixa e usar uma ferramenta externa como o [tsup](https://tsup.egoist.dev/) 
```bash
tsup src/index.ts --watch 
```

Agora para criar o arquivo de configurações do TS
usamos o npm tsc --init assim criando o arquivo de configuração tsconfig.json

``` json
{
"extends": "@tsconfig/recommended/tsconfig.json",
  "$schema": "https://json.schemastore.org/tsconfig",

  "compilerOptions": {
	"target": "ES2023",
    "lib": ["ES2023", "dom", "dom.iterable", "esnext"],
    "jsx": "preserve",
    "module": "esnext",
    "moduleResolution": "bundler",
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ]
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```
agora que temos o arquivo de configurações basta usar o npm tsc que o tsc ja vai converter o arquivo para js

instalação
execução
tipos
generics
decorators
Namespaces e modules
classes e interfaces
programação orientada a objetos
Build
deploy
Solid