#patterns

[[DDD]]
[[Clean Architecture]]
[[Inversão de dependências]]

Lidando com entidades que é representada diferente em camadas diferentes.

representação da entidade usuário na camada banco de dados tem X propriedades.

mas na camada de domínio temos ela representada como uma classe com X propriedades.

já na camada HTTP onde  retornamos os dados dessa entidade podemos ter outra forma de representa os  dados dessa entidade.

Para comunicação entre essas camada podemos usar os mappers convertendo o formato que a entidade é representada em outra camada.

![](Pasted%20image%2020241007093448.png)