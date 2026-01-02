# 📅 MestreJSNodeJs - Master Task List (Migration Ready)

Este documento centraliza todas as pendências críticas de todos os subprojetos. Foi estruturado para que você possa simplesmente fornecer este arquivo (ou as partes relevantes) a um assistente de IA em sua nova máquina para retomar o trabalho instantaneamente.

---

## 🚀 SaaS_Plataforma (Laravel 12 + Vue/Next.js)
**Contexto**: Infraestrutura básica com Sail/Docker está funcional. Autenticação básica implementada.

### Tarefas Pendentes:
- [ ] **Módulo Financeiro**:
    - **Ações**: Criar migrations para \`wallets\`, \`transactions\`, \`credits_packages\`.
    - **Prompt**: "Implemente o sistema de carteira (Wallet) no Laravel. Crie as tabelas de carteira vinculada ao usuário, histórico de transações e pacotes de créditos. Use Clean Architecture para separar a lógica de crédito/débito em Use Cases."
- [ ] **Integração Stripe (PIX)**:
    - **Ações**: Instalar SDK Stripe, configurar chaves no .env, criar Webhook handler.
    - **Prompt**: "Configure o Stripe para aceitar pagamentos via PIX. Implemente o Webhook que escuta o evento \`payment_intent.succeeded\` e adiciona automaticamente os créditos à carteira do usuário."
- [ ] **Fluxo de Pedidos & WhatsApp**:
    - **Ações**: Criar CRUD de Serviços, Order tracking e integração com API de WhatsApp.
    - **Prompt**: "Desenvolva o sistema de ordens de serviço. Quando um cliente faz um pedido, o saldo deve ser descontado. Ao finalizar, envie o resultado (PDF/Imagem) via API do WhatsApp."

---

## 🛠️ MestreCLI (Go)
**Contexto**: CLI funcional para gerar scaffolds. V3 com suporte a Vite em andamento.

### Tarefas Pendentes:
- [ ] **Docker Nginx Preview**:
    - **Ações**: Adicionar template de Nginx para projetos Vite no gerador.
    - **Prompt**: "No MestreCLI (Go), atualize o template de Frontend Vite para incluir um Dockerfile multi-stage. O primeiro estágio faz o build (Node), o segundo serve os arquivos estáticos usando Nginx Alpine."
- [ ] **Integração Fullstack (Hono + Next.js)**:
    - **Ações**: Finalizar lógica do Wizard para integrar Hono como adapter de API no Next.js.

---

## 🩺 HealhThesis / WellnessThesis (Next.js 14)
**Contexto**: Blog para marketing de afiliados. Erro de tipagem pendente.

### Tarefas Pendentes:
- [ ] **Correção de Tipagem JSX**:
    - **Prompt**: "Corrija o erro 'Cannot find name h1' no arquivo [page.tsx](file:///home/felipe/O%20mestre/MestreJSNodeJs/01_Projetos/WellnessThesis/src/app/post/%5Bslug%5D/page.tsx). Certifique-se de que o \`tsconfig.json\` está configurado com \`"jsx": "preserve"\` ou \`"jsx": "react-jsx"\` e importe React explicitamente se necessário."
- [ ] **Ads & CTA Engine**:
    - **Prompt**: "Implemente o sistema dinâmico de anúncios. Os posts devem permitir a inserção de scripts de Ads em slots específicos (Top, In-feed, Bottom) e botões de CTA personalizados para afiliados."

---

## 🌡️ Collector / Worker Service (NestJS + Python + Go)
**Contexto**: Sistema distribuído meteorológico. Conexão RabbitMQ URI corrigida.

### Tarefas Pendentes:
- [ ] **Monitoramento de Clima (\`/weather/logs\`)**:
    - **Prompt**: "No backend NestJS, implemente o endpoint \`GET /weather/logs\` que retorna o histórico de dados processados pelo Worker (armazenados no MongoDB). Adicione paginação e filtros por data/cidade."
- [ ] **Saúde do Sistema (Health Checks)**:
    - **Prompt**: "Adicione \`Terminus\` ao NestJS para criar uma rota de health check (\`/prod/health\`) que verifica a conexão com o MongoDB e o RabbitMQ."

---

## 📁 Referência Visual Arquitetural
![Esquema de Infraestrutura](/home/felipe/.gemini/antigravity/brain/b47fb4c5-da01-4c1a-acc4-ede3cd92b256/uploaded_image_1766626063390.png)
*Diagrama de referência para a arquitetura SaaS e Monorepo.*

---
*Gerado em 01/01/2026 para fins de migração de ambiente.*
