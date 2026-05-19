#Libs

[Doc](zod.dev) #libs
#Validação e #transformação de dados com base em um schema

exemplo: 
`import { z } from "zod";`

primeiro eu crio meu schema
`const envSchema = z.object({`
  `NEXT_PUBLIC_API_BASE_URL: z.string().url(),`
`});`

o safeParse server para validar os dados recebidos com base no schema 
`const parsedEnv = envSchema.safeParse(process.env);`

se o parser success não for falso podemos dispara um erro
`if (!parsedEnv.success) {`
  `console.error(`
    `"Invalid environment variables",`
    `parsedEnv.error.flatten().fieldErrors`
  `);`
  `throw new Error("Invalid environment variables.");`
`}`
em caso de sucesso posso exporta os dados do meu recebidos no meu schema armazená-lo em uma variavel que sera exportada  para a aplicação, 
`export const env = parsedEnv.data;`

essa variável env ja vai esta typada de acordo com o typeScript 

o `parse` caso não passe na validação dispara um erro,
o `safeParse` não dispara erro apenas informa se passou na validação 

Tratando erro no zod
	Para melhorar a formatação do erro use a lib zod-validation-error


Usando o zod para fazer tipagem

exemplo
```typescript
const createEventSchema = z.object({
title: z.string(),
details: z.string()
})

type createEventType = z.infer<typeof createEventSchema>
```

para usar como validação de dados

```typescript
const createEventSchema = z.object({
title: z.string().min(4),
details: z.string().opcional()
})

const data = createEventSchema.parse(request.body)
```


Também é possível fazer a transformação de dados.
como por exemplo converter um numero que estava no formato string `"1"` para number `1`

## 🛠 Projects applying this concept
- [ApiWithBun](../../01_Projetos/ApiWithBun)
- [CallScheduleApp](../../01_Projetos/CallScheduleApp)
- [DevStore_Ecom](../../01_Projetos/DevStore_Ecom)
- [FoodCourtApp](../../01_Projetos/FoodCourtApp)
- [GymPass_App](../../01_Projetos/GymPass_App)
- [Journey_Plannner](../../01_Projetos/Journey_Plannner)
- [NestCleanArchitecture](../../01_Projetos/NestCleanArchitecture)
- [NestCleanRocketseat](../../01_Projetos/NestCleanRocketseat)
- [NodeJS_Studies](../../01_Projetos/NodeJS_Studies)
- [PizzaShop_Web](../../01_Projetos/PizzaShop_Web)
- [PizzaShoppingAPI](../../01_Projetos/PizzaShoppingAPI)
- [SaaS_RBAC_System](../../01_Projetos/SaaS_RBAC_System)
- [WebDevChallenge](../../01_Projetos/WebDevChallenge)
