// Event Loop Visualizer - Demonstra ordem de execução
// Execute com: node event-loop-visualizer.js

console.log('🚀 Event Loop Visualizer\n');

// Timestamp helper
const log = (msg, color = '37') => {
  const timestamp = Date.now();
  console.log(`\x1b[${color}m[${timestamp}] ${msg}\x1b[0m`);
};

// === EXEMPLO 1: Call Stack vs Task Queue ===
console.log('\n📌 EXEMPLO 1: Call Stack vs Task Queue\n');

log('1. Início (Call Stack)', '36'); // Cyan

setTimeout(() => {
  log('4. setTimeout 0ms (Task Queue)', '33'); // Yellow
}, 0);

Promise.resolve().then(() => {
  log('3. Promise (Microtask Queue)', '35'); // Magenta
});

log('2. Fim (Call Stack)', '36'); // Cyan

// === EXEMPLO 2: setTimeout vs setImmediate ===
setTimeout(() => {
  console.log('\n📌 EXEMPLO 2: setTimeout vs setImmediate\n');
  
  setTimeout(() => {
    log('setTimeout 0ms', '33');
  }, 0);
  
  setImmediate(() => {
    log('setImmediate', '32'); // Green
  });
  
  process.nextTick(() => {
    log('process.nextTick', '31'); // Red
  });
  
  log('Código síncrono', '36');
}, 100);

// === EXEMPLO 3: Ordem Complexa ===
setTimeout(() => {
  console.log('\n📌 EXEMPLO 3: Ordem Complexa (Desafio)\n');
  
  log('A. Início', '36');
  
  setTimeout(() => log('F. setTimeout 0', '33'), 0);
  
  Promise.resolve()
    .then(() => log('C. Promise 1', '35'))
    .then(() => log('E. Promise 2', '35'));
  
  process.nextTick(() => log('B. nextTick 1', '31'));
  process.nextTick(() => log('D. nextTick 2', '31'));
  
  setImmediate(() => log('G. setImmediate', '32'));
  
  log('Fim do código síncrono', '36');
  
  // Ordem esperada: A -> B -> D -> C -> E -> F -> G
}, 200);

// === EXEMPLO 4: I/O Operations ===
setTimeout(() => {
  console.log('\n📌 EXEMPLO 4: I/O Operations\n');
  
  const fs = require('fs');
  
  fs.readFile(__filename, () => {
    log('fs.readFile callback', '34'); // Blue
    
    setTimeout(() => log('setTimeout dentro de I/O', '33'), 0);
    setImmediate(() => log('setImmediate dentro de I/O', '32'));
    
    process.nextTick(() => log('nextTick dentro de I/O', '31'));
  });
  
  setTimeout(() => log('setTimeout fora de I/O', '33'), 0);
  setImmediate(() => log('setImmediate fora de I/O', '32'));
}, 300);

// Aguardar conclusão
setTimeout(() => {
  console.log('\n✅ Visualização concluída!\n');
  console.log('💡 Dica: Execute novamente e observe os timestamps');
}, 500);
