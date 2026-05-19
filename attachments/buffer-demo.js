#!/usr/bin/env node
// Buffer Demo - Manipulação de dados binários
// Execute com: node buffer-demo.js

console.log('🔢 Buffer Demo - Node.js Core\n');

// === 1. Criando Buffers ===
console.log('📝 1. Criando Buffers\n');

const buf1 = Buffer.from('Hello Buffer!');
console.log('   Buffer.from(string):', buf1);
console.log('   toString():', buf1.toString());
console.log('   length:', buf1.length, 'bytes\n');

const buf2 = Buffer.alloc(10); // Buffer vazio de 10 bytes
console.log('   Buffer.alloc(10):', buf2);

const buf3 = Buffer.allocUnsafe(10); // Mais rápido, mas não inicializado
console.log('   Buffer.allocUnsafe(10):', buf3, '(pode conter lixo)\n');

// === 2. Manipulando Buffers ===
console.log('✏️  2. Manipulando Buffers\n');

const buf = Buffer.from('Node.js');
console.log('   Original:', buf.toString());

// Escrever em posições específicas
buf.write('Bun', 0); // Sobrescreve os primeiros 3 bytes
console.log('   Após write("Bun", 0):', buf.toString());

// Ler bytes individuais
console.log('   Byte na posição 0:', buf[0], '(ASCII:', String.fromCharCode(buf[0]) + ')');

// === 3. Concatenando Buffers ===
console.log('\n🔗 3. Concatenando Buffers\n');

const buf4 = Buffer.from('Hello ');
const buf5 = Buffer.from('World!');
const concatenated = Buffer.concat([buf4, buf5]);
console.log('   Resultado:', concatenated.toString());

// === 4. Comparando Buffers ===
console.log('\n⚖️  4. Comparando Buffers\n');

const bufA = Buffer.from('ABC');
const bufB = Buffer.from('ABC');
const bufC = Buffer.from('ABD');

console.log('   bufA === bufB:', bufA === bufB, '(referência diferente)');
console.log('   bufA.equals(bufB):', bufA.equals(bufB), '(conteúdo igual)');
console.log('   bufA.compare(bufC):', bufA.compare(bufC), '(-1 = menor, 0 = igual, 1 = maior)');

// === 5. Conversões ===
console.log('\n🔄 5. Conversões\n');

const text = 'Node.js 🚀';
const bufUTF8 = Buffer.from(text, 'utf8');
const bufBase64 = bufUTF8.toString('base64');
const bufHex = bufUTF8.toString('hex');

console.log('   Original:', text);
console.log('   Base64:', bufBase64);
console.log('   Hex:', bufHex);
console.log('   De volta:', Buffer.from(bufBase64, 'base64').toString('utf8'));

// === 6. Uso Prático: Lendo arquivo binário ===
console.log('\n📁 6. Uso Prático: Arquivo Binário\n');

const fs = require('fs');
const path = require('path');

// Criar arquivo binário de exemplo
const binaryData = Buffer.from([0x48, 0x65, 0x6C, 0x6C, 0x6F]); // "Hello" em hex
const filepath = path.join(__dirname, 'binary-test.bin');
fs.writeFileSync(filepath, binaryData);

// Ler arquivo
const readBuffer = fs.readFileSync(filepath);
console.log('   Bytes lidos:', readBuffer);
console.log('   Como texto:', readBuffer.toString());
console.log('   Como hex:', readBuffer.toString('hex'));

// Cleanup
fs.unlinkSync(filepath);
console.log('\n🧹 Arquivo temporário removido');

// === 7. Performance ===
console.log('\n⚡ 7. Performance: Buffer vs String\n');

const iterations = 1000000;

console.time('   String concatenation');
let str = '';
for (let i = 0; i < iterations; i++) {
  str += 'a';
}
console.timeEnd('   String concatenation');

console.time('   Buffer allocation');
const buffers = [];
for (let i = 0; i < iterations; i++) {
  buffers.push(Buffer.from('a'));
}
Buffer.concat(buffers);
console.timeEnd('   Buffer allocation');

console.log('\n💡 Buffers são mais eficientes para dados binários!');
