# Docker

**Tags**: `#Docker` `#DevOps` `#Container`
**Data**: 2024-12-17
**Links Relacionados**: [[Virtualização]], [[Containers]]

---

## 💡 O que é?
Docker é uma plataforma que permite criar, implantar e executar aplicações em **containers**. Imagine containers de navio: eles padronizam o transporte de cargas diferentes. O Docker faz isso com software, empacotando código e dependências para rodar em qualquer lugar.

## ⚙️ Como funciona?
Ele utiliza recursos do Kernel do Linux (Namespaces e Cgroups) para isolar processos. Diferente de uma Máquina Virtual (VM) que emula um SO inteiro, o Docker compartilha o Kernel do host, sendo muito mais leve.

- **Imagens**: O "planta" ou receita (read-only).
- **Containers**: A instância rodando da imagem.

## 💻 Exemplo Prático
Criando um container Nginx simples:
```bash
# Baixa e roda a imagem nginx na porta 8080
docker run -d -p 8080:80 --name meu-site nginx
```

Criando um Dockerfile básico:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
CMD ["node", "app.js"]
```

## 🧠 Por que isso é importante?
- **Consistência**: "Funciona na minha máquina" e funciona em produção.
- **Isolamento**: Várias apps com diferentes versões de Node/Python no mesmo servidor.
- **Escalabilidade**: Fácil subir e descer réplicas.

## 📚 Referências
- [Docker Documentation](https://docs.docker.com/)
