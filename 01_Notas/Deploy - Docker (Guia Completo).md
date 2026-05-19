# 🐋 Deploy - Docker (Guia Completo)

**Tags**: `#Docker` `#DevOps` `#Deploy` `#Container`

---

## 💡 Introdução
Rodar projetos com Docker permite executar aplicações sem instalar ferramentas na máquina host. O `Dockerfile` define a imagem da aplicação e o `docker-compose.yml` orquestra múltiplos contêineres (APP + DB + Cache).

---

## ⚙️ Instalação (Ubuntu/WSL2)
```bash
# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update

# Instalar pacotes
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Permissão de usuário
sudo usermod -aG docker $USER
newgrp docker
```

---

## 📜 Cheat Sheet de Comandos
| Comando | Descrição |
| :--- | :--- |
| `docker build -t <nome> .` | Cria uma imagem a partir de um Dockerfile |
| `docker run -dp <host>:<cont> <imagem>` | Roda em background com mapeamento de porta |
| `docker ps` | Lista contêineres em execução |
| `docker stop/start/rm <id>` | Gerencia o ciclo de vida do contêiner |
| `docker image ls` | Lista imagens baixadas/criadas |
| `docker exec -it <id> /bin/bash` | Acessa o terminal dentro do contêiner |
| `docker network create <nome>` | Cria uma rede para comunicação entre contêineres |

---

## 🏗️ Docker Compose (Exemplo Fullstack)
```yaml
services:
  db:
    image: postgres:latest
    ports: ["5432:5432"]
    environment: [POSTGRES_USER=user]
    
  api:
    build: ./api
    ports: ["5002:5002"]
    depends_on: [db]
    env_file: [./api/.env]

  nginx:
    image: nginx:latest
    ports: ["80:80"]
    volumes: ["./nginx.conf:/etc/nginx/conf.d/default.conf"]
```

---

## 🌐 Deploy na AWS (EC2)
1. Crie uma instância EC2 (Ubuntu).
2. Configure o Security Group (Portas 22, 80, 443).
3. Instale o Docker (conforme guia acima).
4. Configure um Proxy Reverso com **NGINX** para apontar para seu contêiner.

---

## 🛠️ Boas Práticas
- **.dockerignore**: Sempre ignore `node_modules` e `.git`.
- **Comunicação**: Use o nome do serviço no Compose como HOST (ex: `mongodb://mongo-db:27017`).
- **Multi-stage builds**: Use imagens como `node:alpine` para reduzir o tamanho final.
