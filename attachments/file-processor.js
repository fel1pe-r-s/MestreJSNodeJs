#!/usr/bin/env node
// File Processor CLI - Projeto final Node.js Core
// Execute com: node file-processor.js <input> <output> [options]

const fs = require('fs');
const { Transform, pipeline } = require('stream');
const path = require('path');

// Parse argumentos
const args = process.argv.slice(2);
const inputFile = args[0];
const outputFile = args[1];
const options = {
  uppercase: args.includes('--uppercase'),
  lowercase: args.includes('--lowercase'),
  reverse: args.includes('--reverse'),
  lineNumbers: args.includes('--line-numbers'),
  stats: args.includes('--stats')
};

// Validação
if (!inputFile || !outputFile) {
  console.error('❌ Uso: node file-processor.js <input> <output> [options]');
  console.log('\nOpções:');
  console.log('  --uppercase      Converter para maiúsculas');
  console.log('  --lowercase      Converter para minúsculas');
  console.log('  --reverse        Inverter linhas');
  console.log('  --line-numbers   Adicionar números de linha');
  console.log('  --stats          Mostrar estatísticas');
  process.exit(1);
}

// Verificar se arquivo existe
if (!fs.existsSync(inputFile)) {
  console.error(`❌ Arquivo não encontrado: ${inputFile}`);
  process.exit(1);
}

console.log('📄 File Processor CLI\n');
console.log(`   Input:  ${inputFile}`);
console.log(`   Output: ${outputFile}`);
console.log(`   Options: ${JSON.stringify(options, null, 2)}\n`);

// Estatísticas
let stats = {
  lines: 0,
  chars: 0,
  words: 0,
  bytes: 0
};

// Transform Stream
const processTransform = new Transform({
  transform(chunk, encoding, callback) {
    let text = chunk.toString();
    stats.bytes += chunk.length;
    stats.chars += text.length;
    stats.lines += (text.match(/\n/g) || []).length;
    stats.words += (text.match(/\S+/g) || []).length;
    
    // Aplicar transformações
    if (options.uppercase) {
      text = text.toUpperCase();
    }
    
    if (options.lowercase) {
      text = text.toLowerCase();
    }
    
    if (options.reverse) {
      text = text.split('\n').reverse().join('\n');
    }
    
    if (options.lineNumbers) {
      const lines = text.split('\n');
      text = lines.map((line, i) => `${i + 1}. ${line}`).join('\n');
    }
    
    callback(null, text);
  }
});

// Pipeline
const readStream = fs.createReadStream(inputFile);
const writeStream = fs.createWriteStream(outputFile);

console.log('⏳ Processando...\n');

pipeline(
  readStream,
  processTransform,
  writeStream,
  (err) => {
    if (err) {
      console.error('❌ Erro:', err.message);
      process.exit(1);
    }
    
    console.log('✅ Processamento concluído!\n');
    
    if (options.stats) {
      console.log('📊 Estatísticas:');
      console.log(`   Linhas:     ${stats.lines}`);
      console.log(`   Palavras:   ${stats.words}`);
      console.log(`   Caracteres: ${stats.chars}`);
      console.log(`   Bytes:      ${stats.bytes}`);
    }
    
    console.log(`\n📁 Resultado salvo em: ${outputFile}`);
  }
);

// Capturar Ctrl+C
process.on('SIGINT', () => {
  console.log('\n\n⚠️  Processamento interrompido pelo usuário');
  process.exit(0);
});
