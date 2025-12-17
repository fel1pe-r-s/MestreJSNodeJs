#PizzaSmart

backend regra de negocio
### Rotas
get Consulta pizzas
- Funcionalidades 
	busca na tabela Pizzas a lista de todas as pizzas e seus ingredientes
	
post Criação do pedido
- funcionalidades (services/repositories)
	- consulta a tabela Pizzas_Making com o  pizza_id[] de cada pizza selecionada pelo user retornando um objeto com making_id e  unit_making
	-  soma unit_making que tem o mesmo making_id tendo o total de ingrediente
	-  consulta a tabela Makings pelo id e compara a o total de ingredientes pela unit
	- retorna sucesso caso o total seja menor ou igual  a unit
		 `json {`
		  `"pizzas": [`
		    `{`
		      `"pizza_id": 1,`
		      `"nome_pizza": "Pizza Margherita",`
		      `"preco_em_centavos": 2500,`
		      `"quantidade": 1`
		      `"quantidade_preco_centavos": 2500,`
		`}`
	- retorna insucesso caso total seja maior que unit com json contendo: 
		`json {`
		  `"ingredientes_insuficientes": [`
		    `{`
		      `"ingrediente_id": 2,`
		      `"ingrediente": "Molho de Tomate",`
		      `"quantidade_necessaria": 200,`
		      `"quantidade_disponivel": 150`
		    `},`
		    `{`
		      `"ingrediente_id": 3,`
		      `"ingrediente": "Queijo Mozzarella",`
		      `"quantidade_necessaria": 4,`
		      `"quantidade_disponivel": 3`
		    `}`
		  `]`
		`}`
	- caso retorno seja de sucesso cria o pedido na tabela order e salva os total da soma  `"quantidade_preco_centavos"` das pizzas e status da entrega por defult pendent
	- na ordens_Pizza salve as informações de order_id, pizza_id, unit_pizza e price-in-cents(ja multipicado pela unit pizza).
	- Pege a tabela Making e atualize o campo unit subitraindo pelo total de ingrediente  usado.
- retorno sucesso
	- status code 200, mensagem, pedido criado com sucesso		

get Consulta  ingrediente
- funcionalidades
	- busca na tabela ingredientes a quantidade de cada ingrediente

regras não funcionas
- Tratativa de erro/response sempre deve ter um retorno nunca um Erro throw  parando a aplicação.
	- retorna a mensagem de erro informando qual o motivo do erro.
	- retorna a mensagem de sucesso com status code, mensagem de pedido realizado e status do pedido
	- casos de uso:
		- 


[[function]]