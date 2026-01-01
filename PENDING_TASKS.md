# Futuras Tarefas e Pendências

Este documento consolida todas as tarefas pendentes identificadas em planos de implementação e walkthroughs anteriores.

## Infraestrutura e Backend
- [ ] Explorar rotas do backend e estrutura (Health check em /)
- [ ] Verificar implementação do endpoint /weather/logs
- [ ] Implementar Schema do Banco de Dados: `wallets`, `transactions`, `credits_packages`
- [ ] Lógica para Compra de Créditos e integração Stripe PIX
- [ ] Dedução de saldo ao solicitar serviço
- [ ] Webhooks para liberação automática de saldo
- [ ] Dashboard Admin: CRUD de Serviços e Planos
- [ ] API de rastreamento de status de pedidos
- [ ] Integração WhatsApp API (Envio de resultados em Imagem/PDF)
- [ ] Docker Nginx: Criar Dockerfile de produção

## Frontend e UI/UX
- [ ] Interface da Carteira (Wallet) e histórico de transações
- [ ] Formulário de solicitação de serviço (Área do Cliente)
- [ ] Dashboard Admin (Estatísticas e Gestão de Usuários)
- [ ] Correção de erros de tipagem no Next.js (Cannot find name 'h1')
- [ ] Validar Fluxo de Cadastro e Login com Testes E2E
- [ ] Templates Vite (Opcional/Futuro)

## Testes e Qualidade
- [ ] Identificar e corrigir erros de tipo em spec files (`weather.service.spec.ts`)
- [ ] Garantir que todos os testes passem (Unitários, Integração e E2E)
- [ ] Verificar ausência de erros de linting em todo o monorepo
- [ ] Teste E2E: Fluxo completo (Cliente compra crédito -> faz pedido -> vê status)

## Documentação e Gestão
- [ ] Finalizar documentação técnica de cada subprojeto
- [ ] Configurar CI/CD para deploy automático na VPS
- [ ] Manter links de repositórios independentes atualizados

