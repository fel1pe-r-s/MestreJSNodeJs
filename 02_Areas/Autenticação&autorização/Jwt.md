#Autenticação_autorização

 [Documentação](https://jwt.io/) 
 Formas de autenticação entre aplicações como micro serviços para garantir a segurança podemos usar o algoritmo RS256 para criar usar duas chaves uma publica que server apenas para verificar se o JWT token é valido.
 podemos criar uma chave publica a partir de uma chave privada, para gera usamos o RSA 
 
Gera chaves publicas e privadas no windows
	openssl genrsa -out private_key.pem 2048
	openssl rsa -pubout -in private_key.pem -out public_key.pem  

Converter em base64
	base64 -w 0 private_key.pem > private_key-base64.txt
	base64 -w 0 public_key.pem > public_key-base64.txt
	
Depois podemos usar o Buffet do node para fazer o decode quando for usar a chave

para criar jwt usamos o `sign({sub: user.id})` o sub guarda informações do usuário que depois podemos extrai do token, sendo importante para sabemos quem é o usuário qual pertence esse token, para isso podemos passa id para o sub, e ate passa outros dados como roles desse usuário basta adicionar outra key `sign({sub: user.id, role: student})` , evitar passa dados sensível já que qualquer um com acesso ao token pode extrai esses dados.