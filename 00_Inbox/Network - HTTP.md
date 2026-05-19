#Network

**HTTP e seus Métodos**

- **HTTP (Hypertext Transfer Protocol):** É fundamental para a funcionalidade da web moderna.
- **Comunicação Cliente-Servidor:** Um cliente (como seu computador ou celular) envia uma requisição para um servidor, que então responde, permitindo interações na web.
- **Métodos HTTP:** Embora o vídeo não detalhe os métodos, os mais comuns incluem:
    - **GET:** Solicita dados de um servidor.
    - **POST:** Envia dados para o servidor para criar ou atualizar um recurso.
    - **PUT:** Substitui um recurso existente por dados enviados.
    - **DELETE:** Exclui um recurso especificado.
    - **Outros métodos:** HEAD, OPTIONS, CONNECT, TRACE, PATCH.

**HTTP Headers**

- Os cabeçalhos HTTP são metadados em pares chave-valor enviados com requisições e respostas HTTP.
- Eles podem definir o comportamento do cache, facilitar a autenticação e gerenciar o estado da sessão.
- **Exemplos de cabeçalhos:**
    - `Accept-Language`: Indica a linguagem preferida do cliente.
    - `Allow`: Lista os métodos HTTP aceitos pelo servidor.
    - `Content-Type`: Indica o tipo de dados no corpo da mensagem (ex: `text/html`, `application/json`).
    - `Cookie`: Contém informações de cookies.
    - `Authorization`: Usado para autenticação.


**Corpo da Requisição (Request Body): A Mensagem Secreta**

- **O que é:** É a parte da requisição HTTP que carrega os **dados** que o cliente quer enviar para o servidor. Pense nele como o conteúdo de uma carta.
    
- **Quando usar:** Principalmente quando você precisa enviar informações para o servidor criar algo novo ou atualizar algo que já existe (usando métodos como `POST` e `PUT`).
    
- **Exemplo Simples:** Imagine que você está cadastrando um novo usuário em um site. Os dados que você digita (nome, e-mail, senha) são colocados no corpo da requisição e enviados para o servidor para criar sua conta. O formato desses dados pode ser JSON, por exemplo:
    
    JSON
    
    ```
    {
      "nome": "Ana Silva",
      "email": "ana.silva@email.com",
      "senha": "senha123"
    }
    ```
