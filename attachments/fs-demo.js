#!/usr/bin/env node
// File System Demo - Operações com arquivos
// Execute com: node fs-demo.js

const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');

console.log('📁 File System Demo - Node.js Core\n');

const testDir = path.join(__dirname, 'fs-test');
const testFile = path.join(testDir, 'test.txt');

// === 1. Síncrono vs Assíncrono ===
async function demonstrateSync() {
  console.log('⏱️  1. Síncrono vs Assíncrono\n');
  
  // Criar diretório
  if (!fs.existsSync(testDir)) {
    fs.mkdirSync(testDir);
    console.log('   ✅ Diretório criado (sync)');
  }
  
  // Escrever arquivo (síncrono - BLOQUEIA)
  console.time('   Escrita síncrona');
  fs.writeFileSync(testFile, 'Conteúdo síncrono\n');
  console.timeEnd('   Escrita síncrona');
  
  // Ler arquivo (síncrono - BLOQUEIA)
  console.time('   Leitura síncrona');
  const content = fs.readFileSync(testFile, 'utf8');
  console.timeEnd('   Leitura síncrona');
  console.log('   Conteúdo:', content.trim());
  
  // Escrever arquivo (assíncrono com Promises - NÃO BLOQUEIA)
  console.time('   Escrita assíncrona');
  await fsPromises.writeFile(testFile, 'Conteúdo assíncrono\n');
  console.timeEnd('   Escrita assíncrona');
  
  // Ler arquivo (assíncrono com Promises)
  console.time('   Leitura assíncrona');
  const asyncContent = await fsPromises.readFile(testFile, 'utf8');
  console.timeEnd('   Leitura assíncrona');
  console.log('   Conteúdo:', asyncContent.trim(), '\n');
}

// === 2. Operações com Diretórios ===
async function demonstrateDirectories() {
  console.log('📂 2. Operações com Diretórios\n');
  
  const subDir = path.join(testDir, 'subdir');
  await fsPromises.mkdir(subDir, { recursive: true });
  console.log('   ✅ Subdiretório criado');
  
  // Listar conteúdo
  const files = await fsPromises.readdir(testDir);
  console.log('   Arquivos em fs-test:', files);
  
  // Informações do arquivo
  const stats = await fsPromises.stat(testFile);
  console.log('   Tamanho:', stats.size, 'bytes');
  console.log('   É arquivo?', stats.isFile());
  console.log('   É diretório?', stats.isDirectory());
  console.log('   Modificado em:', stats.mtime.toLocaleString(), '\n');
}

// === 3. Append e Streams ===
async function demonstrateAppend() {
  console.log('➕ 3. Append e Streams\n');
  
  // Append (adicionar ao final)
  await fsPromises.appendFile(testFile, 'Linha adicional 1\n');
  await fsPromises.appendFile(testFile, 'Linha adicional 2\n');
  console.log('   ✅ Linhas adicionadas');
  
  // Ler com stream (eficiente para arquivos grandes)
  const readStream = fs.createReadStream(testFile, { encoding: 'utf8' });
  console.log('   Conteúdo completo:');
  
  readStream.on('data', (chunk) => {
    process.stdout.write('   ' + chunk.split('\n').join('\n   '));
  });
  
  await new Promise(resolve => readStream.on('end', resolve));
  console.log('');
}

// === 4. Watch (Monitorar mudanças) ===
async function demonstrateWatch() {
  console.log('👁️  4. Watch (Monitorar mudanças)\n');
  
  console.log('   Monitorando mudanças em:', testFile);
  
  const watcher = fs.watch(testFile, (eventType, filename) => {
    console.log(`   📢 Evento: ${eventType} em ${filename}`);
  });
  
  // Fazer mudanças
  setTimeout(async () => {
    await fsPromises.appendFile(testFile, 'Mudança detectada!\n');
  }, 500);
  
  // Parar de monitorar após 1 segundo
  setTimeout(() => {
    watcher.close();
    console.log('   ✅ Monitoramento encerrado\n');
    cleanup();
  }, 1500);
}

// === 5. Cleanup ===
async function cleanup() {
  console.log('🧹 5. Limpeza\n');
  
  // Remover recursivamente
  await fsPromises.rm(testDir, { recursive: true, force: true });
  console.log('   ✅ Diretório de teste removido');
  console.log('\n💡 Dica: Use sempre fs/promises para código assíncrono moderno!');
}

// Executar demos
(async () => {
  try {
    await demonstrateSync();
    await demonstrateDirectories();
    await demonstrateAppend();
    await demonstrateWatch();
  } catch (err) {
    console.error('❌ Erro:', err);
  }
})();
