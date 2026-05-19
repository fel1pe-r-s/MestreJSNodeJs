# 🚀 Roadmap de Aprofundamento: MestreJS

Este guia define tarefas práticas para transformar o conhecimento das notas em domínio técnico. As tarefas estão divididas pelos grandes pilares do seu cofre.

---

## 🟢 1. JavaScript Runtimes (Node, Bun, Deno)
**Objetivo**: Entender as nuances de performance e segurança além do básico.

- [ ] **Desafio Multi-Runtime**: Criar um script de automação simples que use a API de File System e testar a execução nos três runtimes, medindo o tempo de startup com o comando `time`.
- [ ] **Segurança com Deno**: Refatorar uma pequena API de leitura de arquivos para rodar no Deno, configurando as permissões mínimas necessárias (`--allow-read`) para garantir segurança.
- [ ] **Bundling com Bun**: Usar o bundler nativo do Bun para compilar um projeto TypeScript simples em um único arquivo JS e comparar com o output do `tsc`.

---

## 🐋 2. Docker & Infraestrutura
**Objetivo**: Dominar a orquestração e o ambiente de produção.

- [ ] **Multi-Stage Build**: Refatorar o Dockerfile de um dos projetos no `02_Lab` para usar *Multi-Stage Build* (Build no Node e Servir com Nginx), reduzindo o tamanho da imagem final.
- [ ] **Docker Compose Avançado**: Criar um arquivo `docker-compose.yml` que suba: uma API, um banco Postgres, um Redis para cache e um Adminer para visualizar o banco.
- [ ] **Proxy Reverso Manual**: Configurar um contêiner Nginx como proxy reverso para duas APIs diferentes rodando em contêineres separados, usando apenas uma porta 80 no host.

---

## 📐 3. Arquitetura (Clean Arch & DDD)
**Objetivo**: Aplicar padrões que escalam.

- [ ] **Mapeamento de Entidades**: Escolher um projeto do `00_Inbox` e desenhar (no Excalidraw) a separação entre *Domain Entities* e *Database Schema*, identificando onde um *Mapper* é necessário.
- [ ] **Inversão de Dependência na Prática**: Trocar a implementação de um repositório (ex: de Prisma para um Array em memória) em um caso de uso, garantindo que o teste unitário continue passando sem alterações no core da lógica.
- [ ] **Implementação de Value Objects**: Identificar campos como "Email" ou "CPF" em um projeto e transformá-los em *Value Objects* com validação própria, em vez de simples strings.

---

## 🔑 4. Segurança & Auth
**Objetivo**: Implementar fluxos de autenticação nível produção.

- [ ] **Refresh Token**: Implementar a lógica de Refresh Token em uma API NestJS para que o usuário não precise logar toda vez que o JWT expirar.
- [ ] **RBAC Dinâmico**: Criar um middleware que valide permissões baseadas em "Roles" (Admin, Editor, Viewer) usando o conceito de Permissionamento das suas notas.
- [ ] **Algoritmo RS256**: Configurar uma autenticação que utilize par de chaves (Pública/Privada) em vez de uma string simples, conforme mencionado na nota de NestJS.

---

## 🗄️ 5. Banco de Dados & Performance
**Objetivo**: Ir além do CRUD básico.

- [ ] **Otimização de Query**: Usar o `explain analyze` no Postgres (via Docker) para identificar o custo de uma query sem índice e depois com índice.
- [ ] **Caching com Redis**: Implementar uma camada de cache em uma rota de "Listagem" que demora a responder, invalidando o cache sempre que um novo item for criado.

---

## 🛠️ Próximos Passos
1. Escolha **um** pilar para focar nesta semana.
2. Mova a tarefa escolhida para o seu `PENDING_TASKS.md`.
3. Conforme concluir, registre os aprendizados na nota correspondente.
