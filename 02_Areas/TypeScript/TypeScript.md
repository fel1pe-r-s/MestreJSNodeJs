# TypeScript

**Tags**: `#TypeScript` `#JavaScript` `#Microsoft`
**Data**: 2024-12-17
**Links Relacionados**: [[JavaScript]], [[Node]]

---

## 💡 O que é?
Um superset (superconjunto) do JavaScript que adiciona **tipagem estática**. Todo código JS válido é código TS válido.

## ⚙️ Como funciona?
O código TS é "transpilado" para JavaScript comum para rodar no navegador ou Node. A checagem de tipos acontece apenas em tempo de desenvolvimento/build, prevenindo erros antes de rodar.

## 💻 Exemplo Prático
```typescript
function soma(a: number, b: number): number {
    return a + b;
}
// soma("1", 2) -> Erro no editor!
```

## 🧠 Por que isso é importante?
- **Escalabilidade**: Essencial para projetos grandes.
- **DX (Developer Experience)**: Autocomplete e refatoração muito superiores.
- **Segurança**: Elimina "undefined is not a function" em muitos casos.

## 📚 Referências
- [TypeScript Doc](https://www.typescriptlang.org/)
