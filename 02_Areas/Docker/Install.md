#Docker # Docker engine [doc](https://docs.docker.com/engine/install/ubuntu/)
#docker 
instale as dependência e atualize o wsl

```bash
# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update

```
Instale o docker
``` bash
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```
verifique a instalação
``` bash
sudo docker -v
```

der ao Docker privilégios de usuário 
```bash
sudo groupadd docker
sudo usermod -aG docker $USER
newgrp docker
```

para testa
```bash
docker run hello-world
```

Configurações
Iniciando ao inicia o sistema operacional
```bash
sudo systemctl enable docker.service

```