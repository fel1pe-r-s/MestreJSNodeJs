#PizzaSmart_Specs #PizzaSmart

* ordem de chamadas http
### get-pizzas.ts
trazer todas as pizzas

### get-pizza-making.ts 
* pega o id de todas as pizza selecionadas pelo user id[ ]
* retorna  makingsId   unitMaking

### get-making.ts
* atrazer os ingrediente pelo makingsId[]


##### etapa de validação
*  Faça um mape em orders pege aquantidade de ingredientes por pizza e multiplice pela quantidade de pizza  (unitMaking * unitPizza) (obs:. salve os dados da orders em um stado e so depois de valida a quantidade de ingredientes criar a order no banco de dados)



#### rota post/new-order

- [x] devo pegar meu body
	type Pizza = {id: string, unit: number}

- [x] função getPizzaMaking(pizza: Pizza){
	com id da pizza vou chamar a função getPizzaMaking
	* vai pegar o id dos ingredientes usados na  pizza e a quantidade
	quando fizer o map() para consulta os ingrdientes ja pegar o retorno da quantidade usada e multiplique a quantidade usada por pizza pela quantidade de pizza
	retorna { ingredientUsed[{id: string, unitTotalUsed: number}] }
	}

- [x] função  getMakingAvaliable(ingredientUsed){

- [x] faça um mape  em ingredientUsed.map()
	- [x] consult cada ingrediente e veja se a unit >= a unitTotalUsed
	- [x] se algum dos ingrediente for menor retorne a lista de ingrediente que faltam e a quantidade disponivel
	- [x] e retorn mensagem de falha ao solicita pedido.
	- [x] }
	- [x] atualizar para usar o filter e retorna a lista de ingredientes que faltam


- [x] const pizzas = função getPizzaAmount(pizza: Pizza){
	vai fazer uma busca de cada pizza pelo id
	retorna todas as pizzas com id e valor em centavos
	}

- [x] função somaTotal(pizzas){
 - [x] map ou reduce para soma o valor das pizzas
 - [x] retorna a soma total
	- [x] }

- [x] função newOrder(pedido, total){
	criar a order com o valortotal
	cira uma orderPizza que vai guarda as unidades das pizza e o id da pizza
	retorna sucesso e o status do pedido
	}

