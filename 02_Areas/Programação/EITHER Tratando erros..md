#Programação


[[TypeScript]]


O padrão EITHER é uma forma de trata erros, onde você diz para aquela função que ela pode ter dois tipos de resposta (Left OR Right )
Left = erro, Right = sucesso, dessa forma eu sempre terei uma resposta para a função, não travando a aplicação.

exemplo

```typescript
export type Either<L,R> = Left<L,R> | Right<L,R>

export class Left<L,R>{
	value: L
	 constructor(value: L){
		 this.value = value
	 }
	isLeft(): this is Left<L,R>{
		return true
	}
	
}
export class Right<L,R>{
	value: R
	 constructor(value: R){
		 this.value = value
	 }
	 isRight(): this is Right<L,R>{
		return true
	}
	 isLeft():this is Left<L,R>{
		return false
	}
	
}

export const left = <L,R>(l: L):  Either<L,R> =>{
	return new Left(l)
}

export const right = <L,R>(r: R):  Either<L,R> =>{
	return new Right(r)
}
```


Criando um erro customizado
```typescript
export class RequiredParameter  extends Error{

	// nesse construtor eu também posso passa um status code.
	private _message: string
	private _statusCode: number
	constructor(message: string, statusCode = 500){
		super(message)
		this._message = message
		this._statusCode = statusCode
	}

	 get message(){
		 return this._message
	}
	  get statusCode(){
		 return this._statusCode
	 }
}
 
```
agora para usar o meu EITHER

Nessa parte estou dizendo que meu Either se for erro sera uma instância da class de Error do JavaScript ou como no exemplo abaixo eu posso criar minha class customizada `RequiredParameter` do erro e dizer que ela será a resposta em caso de erro, caso contrario ele retornara a resposta padrão que é o número do resultado da divisão (Também posso passa um tipo )


```typescript

type DivisãoResponse = {
	result: number
	statusCode: number
}

type Response = Either<RequiredParameter, DivisãoResponse>

function divide(a: number, b: number): Response {
	if (isNaN(b) || isNaN(a)){
		return left(new RequiredParameter("Erro: Não é um número"));
	}
	if (b === 0) {
		return left(new RequiredParameter("Erro: Divisão por zero!",400 ));
	} 
		const result = a / b
	return right({
		result,
		statusCode: 200,
	})
 }
 
 const response = divide(10, 2);
  // Lidando com o resultado
  
  if (result.isLeft()) {
	  console.error("Erro:", response.value, result.value.statusCode);
	} 
	 console.log("Resultado:", response.value);

```
