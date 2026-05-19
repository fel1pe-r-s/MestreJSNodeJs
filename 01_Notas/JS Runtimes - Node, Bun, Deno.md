# 🚀 JavaScript Runtimes - Node, Bun, Deno

**Tags**: `#Runtime` `#JavaScript` `#TypeScript` `#Backend`

---

## 🟢 Node.js
O padrão da indústria, construído sobre a engine **V8** do Chrome. Famoso por seu modelo de I/O não bloqueante e ecossistema massivo (NPM).

### ⚙️ Como funciona?
Ideal para aplicações I/O heavy (API, Realtime).
```javascript
const http = require('http');
const server = http.createServer((req, res) => res.end('Hello Node'));
server.listen(3000);
```

---

## 🍔 Bun
Runtime "all-in-one" escrito em **Zig** e usando a engine **JavaScriptCore** (Safari). Foca em performance extrema.

### ⚙️ Como funciona?
Startup instantâneo e ferramentas integradas (Bundler, Test Runner, TS Nativo).
```bash
# Rodar arquivo TS direto
bun run index.ts
# Instalar pacotes
bun install react
```

---

## 🦕 Deno
Runtime seguro criado por Ryan Dahl para corrigir falhas de design do Node. Construído em **Rust** e **V8**.

### ⚙️ Como funciona?
- **Segurança**: Sem acesso a disco/rede por padrão.
- **Sem node_modules**: Importa dependências via URL.
- **TS Nativo**: Suporte direto.
```typescript
import { serve } from "https://deno.land/std/http/server.ts";
console.log("Hello Deno");
```

---

## 📊 Comparativo Rápido
| Característica | Node.js | Bun | Deno |
| :--- | :--- | :--- | :--- |
| **Engine** | V8 | JavaScriptCore | V8 |
| **Linguagem Core** | C++ | Zig | Rust |
| **TS Nativo** | Com ferramentas | Sim | Sim |
| **Segurança** | Aberta | Aberta | Sandbox |
| **Gerenciador** | npm/yarn/pnpm | Integrado (Rápido) | URL / Import Maps |
