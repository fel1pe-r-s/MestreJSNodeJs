#!/usr/bin/env node
// Process Demo - Gerenciamento de processos
// Execute com: node process-demo.js arg1 arg2

console.log('⚙️  Process Demo - Node.js Core\n');

// === 1. Informações do Processo ===
console.log('📊 1. Informações do Processo\n');

console.log('   PID:', process.pid);
console.log('   Platform:', process.platform);
console.log('   Node Version:', process.version);
console.log('   Uptime:', process.uptime(), 'segundos');
console.log('   Current Directory:', process.cwd());
console.log('   Executable Path:', process.execPath, '\n');

// === 2. Argumentos da Linha de Comando ===
console.log('🔧 2. Argumentos (process.argv)\n');

console.log('   process.argv:', process.argv);
console.log('   Argumentos do usuário:', process.argv.slice(2));

if (process.argv.length > 2) {
  console.log('   ✅ Você passou:', process.argv.slice(2).join(', '));
} else {
  console.log('   💡 Tente: node process-demo.js arg1 arg2');
}
console.log('');

// === 3. Variáveis de Ambiente ===
console.log('🌍 3. Variáveis de Ambiente (process.env)\n');

console.log('   NODE_ENV:', process.env.NODE_ENV || 'não definido');
console.log('   PATH:', process.env.PATH?.substring(0, 100) + '...');
console.log('   HOME:', process.env.HOME);

// Definir variável customizada
process.env.CUSTOM_VAR = 'Meu valor';
console.log('   CUSTOM_VAR:', process.env.CUSTOM_VAR, '\n');

// === 4. Memória ===
console.log('💾 4. Uso de Memória\n');

const memUsage = process.memoryUsage();
console.log('   RSS:', (memUsage.rss / 1024 / 1024).toFixed(2), 'MB');
console.log('   Heap Total:', (memUsage.heapTotal / 1024 / 1024).toFixed(2), 'MB');
console.log('   Heap Used:', (memUsage.heapUsed / 1024 / 1024).toFixed(2), 'MB');
console.log('   External:', (memUsage.external / 1024 / 1024).toFixed(2), 'MB\n');

// === 5. Eventos do Processo ===
console.log('📡 5. Eventos do Processo\n');

process.on('beforeExit', (code) => {
  console.log('   📢 beforeExit - Código:', code);
});

process.on('exit', (code) => {
  console.log('   📢 exit - Código:', code);
});

// Capturar erros não tratados
process.on('uncaughtException', (err) => {
  console.error('   ❌ Erro não capturado:', err.message);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('   ❌ Promise rejeitada:', reason);
});

console.log('   ✅ Event listeners configurados\n');

// === 6. Sinais (SIGINT, SIGTERM) ===
console.log('🚦 6. Sinais do Sistema\n');

process.on('SIGINT', () => {
  console.log('\n   📢 SIGINT recebido (Ctrl+C)');
  console.log('   🧹 Limpando recursos...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n   📢 SIGTERM recebido');
  process.exit(0);
});

console.log('   💡 Pressione Ctrl+C para testar SIGINT\n');

// === 7. nextTick e setImmediate ===
console.log('⏱️  7. nextTick vs setImmediate\n');

console.log('   A. Código síncrono');

process.nextTick(() => {
  console.log('   B. process.nextTick (Microtask)');
});

setImmediate(() => {
  console.log('   D. setImmediate (Task Queue)');
});

Promise.resolve().then(() => {
  console.log('   C. Promise (Microtask)');
});

console.log('   Ordem esperada: A -> B -> C -> D\n');

// === 8. Exit Codes ===
setTimeout(() => {
  console.log('💡 8. Exit Codes\n');
  console.log('   0 = Sucesso');
  console.log('   1 = Erro genérico');
  console.log('   2 = Uso incorreto');
  console.log('\n   Saindo com código 0 (sucesso)...');
  
  // process.exit(0); // Descomente para testar
}, 100);
