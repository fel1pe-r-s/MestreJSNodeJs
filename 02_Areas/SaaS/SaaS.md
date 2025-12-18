#SaaS

Software As a Service, geralmente é uma denominação para um produto que e vendido para várias empresas, onde várias empresas vão conseguir utilizar a mesma aplicação

[[Permissionamento]] como RBAC e ABAC. 
Utilizaremos [[Node]].js, [[Fastify]] e [[Prisma]] no back-end.
[[Nextjs]] 14 no front-end com Server Components e Server Actions. 
Implementaremos o [[Monorepo]] para manter back-end e front-end juntos. 
O [[TurboRepo]] será utilizado para acelerar processos, evitando execuções desnecessárias. Faremos ajustes nos pacotes e configurações para iniciar o projeto NextSAS-RBAC.

Single-tenant -> uma única instância do software utilizado por uma empresa, sendo necessário criar copias para cada empresa, assim o sistema fica na infraestrutura do cliente.

Multi-tenant ->  um software que esta em uma estrutura que todas as empresas vão usar mesma infraestrutura.

[[mapa.canvas|mapa]]


## 🛠 Projects applying this concept
- [DevStore_Ecom](../../01_Projetos/DevStore_Ecom)
- [IgniteShop](../../01_Projetos/IgniteShop)
- [PizzaShop_Web](../../01_Projetos/PizzaShop_Web)
- [PizzaShoppingAPI](../../01_Projetos/PizzaShoppingAPI)
- [SaaS_RBAC_System](../../01_Projetos/SaaS_RBAC_System)
