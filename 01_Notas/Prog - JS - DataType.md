#Programação

 tipo de [[Variáveis ​​JavaScript]] 

### Primitive Types

#String String é um tipo primitivo que contém uma sequência de caracteres. A string em JavaScript está escrita em um par de marcas de aspas únicas <' '> , aspas duplas < " " > ou backticks < ` `` `> (ltemplate literals).


#Number O tipo de dados `Number` no JavaScript representa números de ponto flutuante, como 37 ou -9,25. O construtor `Number` número fornece constantes e métodos para trabalhar com números, e os valores de outros tipos podem ser convertidos em números usando a função `Number()`

```js
let num1 = 255; // integer
let num2 = 255.0; // floating-point number with no fractional part
let num3 = 0xff; // hexadecimal notation
let num4 = 0b11111111; // binary notation
let num5 = 0.255e3; // exponential notation
```

#Boolean No JavaScript, um `boolean` é um tipo de dados simples que pode conter um dos dois valores: `true` ou `false`. Esses valores são usados ​​para representar estados lógicos e são essenciais no controle do fluxo de um programa.

#Undefined Indefinado é um tipo de dados primitivo no JavaScript. Sempre que uma variável é declarada, mas não é inicializada ou atribuída um valor, ela é armazenada como indefinida. Uma função retorna indefinida se um valor não foi retornado. Um método ou declaração também retorna indefinidos se a variável que está sendo avaliada não tiver um valor atribuído.

#Bigint O BIGINT é um objeto JavaScript embutido que permite que você trabalhe com números inteiros de tamanho arbitrário. Ao contrário do tipo de número, que pode representar com precisão os números inteiros apenas dentro da faixa de ± 2^53, o BIGINT pode lidar com números inteiros muito além desse limite. Isso o torna particularmente útil para aplicações que exigem alta precisão com números muito grandes, como criptografia ou cálculos científicos.

#Null O valor `null` em JavaScript significa a ausência deliberada de qualquer valor de objeto. É considerado um dos valores primitivos do JavaScript e um valor `falsy`.
_A ausência deliberada_ enfatiza o uso intencional de `null` para indicar que uma variável não aponta para nenhum objeto. Essa declaração explícita transmite a natureza proposital de null, mostrando que a variável deve estar vazia ou inexistente no tempo de execução.
Em essência, `null` é uma maneira de redefinir uma variável, sinalizando que ela não deve fazer referência a nenhum objeto.

Os #Symbol são um tipo de dados primitivo único e imutável no JavaScript, introduzido no ECMAScript 6 (ES6). Eles são frequentemente usados ​​para criar teclas de propriedade exclusivas para objetos, garantindo que não ocorram colisões de chaves de propriedade. Cada valor de símbolo é distinto, mesmo quando vários são criados com a mesma descrição. Os símbolos podem ser criados usando a função Symbol (), e seu principal caso de uso é adicionar propriedades ocultas ou especiais a objetos que não interferem em outras propriedades ou métodos.

Você pode usar o operador  `typeof` para encontrar o tipo de dados de uma variável JavaScript. Ele retorna uma string indicando o tipo de valor do operando fornecido.

#Object O objeto JavaScript é uma estrutura de dados que nos permite ter pares de valor-chave; Portanto, podemos ter teclas distintas e cada tecla é mapeada para um valor que pode ser de qualquer tipo de dados JavaScript. Comparando-o com um objeto do mundo real, uma caneta é um objeto com várias propriedades, como cor, design, material de que é feito etc. Da mesma maneira, os objetos JavaScript podem ter propriedades que definem suas características.