#PizzaSmart_Specs #PizzaSmart

[[Prisma]]
[[PizzaSmart]]
[[Requesitos]]
[[function]]
[[FackerJs]]
adicionar os ingrediente
responseMaking = making.create({
	data: {
		 [
			{id: 1, name: massa de pizza, unit: 1000, unit_measure: gramas }
			{id: 2, name: molho de tomate, unit: 1000, unit_measure: gramas }
			{id: 3, name: queijo mussarela, unit: 1000, unit_measure: gramas }
			{id: 4, name: calabresa, unit: 1000, unit_measure: gramas }
			{id: 5, name: pepperoni, unit: 1000, unit_measure: gramas }
		]
	}
})
adicionar 3 pizzas
responsePizza = pizza.create({
data: {
[
	{id: 1, name: pizza de queijo, preço_em_centavos: 5000}
	{id: 2, name: pizza de pepperoni, preço_em_centavos: 5000}
	{id: 3, name: pizza de calabresa, preço_em_centavos: 5000}
]
}
})

