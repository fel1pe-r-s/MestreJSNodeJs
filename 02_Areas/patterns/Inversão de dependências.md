# Inversão de Dependência (DIP)

**Tags**: `#Patterns` `#SOLID` `#Architecture`
**Data**: 2024-12-17
**Links Relacionados**: [[SOLID]], [[Injeção de Dependência]]

---

## 💡 O que é?
É a letra "D" do SOLID. Diz que módulos de alto nível (regras de negócio) não devem depender de módulos de baixo nível (detalhes como DB, UI). Ambos devem depender de **abstrações** (interfaces).

## ⚙️ Como funciona?
Em vez de sua classe `UsuarioService` instanciar `MySQLRepository`, ela recebe uma interface `IRepository` no construtor. Isso inverte o controle: quem chama o serviço decide qual repositório usar.

## 💻 Exemplo Prático (TypeScript)
```typescript
// Errado (Dependência Forte)
class Service {
  repo = new MySQLRepo(); // Acoplado!
}

// Certo (Inversão de Dependência)
interface IRepo { save(data: any): void }

class Service {
  constructor(private repo: IRepo) {} // Desacoplado
}

const service = new Service(new PostgresRepo());
```

## 🧠 Por que isso é importante?
- **Testabilidade**: Fácil mockar o banco de dados nos testes.
- **Flexibilidade**: Trocar MySQL por Mongo exige 0 mudanças na regra de negócio.

## 📚 Referências
- [Clean Architecture - Uncle Bob](https://blog.cleancoder.com/)
