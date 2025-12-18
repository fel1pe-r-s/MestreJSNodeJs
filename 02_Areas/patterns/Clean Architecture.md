#patterns


![](CleanArch_Diagram.png)

- Essa camada geralmente colocamos tudo que é relacionado a camada de infra esturrara 

	- Frameworks e Drivers
		- web -> (api) nossa conexão http que vai chamar nosso controller da camada Interface Adapters.
		- Devices -> outros tipos de cliente como mobile, android, IOs
		- DB -> ORM [Prisma](Prisma.md) ou um banco de dados diretamente
		- External Interfaces -> api externa exemplo de envio de email.
		- UI -> Front End
	
	- Interface Adapters
		- Controller -> faz a interação com meu caso de uso, recebe as requisição externas
		- Presenters -> Ele é responsável por adaptar a apresentação dos dados para nossa camada mas externa, 
			- exemplo eu pego apenas os dados que preciso e converto para uma nova estrutura.
		-  Gateways -> adapitar tudo que é externo a aplicação como uma api de notificação/email, adapitando ela para ser usada pela aplicação.
			- exemplo, uma função que fica responsável pela criptografia de dados e validação de dados criptografados, como a senha onde fazemos o hash da senha e ou compare, e geração de token
		- Repository -> pode se conecta com a camada do Drivers como por exemplo com o DB, usado para persistir dados, essa camada vai se comunicar com a camadas do meu caso de uso e minha camada de interface, funcionando como um Adaptador/Interface para comunicação

-  Mappers
		Quando trabalhamos com arquitetura em camadas, é muito comum temos nossa entidade de domínio com dados diferentes da camada de infra. 
		Dessa forma podemos converter uma entidade de uma camada para a forma da entidade de outra camada.
		exemplo, eu pego dados da entidade usuário que tem um formato no banco de dados, mas a minha aplicação a entidade usuário tem outro formato, então converto meus dados, antes de retorna os dados a camada de domínio.

- Essas camada fica nossas entidades de domínio  
	- Aplication Business Rules
		- Use Cases -> um caso de uso pode depender deuma Interface/Adapter como um Repositories, mas não pode usada diretamente por pela camada do framework uma vez que o use case não deve chamar diretamente a camada mas externa como a DB ja que ela tem que ser independente do banco de dados.
		
	- Entrerptise Business Rules
		- Entities -> nossa camada de domínio.

- As vantagens de utilizar uma arquitetura em camadas são muitas, porém podemos pontuar algumas:

	- Testável. As regras de negócios podem ser testadas sem a interface do usuário, banco de dados, servidor ou qualquer outro elemento externo.
	
	- Independente da interface do usuário. A interface do usuário pode mudar facilmente, sem alterar o restante do sistema. Uma UI da Web pode ser substituída por uma UI do console, por exemplo, sem alterar as regras de negócios.
	
	- Independente de banco de dados. Você pode trocar o Oracle ou SQL Server, por Mongo, BigTable, CouchDB ou qualquer outro. Suas regras de negócios não estão vinculadas ao banco de dados.
	
	- Independente de qualquer agente externo. Na verdade, suas regras de negócios simplesmente não sabem nada sobre o mundo exterior, não estão ligadas a nenhum Framework.
