# HealthThesis - Science-Based Wellness & Beauty Blog

**Tags**: #Autenticação&autorização #CSS #Database #Docker #Git #GitHubActions #Html #JTW #JavaScript #Markdown #Nextjs #Node #React #Tailwind #TypeScript #Zod #jest #vitest

Este projeto é um portal de conteúdo focado em saúde metabólica, nutrição e estética, otimizado para **Marketing de Afiliados** e **Google Ads**. Desenvolvido com **Next.js**, **Node.js** e **MongoDB**.

---

## 🚀 Como Rodar a Aplicação

### Pré-requisitos
- Docker & Docker Compose
- Node.js 20+ (opcional para rodar localmente sem Docker)

### 🐋 Usando Docker (Recomendado)

O ambiente Docker simula o ambiente de produção e já configura o banco de dados e uma ferramenta de interface para o MongoDB.

1.  **Subir os serviços:**
    ```bash
    docker compose up -d
    ```
2.  **Acessar a Aplicação:**
    - Site: [http://localhost:3000](http://localhost:3000)
    - Admin: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
    - MongoDB Express (GUI): [http://localhost:8081](http://localhost:8081)

### 💻 Rodando Localmente (Sem Docker)

1.  **Instalar dependências:**
    ```bash
    npm install
    ```
2.  **Configurar Variáveis de Ambiente:**
    Crie um arquivo `.env.local` baseado no `.env.example`.
3.  **Popular Banco de Dados Inicial:**
    ```bash
    npm run seed
    ```
4.  **Iniciar em Desenvolvimento:**
    ```bash
    npm run dev
    ```

---



---

## 🛣️ Mapeamento de Rotas

### 🌐 Frontend (Público)
| Rota | Descrição |
| :--- | :--- |
| `/` | Home Page com posts recentes e slots de anúncios. |
| `/post/[slug]` | Página de leitura do artigo com CTA de afiliado e Ads. |

### 🛠️ Painel Administrativo (Privado)
*Todas as rotas abaixo exigem autenticação via JWT Cookie.*

| Rota | Descrição |
| :--- | :--- |
| `/admin/login` | Tela de acesso ao painel. |
| `/admin/dashboard` | Resumo estatístico do blog. |
| `/admin/posts` | Lista detalhada de todos os posts com opções de Edit/Delete. |
| `/admin/posts/new` | Formulário para criação de novos artigos e configuração de Ads. |
| `/admin/posts/edit/[id]` | Edição de conteúdo e scripts de anúncios existentes. |

---

## 📂 Estrutura do Projeto

- `src/app`: Páginas e APIs do Next.js (App Router).
- `src/components`: Componentes UI (Header, Footer, AdSlots).
- `src/lib`: Utilitários (Conexão MongoDB, JWT, Bcrypt).
- `src/models`: Definição de Schemas do banco de dados (Zod + Mongoose).

---

## ☁️ Deploy na Hostinger

O projeto está configurado para ser compatível com o runtime Node.js da Hostinger. 
1. Conecte seu repositório GitHub no painel da Hostinger.
2. Configure as variáveis `MONGODB_URI` e `JWT_SECRET` nas "Environment Variables" do painel.
3. O build (`npm run build`) gera uma pasta `.next/standalone` otimizada para o deploy.
