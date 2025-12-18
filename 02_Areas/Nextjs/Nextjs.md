#Nextjs

[Doc](https://nextjs.org/docs)

Framework em cima do [[React]] que traz sua convenções como estrutura de pastas 📁 não podendo mudar o nome das pastas SRC📁 e APP📁 
##### Instalação 
`npx create-next-app@latest`
##### (SPA) Single Page Applications 
Uma aplicação tradicional em [Reactjs](React.md) funcionar como (spa) Single Page Applications quando o cliente acessa nossa aplicação, primeiro ele acessa o front-end e então nosso front faz a requisição para a api.
##### (SSR) server-side-render server components
Já no Nextjs usamos o (SSR) server-side-render, onde o nextjs adicionar uma terceira parte na aplicação, Next server que roda em cima do Nodejs, então quando o cliente vai acessa nossa aplicação ele não acessa diretamente nosso front-end em react, e sim o next-server node, ele vai processa os dados do lado do servidor e vai pegar [[Html]],  [[css]] e [[JavaScript]] necessário para criar a pagina, manda só o html para o cliente, se a pagina precisar de algum dado da api, ele já busca esse dado antes de entregar a pagina ao cliente, assim podemos usar funcionalidade do [react](React.md) que só estão disponíveis para ser usado com framework como [Server Components ](React.md) por padrão.
##### Client componet `'use client'`
Quando precisamos podemos usar os Client Components é quando precisamos enviar o [[JavaScript]] para o navegador do cliente usando no início do componente `'use cliente'` "Obs.: mesmo que um component seja `'use cliente'` ele ainda será carregado do lado do servidor, porem ele vai passa por um processo de hidratação adicionando uma camada de JS no HTML"
Como identificar se temos um client componet, quando temos eventos e estados do component.
##### Componentes de forma async
Podemos cria os componentes de forma async e fazer com que ele aguarde o retorno das nossas requisição com await.
	O que possibilita carregar dados da api direto no components mas isso torna mas lento o carregamento do components, então vamos usar apenas em casos em que precisamos desses dados para carregar nosso componente no primeiro carregamento.
	 Quando temos um carregamentos de dados, podemos criar um arquivo loading.tsx  no mesmo conjunto pastas onde tem o componente async, e colocamos por exemplo carregando... dentro desse loading, ele ja vai mostra o conteúdo ate que a requisição api seja completa trazendo os dados, assim podemos usar no loading um skeleto.
Não é uma boa prática usar component async dentro de component 'use client' pois ele pode ser renderizado mas de uma vez, o que pode gerar perda de performance.
Caso precisamos usar um fetch de dados em um client component, usando o useEffect ou TanStack Query etc...
##### Streaming SSR
ler/escrever dados de forma parcial, isso possibilita renderizar componentes de forma parcial, ele gera uma requisição que ficam abertas ate temos todos os dados, assim mostrando os dados iniciais e ate trazemos os dados da api.
##### Client Boundaries e Encadeamento
Todos os Cliente component que recebem componentes dentro deles esses se tornam client component.
caso eu queira que um client component se torne um server component, usamos o {children} no client component e passamos o server component como children.

Laraja Server component
Azul Client component
![](NextJS_ServerClient_Components.png)
##### Suspense API
Por padrão o nextjs sempre vai carregar todos os components chamados pelo component pai
Para evitamos esse comportamento, usamos o component Suspense do react, podemos usa-lo por volta do component que precisa ser carregado, o suspense recebe um fallback.
Dessa forma conseguimos carregar as informações sem precisar espera os demais components, podendo assim usar em um component um spine, skeletor, algum loading.
##### Rotas
- Rotas no Next
	- O roteamento do Next é todo baseado em pastas
	- App Router
		Cada pasta dentro de App se torna uma rota que acessa o arquivo page.tsx 
		exemplo 
			app>catalog>product gerando a rota a /catalog/product
		- Para escapar uma pasta, basta envolve-la com ( )   exemplo tenho um conjunto de pastas mas quero que uma pagina especifica não seja usada na rota basta coloca exemplo
			`(auth)`
				`signIn` 
					`page.tsx`
				`signUp` 
					`page.tsx`
				`layout.tsx`
			a pasta auth não fara parte da rota.
		- Rotas dinâmicas
			- para pegar parâmetros nas rotas, podemos coloca a pasta entre [id] e dentro o nome do parâmetro 
			- para pegamos esse parâmetros pegamos params: {id} de dentro de props
			- para pegamos mas de um parâmetro basta colocar [...data] os ... vai funcionar como rest-opereito, pegando assim todos os parâmetros passado na rota
	
- Layout
	- Todo o conteúdo da aplicação sera criado dentro dele. então podemos colocar componente que serão compartilhados em todas as paginas
	- É possível criar outros layout dentros de pastas, assim so os arquivos daquela pasta podem usar aquele layout basta dentro de layout eu colocar meu {children}
		exemplo pasta admim> layout.tsx page.tsx
		![](Pasted%20image%2020240523094723.png)
- API Router
- Autenticação [[Next-Auth]]
- [[Zod]]
- [React Hook Form](React-Hook-Form.md)



##### Rotas api
dentro da pasta app se criamos um arquivo route.ts esse arquivo já vira uma rota da api.
então criamos uma pasta api e dentro podemos criar nossas rotas.
e dentro do arquivo route criamos uma função com o nome do método que será usado
	`export async function GET() {`
	  `return Response.json({message: 'Hello World'});`
	`}`


#### Requisição api next
recomendado usar a [fetch api](https://nextjs.org/docs/app/api-reference/functions/fetch)
axios, e feito em cima de xmlhttprequest, porem o nextjs faz algumas alterações no fetch api do browser e para aproveitar todos os benefícios de cache que o nextjs traz o melhor é usar a fetch api
###### [Cache](https://nextjs.org/docs/app/building-your-application/caching) & Memorizarion
- Memorization é uma função do react, se fizemos uma requisição a uma rota api, e se essa requisição for feita mas de uma vez para mesma rota com os mesmo parâmetros, durante o carregamento na mesma página, o react vai impedir essa requisição
- Cache para evitar fazer novas requisição podemos pegar os dados salvos em cache essa é uma função disponível no Next.js

	`const response = await fetch("http://localhost:3000/api/products/featured",{`
	  `next: {`
	  por padrão esta definido o `cache: 'force-cache'` também podemos definir para não ser feito o cache `cache: 'no-store'`
	  o revalidate dita quanto tempo dura o cache nessa requisição 
	    `revalidate: 60 * 60, // 1 hour`
	  `},`
	`});`
#### .env
Lidando com variáveis de ambiente no nextjs
para a vaiáveis fiquem disponíveis tanto do lado do servidor next e no lado do cliente precisa colocar 
NEXT_PUBLIC_ antes do nome da variável ambiente
exemplo NEXT_PUBLIC_API_BASE_URL=""
caso contrário ele ficara disponível apenas no server side do nextjs 

##### [Metadata](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
	`export const metadata: Metadata = {`
	  `title: "Dev Store",`
	`};`
o meta data temos as mesmas  opção de metadata que temos no HTML 
a função de metadata do nextjs também traz a opção de template de metadata

- [opengrapg-image](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image) usado para criar imagens de compartilhamento 
		podemos usar imagens pronta ou dinâmica
		para gerar uma imagem dinâmica basta o arquivo ter o seguinte nome opengraph-image.tsx tem um exemplo na documentação

##### [Geração estática](https://nextjs.org/docs/app/api-reference/functions/generate-static-params)
Quando queremos gera uma visualização estática para serem acessadas mas rápido.
Em uma pagina que temos um parâmetro dinâmico podemos usar a função.
generateStaticParams()
#### [useRouter](https://nextjs.org/docs/app/api-reference/functions/use-router) 

### Nextjs 15Rc
- Server Actions
	Actions permitem executar ações do lado do servidor em resposta a interações do usuário, sem enviar todo o código JavaScript para o cliente. Cada Server Action se torna uma rota HTTP, permitindo operações sensíveis, como acesso a banco de dados. No entanto, é importante manter a reatividade do React e separar back-end e front-end para facilitar manutenção e testes. Server Actions não substituem conceitos tradicionais do React
- ##### [useActionState](https://react.dev/reference/react/useActionState) 
	O `useActionState` atualmente só está experimental do React essa API fazia parte do React DOM e era chamada `useFormState`. `useActionState` é um gancho que permite atualizar o estado com base no resultado de uma ação de formulário.
	```typescript
	const [state, formAction] = useActionState(
	fn,	initialState, permalink?
	);
	```
	Primeiro parâmetro, é uma uma função que é a minha server action
	Segundo parâmetro, é o estado inicial, ele pode inicia como null.