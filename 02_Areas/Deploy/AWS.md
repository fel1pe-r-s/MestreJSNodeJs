#Deploy 
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