# Bun

**Tags**: `#Bun` `#Runtime` `#JavaScript`
**Data**: 2024-12-17
**Links Relacionados**: [[Node]], [[Deno]]

---

## 💡 O que é?
Bun é um runtime "all-in-one" para JavaScript e TypeScript. Ele quer substituir Node.js, npm, webpack, e vitest com uma única ferramenta.

## ⚙️ Como funciona?
Escrito em Zig e usando a engine JavaScriptCore (do Safari) em vez da V8 (do Chrome/Node), ele foca em performance extrema e startup instantâneo.

## 💻 Exemplo Prático
```bash
# Rodar arquivo TS direto
bun run index.ts

# Instalar pacotes (super rápido)
bun install react
```

## 🧠 Por que isso é importante?
- **Velocidade**: Startup 3x mais rápido que Node.
- **Tooling Integrado**: Já vem com bundler, test runner e suporte a TS nativo.

## 📚 Referências
- [Bun Official Site](https://bun.sh/)
