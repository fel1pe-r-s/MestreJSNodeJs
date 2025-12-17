#Programação

Estruturas em
#Pilha Imagine uma pilha de pratos em uma mesa. Quando você adiciona um prato, você o coloca no topo. E quando você quer pegar um prato, você sempre pega o que está no topo. O último prato que você colocou é o primeiro que você retira. O princípio #LIFO que significa "Último a Entrar, Primeiro a Sair" (em inglês, Last-In, First-Out).
	As pilhas suportam algumas operações fundamentais:
	**`push(elemento)` (Empilhar):** Adiciona um novo elemento ao topo da pilha. É como colocar um novo prato no topo da pilha.
	**`pop()` (Desempilhar):** Remove o elemento do topo da pilha e o retorna. É como pegar o prato de cima da pilha. Se a pilha estiver vazia, essa operação geralmente retorna um erro ou um valor especial (como `null`).
	**`peek()` (Espiar):** Retorna o elemento que está no topo da pilha, mas sem removê-lo. É como olhar para o prato de cima sem tirá-lo da pilha.
``` js
	class Pilha {
  constructor() {
    this.itens = [];
  }

  push(elemento) {
    this.itens.push(elemento);
  }

  pop() {
    if (this.itens.length === 0) {
      return null; // Indica que a pilha está vazia
    }
    return this.itens.pop();
  }

  peek() {
    if (this.itens.length === 0) {
      return null; // Indica que a pilha está vazia
    }
    return this.itens[this.itens.length - 1];
  }

  estaVazia() {
    return this.itens.length === 0;
  }

  tamanho() {
    return this.itens.length;
  }
}

// Exemplo de uso da Pilha
const minhaPilha = new Pilha();
minhaPilha.push(10);
minhaPilha.push(20);
minhaPilha.push(30);

console.log("Topo da pilha (peek):", minhaPilha.peek()); // Saída: 30
console.log("Desempilhando:", minhaPilha.pop());       // Saída: 30
console.log("Topo da pilha após pop:", minhaPilha.peek()); // Saída: 20
console.log("Tamanho da pilha:", minhaPilha.tamanho());   // Saída: 2
console.log("A pilha está vazia?", minhaPilha.estaVazia()); // Saída: false
```

#Fila Pense agora em uma fila de pessoas esperando para entrar em um ônibus ou para comprar ingressos para um show. A primeira pessoa que chega na fila é a primeira a ser atendida e a sair da fila. O último a chegar é o último a sair. O princípio #FIFO que significa "Primeiro a Entrar, Primeiro a Sair" (em inglês, First-In, First-Out). O primeiro elemento que foi adicionado à fila é o primeiro a ser removido.
	Imagine que temos uma fila vazia chamada `minhaFila`.
	1. `enqueue(10)`: A fila agora é `[10]` (o 10 está no início e no final).
	2. `enqueue(20)`: A fila agora é `[10, 20]` (o 10 está no início, o 20 no final).
	3. `peek()`: Retorna `10` (olhamos o início, mas não removemos).
	4. `dequeue()`: Remove o `10` e retorna `10`. A fila agora é `[20, 30]` (o 20 está no início).
	5. `dequeue()`: Remove o `20` e retorna `20`. A fila agora é `[30]` (o 30 está no início).
	6. `dequeue()`: Remove o `30` e retorna `30`. A fila agora está vazia `[]`.
	
```js
class Fila {
  constructor() {
    this.itens = [];
  }

  enqueue(elemento) {
    this.itens.push(elemento);
  }

  dequeue() {
    if (this.itens.length === 0) {
      return null; // Indica que a fila está vazia
    }
    return this.itens.shift(); // O método shift() remove o primeiro elemento do array
  }

  peek() {
    if (this.itens.length === 0) {
      return null; // Indica que a fila está vazia
    }
    return this.itens[0];
  }

  estaVazia() {
    return this.itens.length === 0;
  }

  tamanho() {
    return this.itens.length;
  }
}

// Exemplo de uso da Fila
const minhaFila = new Fila();
minhaFila.enqueue(10);
minhaFila.enqueue(20);
minhaFila.enqueue(30);

console.log("Próximo da fila (peek):", minhaFila.peek()); // Saída: 10
console.log("Desenfileirando:", minhaFila.dequeue());   // Saída: 10
console.log("Próximo da fila após dequeue:", minhaFila.peek()); // Saída: 20
console.log("Tamanho da fila:", minhaFila.tamanho());   // Saída: 2
console.log("A fila está vazia?", minhaFila.estaVazia()); // Saída: false
```

