# Node.js

**Tags**: `#Node` `#Runtime` `#Backend`
**Data**: 2024-12-17
**Links Relacionados**: [[JavaScript]], [[Bun]]

---

## 💡 O que é?
Um runtime JavaScript construído sobre a engine V8 do Chrome. Permite rodar JS no servidor.

## ⚙️ Como funciona?
Famoso por seu modelo de I/O não bloqueante e orientado a eventos. Ideal para aplicações I/O heavy (API, Realtime).

## 💻 Exemplo Prático (HTTP Server)
```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  res.end('Hello Node');
});

server.listen(3000);
```

## 🧠 Por que isso é importante?
- **Fullstack**: Usar a mesma linguagem no Front e Back.
- **Performance**: Excelente para alta concorrência com baixo consumo de recursos.

## 📚 Referências
- [Node.js Docs](https://nodejs.org/en/docs/)
