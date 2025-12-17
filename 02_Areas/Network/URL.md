#Network

**URIs e URLs**

- **URI (Uniform Resource Identifier):** É uma string que identifica um recurso.
- **URL (Uniform Resource Locator):** É um tipo de URI que fornece o endereço de um recurso na web. Quando você digita uma URL no seu navegador, você está fazendo uma requisição HTTP para um servidor.

**URL Paths**

- O vídeo menciona diferentes partes de uma URL e seus significados:
    - O protocolo, como HTTP
    - Nome de usuário e senha
    - O nome do host
    - Subdomínios
    - Domínio de nível superior


**Parâmetros de Busca (Search Params / Query Params): As Perguntas na URL**

- **O que são:** São informações extras que você adiciona ao final da URL, depois de um ponto de interrogação (`?`). Eles servem para fazer "perguntas" ou dar instruções adicionais ao servidor sobre o que você quer.
    
- **Quando usar:** Principalmente quando você quer filtrar, ordenar, buscar ou paginar informações.
    
- **Exemplo Simples:** Imagine que você está buscando produtos em uma loja online. Se você busca por "camisetas vermelhas tamanho M", a URL poderia ser algo assim:
    
    `www.loja.com/busca?q=camisetas+vermelhas&tamanho=M`
    
    Aqui, `q` e `tamanho` são os parâmetros de busca, e seus valores são "camisetas vermelhas" e "M", respectivamente. O servidor usa essas informações para mostrar os resultados da sua busca.
    

**Parâmetros de Rota (Route Params): O Endereço Específico**

- **O que são:** São partes da própria URL que identificam um recurso específico no servidor. Pense neles como o endereço exato de uma casa dentro de um bairro.
    
- **Quando usar:** Quando você quer acessar ou manipular um item específico (como um produto, um usuário, um artigo).
    
- **Exemplo Simples:** Imagine que você quer ver os detalhes de um produto com o ID número 42 em uma loja online. A URL poderia ser:
    
    `www.loja.com/produtos/42`
    
    Aqui, `/produtos` indica a categoria de produtos, e `/42` é o parâmetro de rota que identifica o produto específico com o ID 42. O servidor usa esse parâmetro para encontrar e exibir as informações desse produto em particular.


![[Pasted image 20250423101116.png]]