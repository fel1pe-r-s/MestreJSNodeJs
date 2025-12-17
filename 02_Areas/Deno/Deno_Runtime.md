# Deno

**Tags**: `#Deno` `#Runtime` `#JavaScript`
**Data**: 2024-12-17
**Links Relacionados**: [[Node]], [[Rust]]

---

## 💡 O que é?
Deno é um runtime seguro para JS e TS, criado por Ryan Dahl (o mesmo criador do Node.js) para corrigir os "erros" de design do Node.

## ⚙️ Como funciona?
Construído em Rust e V8.
- **Segurança**: Sem acesso a disco/rede por padrão (precisa de flags `--allow-net`).
- **Sem node_modules**: Importa dependências via URL.
- **TS Nativo**: Roda TypeScript sem config extra.

## 💻 Exemplo Prático
```typescript
// import via URL
import { serve } from "https://deno.land/std@0.140.0/http/server.ts";

console.log("Hello Deno");
```

## 🧠 Por que isso é importante?
- **Segurança First**: Ideal para executar código não confiável.
- **Padrões Web**: Usa APIs do navegador (fetch, WebSocket) como padrão.

## 📚 Referências
- [Deno Land](https://deno.land/)
