#Database

[Doc](https://www.prisma.io/)
[[ORM]] para acesso a [[Bando de dados]] online altamente integrado ao [[TypeScript]] 
prisma planetScale npx prisma db push

`npm i prisma -D` esse comando instala a CLI
`npm i @prisma/client` esse comando instala o prisma no projeto



- Relacionamento com Prisma 
	- Para criar um relacionamento de uma tabela no prisma basta eu colocar o nome da coluna e na frente o nome da tabela qual ele terra o relacionamento com a extensão do prisma ele já vai configurar automaticamente o relacionamentos entra as tabelas
	
	- Quando temos mas de um relacionamento entre as mesma tabelas precisamos da nome para a relação entre essas tabelas, @relations(nome da relação)	exemplo um usuário pode ter vários filmes, mas ele pode ter também filmes favoritos isso vai gera duas relações entre a tabela filmes e usuário, onde terei a relação dos filmes favoritos, mas o usuário também tem vários filmes.
	
	 


Quando usamos o [Postgresql docker](Postgresql%20docker.md) podemos usa o enum para dizer que um capo pode ter aqueles dados em específico
exemplo 
`enum Role {`
	`student`
	`instructor`
`}`

Se eu passa Role para uma coluna essa coluna só poderá receber um dos dois valores contidos no enum student ou instructor também podemos dizer qual sera o valor default para a coluna passando @default(student) passado o valor que será o padrão, caso nenhum valor seja passado.

