#!/usr/bin/env node
// Streams Demo - Processamento eficiente de dados
// Execute com: node streams-demo.js

const { Readable, Writable, Transform, pipeline } = require('stream');
const fs = require('fs');
const path = require('path');

console.log('🌊 Streams Demo - Node.js Core\n');

// === 1. Readable Stream ===
console.log('📖 1. Readable Stream (Gerando dados)');

let dataIndex = 0;
const data = ['Hello', 'from', 'Readable', 'Stream!'];

const readableStream = new Readable({
  read() {
    if (dataIndex < data.length) {
      this.push(data[dataIndex++] + ' ');
    } else {
      this.push(null); // Fim do stream
    }
  }
});

readableStream.on('data', (chunk) => {
  process.stdout.write(`   Chunk: ${chunk}`);
});

readableStream.on('end', () => {
  console.log('\n   ✅ Readable concluído\n');
  
  // === 2. Transform Stream ===
  demonstrateTransform();
});

// === 2. Transform Stream ===
function demonstrateTransform() {
  console.log('🔄 2. Transform Stream (Transformando dados)');
  
  const upperCaseTransform = new Transform({
    transform(chunk, encoding, callback) {
      const transformed = chunk.toString().toUpperCase();
      callback(null, transformed);
    }
  });
  
  const input = Readable.from(['hello', ' ', 'world', '!']);
  
  input
    .pipe(upperCaseTransform)
    .on('data', (chunk) => {
      process.stdout.write(`   Transformed: ${chunk}`);
    })
    .on('end', () => {
      console.log('\n   ✅ Transform concluído\n');
      demonstrateFileStream();
    });
}

// === 3. File Streams ===
function demonstrateFileStream() {
  console.log('📁 3. File Streams (Lendo/Escrevendo arquivos)');
  
  const inputFile = path.join(__dirname, 'input.txt');
  const outputFile = path.join(__dirname, 'output.txt');
  
  // Criar arquivo de entrada
  fs.writeFileSync(inputFile, 'Este é um teste de file streams.\nProcessando linha por linha.\n');
  
  const readStream = fs.createReadStream(inputFile, { encoding: 'utf8' });
  const writeStream = fs.createWriteStream(outputFile);
  
  const lineTransform = new Transform({
    transform(chunk, encoding, callback) {
      const lines = chunk.toString().split('\n');
      const processed = lines
        .map((line, i) => `[Linha ${i + 1}] ${line}`)
        .join('\n');
      callback(null, processed);
    }
  });
  
  pipeline(
    readStream,
    lineTransform,
    writeStream,
    (err) => {
      if (err) {
        console.error('   ❌ Erro:', err);
      } else {
        console.log('   ✅ Arquivo processado com sucesso!');
        console.log(`   📄 Resultado em: ${outputFile}\n`);
        
        // Mostrar resultado
        const result = fs.readFileSync(outputFile, 'utf8');
        console.log('   Conteúdo do arquivo de saída:');
        console.log('   ' + result.split('\n').join('\n   '));
        
        demonstrateBackpressure();
      }
    }
  );
}

// === 4. Backpressure ===
function demonstrateBackpressure() {
  console.log('\n⚡ 4. Backpressure (Controle de fluxo)');
  
  let counter = 0;
  const slowReadable = new Readable({
    read() {
      if (counter < 5) {
        setTimeout(() => {
          this.push(`Chunk ${++counter}\n`);
          console.log(`   📤 Enviado: Chunk ${counter}`);
        }, 100);
      } else {
        this.push(null);
      }
    }
  });
  
  const slowWritable = new Writable({
    write(chunk, encoding, callback) {
      console.log(`   📥 Recebido: ${chunk.toString().trim()}`);
      // Simular processamento lento
      setTimeout(callback, 200);
    }
  });
  
  slowReadable.pipe(slowWritable).on('finish', () => {
    console.log('   ✅ Backpressure demo concluído\n');
    console.log('💡 Observe: O writable controla a velocidade do readable!\n');
    
    // Cleanup
    cleanup();
  });
}

// Cleanup
function cleanup() {
  const files = ['input.txt', 'output.txt'];
  files.forEach(file => {
    const filepath = path.join(__dirname, file);
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }
  });
  console.log('🧹 Arquivos temporários removidos');
}
