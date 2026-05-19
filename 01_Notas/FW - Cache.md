#Framework

O cache é  usado para evitar toca varias vezes no banco de dados.
Quando trabalhamos com cache tem que ter em mente que que teremos que lidar com informações desatualizadas.

Por isso usamos em informações que não alteram com frequência.

O que é? quando um primeiro usuário busca esse dado, ele fica em cache de algum serviço como [[Redis]] e os demais usuários quando acessão o mesmo conteúdo ele vão ver o que esta em cache.
O cache não deve ser por um tempo longo para evitar dados errados.

O cache geralmente fica na camada de infra, exemplo pegamos o valor de retorno da nossa camada de persistência e salvamos no cache exemplo: ingredientes usado em um prado do cardápio, os dados do ingredientes usados dificilmente serão alterado, então podemos salva em cache, no momento que tivemos a primeira requisição de busca dos detalhes do produto/prato

ele recebe uma chave e um valor, 
exemplo idUser:  5564 ; value: dados do user como nome/foto

geralmente temos 3 métodos nesse para lidar com cache
set para escrita
get para pegar os dados 
delete para invalidar os dados do cache

antes de busca os dados no banco de dados sempre chamamos o método get para verificar se tem cache, se sim ele ja retorna o cache e não executar a requisição ao banco de dados.