#Framework

[documentação](https://docs.nestjs.com/)

Um framework mas opinado, assim perdendo menos tempo na criação do projeto.
O Nest-js usa o [[Express]] mas podemos mudar para usar o [[Fastify]]

- ##### Estrutura base do nestjs
	- src
		- Controller -> Posta de entrada geralmente via http, sendo identificado por um [[decoreito no Nest]] `@Controller`, o controller pode ser injetado um service,  e precisa ser colocado no @Moduller em controller
		- Service -> É usado no controller utilizando a [[Inversão de dependências]] todo service leva o decoreitor @injectable() e precisa ser colocado no @Moduller em providers
		- Module -> Reuni todos os arquivos controlles services no tudo que for adicionado em controller são os controller que dão acesso as rotas da aplicação já os providers são todos as dependências que meus controller usar.
				- Caso eu tenha mas módulos eles podem ser importados pelo módulo pai, através do import.
			`@Moduller({`
				`import:[ModuleController]`
				`controller:[AppController]`	
				`providers:[AppService, PrismaService]`	
			`})`
				`export class AppModule{}`

* Para trabalhar com [Prisma](Prisma.md) no Nest-js preciso usar a inversão de dependências criando um serviço do prisma e criando uma class/função com @Injectable() agora posso injeta  o PrismaService no meu AppController, podendo assim fazer as chamadas ao meu banco de dados, como meu PrismaService vai usar o PrismaCliente, eu posso extends  PrismaCliente no meu PrismaService trazendo assim as funcionalidade para o meu service.
	*  Para a maioria dos projetos utilizamos o [Docker](00-CAIXA%20DE%20ENTRADA/Deploy/Docker.md)

* ##### Decoreitor
	* Decoreitor `@HttpCode(201)` define o status code de retorno em caso de sucesso
	* Decoreitor `@Body:  body `  estou renomeando meu decoreitor para body, podemos também tipa os dados que vem do body, o body intercepta os dados enviados no corpo da requisição ao minha rota
	* Decoreitor `@UsePipe(aqui dentro passo a função de validação que sera usada)` são usados para validação como midiaware, podemos usar integrado ao [[Zod]] acessa [ZodValidationPipe](https://docs.nestjs.com/pipes#custom-pipes) e para melhorar a formatação do erro user a lib zod-validation-error

* Lidando com variáveis de ambiente no Nest com [[Zod]] para isso usaremos o [ConfigModule](https://docs.nestjs.com/techniques/configuration#environment-variables-loaded-hook) do @nestjs/config, adicionando ele no import do @Moduler assim podemos chamar nosso envSchema passando nosso env para validar as variáveis, que foi interceptado pela função validate do ConfigModule.forRoot() e  para usar as variáveis de ambiente na aplicação usamos o ConfigService no arquivo que precisamos pegar as variáveis, também podemos criar um service para validar e pegar as variáveis de ambiente e chamamos esse service

	`@Moduller({`
		`import:[`
		`ModuleController,`
		`ConfigModule.forRoot({`
			`isGlobal: true,`
			`validate: (env)=> envSchema.parse(env)`
			`})`
		`]`
		`controller:[AppController]`	
		`providers:[AppService, PrismaService]`	
		`})` 
	`export class AppModule{}`

* Authenticação com [[Jwt]] usando [@nestjs/jwt](https://docs.nestjs.com/security/authentication#jwt-token)  temos varias formas de usar o jwt no nestjs uma delas é o [Passport-jwt-nestjs ](https://docs.nestjs.com/recipes/passport)  [doc-passport-jwt](https://www.passportjs.org/packages/passport-jwt/)
	* src/auth
		* auth.module.ts
			`@Moduller({`
				`import:[`
					`PassportModule,`
					`JwtModule.registerAsync({`
					`inject: [ConfigService],`
					`useFactory(config: ConfigService<Env, true>) {`
						`const secret = config.get('JWT_SECRET', { infer: true })`
						`return {`
						`secret,`
						`}`
						`},`
					`}),`
					`]`
				`})` 
			`export class AuthModule{}`
		registerAsync sera usado para  receber as variáveis ambientes
		
	Formas de autenticação entre aplicações como micro serviços para garantir a segurança podemos usar o algoritmo RS256 para criar usar duas chaves uma publica que server apenas para verificar se o [[Jwt]] token é valido
	Lembra de importa o auth.module.ts no meu app.module.ts `import:[AuthModule]`, e passa também meu controller de autenticação em controllers  `controller:[AuthenticateController]`

* ##### Rotas protegidas 
		Pra isso vamos usar o PassportStrategy, podemos criar nossa service  `JwtStrategy extends PassportStrategy(Strategy)` passando o `@Injectable()`
		Strategy vem do passport-jwt  [Passport-jwt-nestjs ](https://docs.nestjs.com/recipes/passport)
		Lembra de passa `providers: [JwtStrategy],` para meu `AuthModule{}` que é o modulo que possui a validação do jwt
		No `JwtStrategy`  chamamos o construtor com o 
		`super({` 
			`jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),`
			`secretOrKey: Buffer.from(publicKey, 'base64'),`
			`algorithms: ['RS256'],`
		`})`
		`algorithms: ['RS256'],` define qual é o algoritmo que esta sendo usado pelo Jwt 
		`secretOrKey: Buffer.from(publicKey, 'base64'),` pega a chave publica em base64 e converte em um Buffer do [[Node]] para validar se o usuário tem um token valido 
		`jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),` pega o token do meu header Bearer da minha requisição
		criamos uma função validate, podemos passa a tipagem e valida ela com o zod
		`const tokenSchema = z.object({`
			`sub: z.string().uuid(),`
		`})`
		`async validate(payload: TokenSchema) {`
		    `return tokenSchema.parse(payload)`
		`}`
		agora para usar esse service nas rotas que serão privada precisamos usa o decoreitor @UseGuards(JwtAuthGuard)		
		O JwtAuthGuard  extende o nosso AuthGuard que vem do @nestjs/passport passamos pra `AuthGuard('jwt')` o jwt para dizer qual o método de autenticação estamos usando
		Também podemos definir que 
		
	Enable authentication globaly
		todas as rotas são por padrão protegida e dizemos quais rotas são publicas.

* ##### Custom Decoreitor
	* Decoreito(params, context)  o decoreitor recebe dois valores o params não são obrigatórios podemos usa _ quando não queremos usa-lo já o segundo paramento ele  ele vai sempre existir ele é quem pega todos a função que esta abaixo do decoreitor para fazer as alterações que informações na função do decoreitor
	* Decoreitor de autenticação 
		`export const CurrentUser = createParamDecorator(`
			`( _ : never, context: ExecutionContext) => {`
				`const request = context.switchToHttp().getRequest()`
				`return request.user as UserPayload`
			`},`
		`)`

* [[Tests]] com [[vitest]] com [swc](https://docs.nestjs.com/recipes/swc#swc-configuration)  para acelera a complicação dos tests de typeScript para JavaScript, recomendado pela documentação do nest-js
	
	* Para configura o swc no vitest devemos adiciona-lo em plug-ins no arquivo de configuração do vitest.config
	
		`import swc from 'unplugin-swc'`
		`import { defineConfig } from 'vitest/config'`
		`import tsConfigPaths from 'vite-tsconfig-paths'`
		
		`export default defineConfig({`
		  `test: {`
		    `globals: true,`
		    `root: './',`
		  `},`
		  `plugins: [`
		    `tsConfigPaths(),`
		    `swc.vite({`
		      `module: { type: 'es6' },`
		    `}),`
		  `],`
		`})` 
		
		tsConfigPaths() server para que o vitest entenda @/ no caminho dos arquivos, sendo necessário configurar também no arquivo de configuração do typeScript 
	* Podemos criar arquivos personalizados passando algumas configurações diferente como por exemplo um config so para executar os teste e2e bastando adicionar o nome do arquivo de configurações na hora de executar script no terminal `"test:e2e": "vitest run --config ./vitest.config.e2e.ts"`
	*  
*  Upload de arquivos [doc](https://docs.nestjs.com/techniques/file-upload)
		Usamos o multer usamos o os decoreitos para intercepita o envio do arquivo e passa-lo para o multer 
		```typescript
		@Post('upload')
		@UseInterceptors(FileInterceptor('file'))
		uploadFile(@UploadedFile(new ParseFilePipe({ validators: [
			new MaxFileSizeValidator({ maxSize: 1000 }),
			new FileTypeValidator({ fileType: 'image/jpeg'}),
		    ],
		  }),
		) file: Express.Multer.File) {
				  console.log(file);
			}```

- [[Cache]] 



[[Decoreitor no TypeScript]] é uma função que adiciona comportamento onde ele é usado, ele recebe como parâmetro tudo que esta abaixo dela e modificar para ter algum comportamento especifico
exemplo @Controller() server para usar métodos que são rotas @Get() quer dizer que sera uma rota get, podemos passa paramentos para os decoreitor @Controller("/api") @Get("/hello")
`@Controller()`
`export class AppController{`
	`constructor()`
	 `@Get()`
	 `getHello(){`
	 `return`
	 `}`
`}`

## 🛠 Projects applying this concept
- [GDashChallenge](../../01_Projetos/GDashChallenge)
- [NestCleanArchitecture](../../01_Projetos/NestCleanArchitecture)
- [NestCleanRocketseat](../../01_Projetos/NestCleanRocketseat)
