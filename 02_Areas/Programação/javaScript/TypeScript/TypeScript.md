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

## 🛠 Projects applying this concept
- [ApiWithBun](../../../../01_Projetos/ApiWithBun)
- [CallScheduleApp](../../../../01_Projetos/CallScheduleApp)
- [CleanDDD_Core](../../../../01_Projetos/CleanDDD_Core)
- [DesignSystem_Lib](../../../../01_Projetos/DesignSystem_Lib)
- [DevStore_Ecom](../../../../01_Projetos/DevStore_Ecom)
- [Felipe_Website](../../../../01_Projetos/Felipe_Website)
- [FindYourDuo_App](../../../../01_Projetos/FindYourDuo_App)
- [FoodCourtApp](../../../../01_Projetos/FoodCourtApp)
- [GDashChallenge](../../../../01_Projetos/GDashChallenge)
- [GymPass_App](../../../../01_Projetos/GymPass_App)
- [IgniteShop](../../../../01_Projetos/IgniteShop)
- [ImageReader_Tool](../../../../01_Projetos/ImageReader_Tool)
- [Journey_Plannner](../../../../01_Projetos/Journey_Plannner)
- [MangaGenAI](../../../../01_Projetos/MangaGenAI)
- [NestCleanArchitecture](../../../../01_Projetos/NestCleanArchitecture)
- [NestCleanRocketseat](../../../../01_Projetos/NestCleanRocketseat)
- [NextJS_Fundamentals](../../../../01_Projetos/NextJS_Fundamentals)
- [NodeJS_Studies](../../../../01_Projetos/NodeJS_Studies)
- [Notes_App](../../../../01_Projetos/Notes_App)
- [PizzaShop_Web](../../../../01_Projetos/PizzaShop_Web)
- [PizzaShoppingAPI](../../../../01_Projetos/PizzaShoppingAPI)
- [ReactStateManagement](../../../../01_Projetos/ReactStateManagement)
- [RestaurantsApp](../../../../01_Projetos/RestaurantsApp)
- [SaaS_RBAC_System](../../../../01_Projetos/SaaS_RBAC_System)
- [SmartPizza_App](../../../../01_Projetos/SmartPizza_App)
- [TailwindMastery](../../../../01_Projetos/TailwindMastery)
- [WebDevChallenge](../../../../01_Projetos/WebDevChallenge)
- [YourHotel_App](../../../../01_Projetos/YourHotel_App)
