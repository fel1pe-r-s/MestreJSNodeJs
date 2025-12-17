#Programação ### Passos para criar uma classe de erro personalizada:

1. **Crie uma nova classe que estenda `Error`**.
2. **Chame o construtor da classe pai (`super`)** dentro do seu construtor para passar a mensagem de erro.
3. **Defina uma propriedade `name` personalizada**, que identifica o tipo de erro.
4. **Opcionalmente, adicione propriedades adicionais** que possam ser úteis para diagnóstico, como um código de erro ou metadados específicos.

```javascript
class ValidationError extends Error { 
constructor(message, field) { super(message); // passa a mensagem para Error 
this.name = "ValidationError"; // nome personalizado do erro 
this.field = field; // propriedade adicional específica do erro 
if (Error.captureStackTrace) { 
Error.captureStackTrace(this, ValidationError); // melhorias na rastreabilidade do erro 
  } 
 } 
} 
// Uso do erro personalizado 
try { 
throw new ValidationError("Campo obrigatório não enviado", "email");  } catch (err) { 
console.error(`${err.name}: ${err.message} (Campo: ${err.field})`); 
}
```