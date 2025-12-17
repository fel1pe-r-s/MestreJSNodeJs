#Deploy

[Doc]((https://docs.docker.com/)

[Install Docker](Setup%20dev.md)
#docker 
# Introdução

Rodando um projeto com docker isso possibilita executar um aplicação sem precisar instalar varias ferramentas na maquina host, apenas com o dockerfile para definir a imagem da aplicação e o docker compose para executa a instalação das imagens externas e configurações necessárias para essas imagens como banco de dados etc..


```
docker compose watch
```


```

# Criando um app-full-stack contêinerizado

```
git clone git@github.com:codethi/ThiCodeWallet.git
cd ThiCodeWallet

## api
Crie o Dockerfile no /api

```yml
FROM node:20-alpine

WORKDIR /api

COPY . .

RUN yarn install --production

CMD ["npm", "start"]

EXPOSE 5002
```
no .dockerignore 
```yml
node_modules
Dockerfile
```

Executando build para criar uma imagem da aplicação
da um nome para imagem que será criada ``-t
```console
docker build -t api-wallet .
```

visualizar as imagens adicionadas no docker
```console
docker image ls
```

execute o a imagem criada definindo a porta-docker:porta-expota e o nome da aplicação
```console
docker run -dp 127.0.0.1:5002:5002 api-wallet
```

## Atualizando a aplicação

```
docker stop <id-conteinet>
```

apagar o contêiner da aplicação

```
docker rm <id-conteinet>
```

vamos roda novamente a imagem da nossa api, podemos já adicionada a #network  para fazer a comunicação entre contêineres.
Também podemos adicionar um name ao nosso contêiner
```
docker run --name api-wallet --network net-wallet -dp 127.0.0.1:5002:5002 api-wallet
```
## Contêiner DB Mongose
roda uma executa um contêiner ``docker run
da um nome para  o contêiner `` --name 
roda em segundo plano ``-d
nome da imagem que será rodada ``mongo
 adiciona a uma #network ``--network 
```
docker run -d --name mongo-wallet -p 27017:27017 --network net-wallet mongo
```
Agora como fica a url para se conecta ao banco de dados usando a comunicação entre contêineres 
quando estamos conectando uma ampliação externa a um banco de dados normalmente expomos uma porta para fazemos a conexão via local host
exemplo mongo:
```
mongodb://localhost:27017/nomedobanco
```
nesse exemplo não precisamos de usuário e senha pôs não adicionamos no momento da criação da imagem.
exemplo pg:
```
postgresql://test:test@localhost:5432/test?schema=public
```

Agora na comunicação entre contêineres será
exemplo mongo:
```
mongodb://nome-do-conteiner:27017/nome-do-banco
```
exemplo pg:
```
postgresql://test:test@nome-do-conteiner:5432/test?schema=public
```
basicamente alteramos o local host para o nome do conteiner
## Contêiner Front end
Dockerfile
```
FROM node:20-alpine

WORKDIR /tmp/react

COPY . .

RUN rm -rf node_modules

RUN npm install

RUN npm run build

RUN mkdir -p /var/www/html

RUN mv dist/* /var/www/html

VOLUME /var/www/html

WORKDIR /

RUN rm -rf /tmp/react
```
Precisamos fazer o build da aplicação react, para fazemos criamos os arquivos estáticos html, css, js.
O volume vai criar uma pasta onde será salvo na maquina os arquivos do meu app.
Precisamos apagar os arquivos do react, a pois o build, pôs eles não serão usado no servidor web.
execute o build da imagen
```console
docker build -t spa-wallet .
```

executa a imagem, nomear o volume e adicionar ao network
```
docker run -d --name spa-wallet -v spa-volume:/var/www/html --network net-wallet  spa-wallet
```

## Comunicação entre contêineres 
### criando 
#network
o net-wallet é o nome que esta sendo definido para o network
```console
docker network create net-wallet
```
o network por padrão é do tipo bridge "ponte entre contêineres"
agora basta no momento que for executa seu contêiner adicionar a o seguinte parâmetro com o nome do network que foi criado ``--network net-wallet 

# Servidor web NGINX
O NGINX é um servidor web que serve páginas estáticas, como HTML, CSS e JavaScript, de forma eficiente. Ao contrário do Apache, que cria um novo processo para cada requisição, o NGINX utiliza um modelo assíncrono, permitindo o tratamento de múltiplas requisições simultaneamente, melhorando a performance em ambientes de produção.

![NGINX](Pasted%20image%2020240928125923.png)
## Config
```javascript
server {

  listen 80;

  location / {

    root /var/www/html;

    index index.html;

    #fallback

    try_files $uri $uri/ /index.html;

  }



}
```
## Contêiner NGINX

```
FROM nginx:1.15.0

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d
```

execute o build da imagen
```console
docker build -t nginx-wallet .
```

crie o contêiner
```
docker run -d --name nginx-wallet -v spa-volume:/var/www/html -p 80:80 --network net-wallet  nginx-wallet
```


# Composer 
```yml
services:
  mongo-wallet:
    container_name: mongo-wallet
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - mongdb-wallet-volume:/data/db
    restart: always

  api:
    container_name: api-wallet
    build: ./api
    restart: always
    ports:
      - 5002:5002
    depends_on:
      - mongo-wallet
    env_file:
      - ./api/.env

  spa:
    container_name: spa-wallet
    build: ./spa
    depends_on:
      - api
    env_file:
      - ./spa/.env
    volumes:
      - spa-volume:/var/www/html

  nginx:
    container_name: nginx-wallet
    build: ./nginx
    ports:
      - 80:80
    volumes:
      - spa-volume:/var/www/html
    depends_on:
      - mongo-wallet
      - api
      - spa

  

volumes:
  mongdb-wallet-volume:
  spa-volume:
```

obs: como deve ser o .env quando a aplicação estiver sendo executada de forma local
.env do front end para acessa o back
```env
VITE_API_BASE_URL=http://127.0.0.1:5002
```
.env do back para acessa o banco mongo

```env
DATABASE_URI= mongodb://mongo-wallet:27017/wallet

```
# Entendendo contêiner e deploy

![Network](Pasted%20image%2020240928124840.png)

## Deploy aws [youtube](https://www.youtube.com/watch?v=bVzjKJL2b2M&list=TLPQMjgwOTIwMjSvLk9_EGw1Yg&index=10)
- acesse a EC2 
- executar uma instância
	- de um nome
	- escolha o sitema (ubuntu qualificada para plano gratuito)
	- selecione a maquina (a que esteja qualificada como gratuita)
	- tipo de instância (qualificada como gratuita)
	- criar par de chave (ssh)
		- nome
		- rsa
		- .pem
	- create security group, ou use um existente
	- ssh traffic from pode escolher os  ip que podem acessa ou deixa aberto
	- permitir tráfego https da internet
	- permitir tráfego http da internet
- conecta-se a instância
	- abrir o terminal 
	- localize a chave pem que foi baixada na maquina
	- chmod 400 nomedoarquivo.pem
	- conecte usando a DNS publlica
	- terá um exemplo no cliente ssh da aws

### Settings for EC2

#### Docker

Before you install Docker Engine for the first time on a new host machine, you need to set up the Docker repository. Afterward, you can install and update Docker from the repository.

1. Set up Docker's Apt repository.
    
    ```bash
    # Add Docker's official GPG key:
    sudo apt-get update
    sudo apt-get install ca-certificates curl gnupg
    sudo install -m 0755 -d /etc/apt/keyrings
    curl -fsSL <https://download.docker.com/linux/ubuntu/gpg> | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
    sudo chmod a+r /etc/apt/keyrings/docker.gpg
    
    # Add the repository to Apt sources:
    echo \\
      "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] <https://download.docker.com/linux/ubuntu> \\
      "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \\
      sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    sudo apt-get update
    ```
    
2. Install the Docker packages.
    
    ```bash
    sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
    ```
    
3. Verify that the Docker Engine installation is successful by running the `hello-world` image.
    
    ```bash
    sudo docker run hello-world
    ```
    

Receiving errors when trying to run without root?

The `docker` user group exists but contains no users, which is why you’re required to use `sudo` to run Docker commands.

To create the `docker` group and add your user:

1. Create the `docker` group.
    
    ```bash
    sudo groupadd docker
    ```
    
2. Add your user to the `docker` group.
    
    ```bash
    sudo usermod -aG docker $USER
    ```
    
3. Log out and log back in so that your group membership is re-evaluated.
    
    You can also run the following command to activate the changes to groups:
    
    ```bash
    newgrp docker
    ```
    
4. Verify that you can run `docker` commands without `sudo`.
    
    ```bash
    docker run hello-world
    ```
    

#### SSH

The first step is to create a key pair on the client machine (usually your computer):

```jsx
ssh-keygen
```

Press enter for all options, and do not add a password, then get the key with this command:

```jsx
cat ~/.ssh/id_rsa.pub
```

faça o clone do repositório usando ssh
crie o .env usando o vim basta digitar vim .env

front devemos colocar o Ip da nossa maquina na aws e a porta do nossa api
exemplo ``VITE_API_BASE_URL=http://54.84.68.231:api

na api o crie o .env `` DATABASE_URI= mongodb://mongo-wallet:27017/wallet

configure o nginx usando o poxy reverso
```javascript
server {

  listen 80;

  location / {

    root /var/www/html;

    index index.html;

    #fallback

    try_files $uri $uri/ /index.html;

  }

  
//  poxy reverso
  location /api/ {

    proxy_set_header X-Real-IP $remote_addr;

    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

    proxy_set_header Host $http_host;

  

    proxy_pass http://api-wallet:5002/;

  }

}
```
então faça o comando. 
```
docker compose up -d
```
