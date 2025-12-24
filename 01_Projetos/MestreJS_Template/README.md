# MestreJS Project Template

Template oficial para novos projetos do ecossistema MestreJSNodeJs.

## 🏛️ Arquitetura
Este template segue os princípios da **Clean Architecture**:
*   `src/domain`: Regras de negócio puras, entidades e interfaces. Sem dependências de frameworks.
*   `src/infra`: Implementações concretas, banco de dados, CLI, API (Express/Fastify).
*   `test`: Testes unitários e de integração (Vitest).

## 🚀 Como usar este Template
1.  Clique em **"Use this template"** no GitHub.
2.  Clone seu novo repositório.
3.  Instale as dependências com `pnpm`:
    ```bash
    pnpm install
    ```

## 📦 Comandos
*   `pnpm dev`: Roda em modo de desenvolvimento.
*   `pnpm test`: Roda os testes (Vitest).
*   `pnpm build`: Compila o projeto (tsup).

## 🛡️ Padrões
*   **Runtime**: Node.js (compatível com Bun).
*   **Gerenciador de Pacotes**: pnpm (obrigatório).
*   **Validação**: Zod.
