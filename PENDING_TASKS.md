# Futuras Tarefas e Pendências por Projeto

Este documento detalha o que ainda falta ser feito em cada projeto dentro do ecossistema MestreJSNodeJs, agrupado por área de interesse.

---

## 🚀 SaaS_Plataforma (Monorepo Laravel + Vue/Next.js)
Este é o projeto principal de infraestrutura comercial.
- [ ] **Banco de Dados**: Implementar schema para `wallets`, `transactions` e `credits_packages`.
- [ ] **Pagamentos**: Finalizar integração com Stripe PIX e configuração de Webhooks para liberação automática.
- [ ] **Lógica de Negócio**: Implementar dedução de saldo por requisição de serviço e fluxo de pedidos (`Pending` -> `In Progress` -> `Completed`).
- [ ] **Área do Administrador**: Criar CRUD de Serviços/Planos e Dashboard de estatísticas/gestão de usuários.
- [ ] **Área do Cliente**: Desenvolver formulário de solicitação de serviço e histórico da carteira.
- [ ] **Integrações**: Integrar WhatsApp API para envio de resultados (Imagem/PDF) e API de rastreamento.
- [ ] **Infraestrutura**: Criar Dockerfile de produção com Nginx e configurar pipeline de deploy.

## 🩺 HealhThesis / WellnessThesis
Focado em portal de saúde e blog moderno.
- [ ] **Tipagem**: Corrigir erro "Cannot find name 'h1'" no TypeScript.
- [ ] **Autenticação**: Resolver redirecionamento pós-login no Next.js (Edge Runtime JWT handling).
- [ ] **Estilização**: Garantir consistência do Tailwind CSS em todas as páginas e componentes.

## 🌡️ Collector / Worker Service (Monitoramento de Clima)
Sistema distribuído com RabbitMQ e NestJS.
- [ ] **Qualidade**: Resolver erros de tipo nos arquivos de teste (`weather.service.spec.ts`).
- [ ] **Endpoints**: Implementar e verificar o endpoint `/weather/logs`.
- [ ] **Saúde do Sistema**: Adicionar rota de health check (`/`) no backend.

## 📊 Gdashchallenge
Desafio de dashboard e análise de dados.
- [ ] **Fluxo**: Revisar e finalizar o walkthrough conforme planejado nos documentos de planejamento.
- [ ] **Testes**: Validar fluxos críticos conforme plano de implementação e2e.

## 🛠️ Geral e Infraestrutura do Monorepo
- [ ] **Documentação**: Atualizar os links de referência de todos os subprojetos em `01_Projetos`.
- [ ] **CI/CD**: Configurar GitHub Actions globais para linting e validação de todos os repositórios migrados.
- [ ] **Docker**: Padronizar `docker-compose.yml` para desenvolvimento local rápido de todo o ambiente.

---
*Mantenha este arquivo atualizado conforme as tarefas forem sendo concluídas.*