#recursividade Em termos simples, recursão é quando uma **função chama a si mesma** dentro de sua própria definição. Parece um pouco com um espelho refletindo outro espelho infinitamente!
Uma função recursiva geralmente tem duas partes principais:

1. **Caso Base (Base Case):** É a condição que determina quando a recursão deve parar. Sem um caso base, a função chamaria a si mesma infinitamente, levando a um erro (estouro da pilha de chamadas - "stack overflow"). O caso base é como a âncora que impede o barco de se perder no mar.
2. **Caso Recursivo (Recursive Case):** É a parte da função onde ela se chama novamente, geralmente com uma entrada ligeiramente diferente ou menor, movendo em direção ao caso base. É o passo que nos aproxima da solução final.
``` js
function fatorialRecursivo(n) {
  if (n === 0 || n === 1) { // Caso base
    return 1;
  } else { // Caso recursivo
    return n * fatorialRecursivo(n - 1);
  }
}

console.log("Fatorial de 5:", fatorialRecursivo(5)); // Saída: 120
```
	
explicando função FatorialRecusivo
função `fatorialRecursivo(5)` passo a passo:

1. **`fatorialRecursivo(5)` é chamada.**    
    - `n` é 5.
    - A condição `n === 0 || n === 1` é falsa (5 não é 0 nem 1).
    - Então, a função retorna: `5 * fatorialRecursivo(4)`
    - **Neste ponto, a função `fatorialRecursivo(5)` pausa e espera o resultado de `fatorialRecursivo(4)` para poder multiplicar por 5.**
2. **`fatorialRecursivo(4)` é chamada.**    
    - `n` é 4.
    - A condição `n === 0 || n === 1` é falsa.
    - A função retorna: `4 * fatorialRecursivo(3)`
    - **`fatorialRecursivo(4)` pausa e espera o resultado de `fatorialRecursivo(3)`.**
3. **`fatorialRecursivo(3)` é chamada.**    
    - `n` é 3.
    - A condição `n === 0 || n === 1` é falsa.
    - A função retorna: `3 * fatorialRecursivo(2)`
    - **`fatorialRecursivo(3)` pausa e espera o resultado de `fatorialRecursivo(2)`.**
4. **`fatorialRecursivo(2)` é chamada.**    
    - `n` é 2.
    - A condição `n === 0 || n === 1` é falsa.
    - A função retorna: `2 * fatorialRecursivo(1)`
    - **`fatorialRecursivo(2)` pausa e espera o resultado de `fatorialRecursivo(1)`.**
5. **`fatorialRecursivo(1)` é chamada.**    
    - `n` é 1.
    - A condição `n === 0 || n === 1` é **verdadeira**!
    - A função retorna: `1`
    - **Este é o nosso caso base. A recursão para aqui para este ramo da chamada.**

**Agora, os resultados são "desempilhados" e as multiplicações acontecem de volta, na ordem inversa das chamadas:**

6. O resultado de `fatorialRecursivo(1)` (que é `1`) é retornado para a chamada de `fatorialRecursivo(2)`.
    
    - `fatorialRecursivo(2)` agora pode completar sua operação: `2 * 1 = 2`.
    - **`fatorialRecursivo(2)` retorna `2` para a chamada de `fatorialRecursivo(3)`.**
7. O resultado de `fatorialRecursivo(2)` (que é `2`) é retornado para a chamada de `fatorialRecursivo(3)`.
    
    - `fatorialRecursivo(3)` agora pode completar sua operação: `3 * 2 = 6`.
    - **`fatorialRecursivo(3)` retorna `6` para a chamada de `fatorialRecursivo(4)`.**
8. O resultado de `fatorialRecursivo(3)` (que é `6`) é retornado para a chamada de `fatorialRecursivo(4)`.
    
    - `fatorialRecursivo(4)` agora pode completar sua operação: `4 * 6 = 24`.
    - **`fatorialRecursivo(4)` retorna `24` para a chamada original de `fatorialRecursivo(5)`.**
9. Finalmente, o resultado de `fatorialRecursivo(4)` (que é `24`) é retornado para a chamada original de `fatorialRecursivo(5)`.
    
    - `fatorialRecursivo(5)` agora pode completar sua operação: `5 * 24 = 120`.
    - **`fatorialRecursivo(5)` retorna `120` como o resultado final.**

**Analogia com a Pilha de Pratos:**

Pense nas chamadas de função recursivas como pratos sendo empilhados. Cada chamada espera o resultado da chamada abaixo dela para poder fazer sua multiplicação. Quando chegamos ao caso base (o último prato empilhado que tem um valor conhecido), começamos a desempilhar os pratos, e em cada etapa realizamos a multiplicação pendente.
	