#React

[Doce](https://react.dev/)
[react-query](react-query.md)
[React-Hook-Form](React-Hook-Form.md)
[redux](redux.md)
 
- ##### [Server Components](https://react.dev/reference/rsc/server-components#async-components-with-server-components) 
	são componentes são criado no servidor e não usamos JavaScript no lado do navegador

- ##### [Memorization](https://pt-br.react.dev/blog/2024/02/15/react-labs-what-we-have-been-working-on-february-2024#react-compiler) 
	é uma função do react, se fizemos uma requisição a uma rota api, e se essa requisição for feita mas de uma vez para mesma rota com os mesmo parâmetros, durante o carregamento na mesma página, o react vai impedir essa requisição

- ##### [createContext](https://react.dev/reference/react/createContext)
	Primeiro criamos o contexto
	`const CartContext = createContext({});`
	para usamos o contexto basta usa-lo como um componente ao redor de um componente filho, os componentes filhos recebem todos os dado passados em value no componente de context
	 `<CartContext.Provider value={{ items: cartItems, addToCart }}>`

	      Aqui vem componentes que precisam dos dados desse contexto

    `</CartContext.Provider>`

- ##### Components
	São funções que retorna [[Html]]
	Formas de separa a aplicação em vários blocos, vamos criar components, quando ele se repete ou quando existe uma lógica especifica da uma parte do layout.

- ##### Props
	Todos componente pode receber atributos igual algumas tags html, posso passa essa propriedade e receber nos pârametros da função
	```typescript
		function Button({text}){
		 retun <button>{text}</button>
		}
		function App({text}){
		 retun (
			<>
			<Button text="clique aqui" />
			</>
		 )
		}
			
		```

- ##### HTTP State
	Crio um estado onde mantenho o resultado da requisição e se eu adicionar algum valor, ao invés de fazer uma nova requisição a minha api, eu atualizo os dados que estão salvos com os novos valores
	Para isso podemos usar a [react-query](react-query.md) 
	usando o useMutation que server para atualizar dados/manipula, podemos atualizar o cached da requisição feita com Reacr query, 
	```typescripr
		const {_} = useMutation({
			mutationFn: recebe uma função,
			onSuccess(_, variables){
				queryClient.setQueryData(['products'], (data) =>{
					return [...data, {
						id: '1'
						name: variables.name
						price: variables.price
					}]
				})
			}
		})
	```
- ##### UseContext
	