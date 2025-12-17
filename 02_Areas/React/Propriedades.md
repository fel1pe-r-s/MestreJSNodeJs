#React #react 
valores passado como propriedades (atributos) no componente.
e podemos recupera essa propriedade dentro do component
```typescript
function Button(title: string){
	return (
	<div>{title}</div>
	)
}

function App(){
	return (
	<div>
	 <Button title='Props' />
	</div>
	)
}
```