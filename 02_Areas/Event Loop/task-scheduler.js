#!/usr/bin/env node
// Task Scheduler - Projeto prático de Event Loop
// Execute com: node task-scheduler.js

const tasks = [];
let taskId = 0;

// Adicionar tarefa
function addTask(name, priority = 'normal', delay = 0) {
  const id = ++taskId;
  const task = { id, name, priority, delay, status: 'pending' };
  
  tasks.push(task);
  console.log(`✅ Tarefa #${id} adicionada: "${name}" (${priority})`);
  
  scheduleTask(task);
  return id;
}

// Agendar tarefa baseado na prioridade
function scheduleTask(task) {
  const execute = () => {
    task.status = 'running';
    console.log(`🚀 Executando #${task.id}: "${task.name}"`);
    
    // Simular trabalho
    setTimeout(() => {
      task.status = 'completed';
      console.log(`✔️  Concluída #${task.id}: "${task.name}"`);
    }, 100);
  };
  
  switch (task.priority) {
    case 'immediate':
      // Máxima prioridade - process.nextTick
      process.nextTick(execute);
      break;
    
    case 'high':
      // Alta prioridade - Promise (Microtask)
      Promise.resolve().then(execute);
      break;
    
    case 'normal':
      // Prioridade normal - setImmediate
      setImmediate(execute);
      break;
    
    case 'low':
      // Baixa prioridade - setTimeout
      setTimeout(execute, task.delay);
      break;
    
    default:
      setTimeout(execute, task.delay);
  }
}

// Listar tarefas
function listTasks() {
  console.log('\n📋 Lista de Tarefas:\n');
  tasks.forEach(t => {
    const icon = t.status === 'completed' ? '✔️' : 
                 t.status === 'running' ? '⏳' : '⏸️';
    console.log(`  ${icon} #${t.id} [${t.priority}] ${t.name} - ${t.status}`);
  });
  console.log('');
}

// === DEMONSTRAÇÃO ===
console.log('🎯 Task Scheduler - Event Loop Demo\n');

// Adicionar tarefas com diferentes prioridades
addTask('Backup Database', 'low', 1000);
addTask('Send Email', 'normal');
addTask('Update Cache', 'high');
addTask('Critical Security Patch', 'immediate');
addTask('Generate Report', 'normal');
addTask('Cleanup Temp Files', 'low', 500);

// Listar após 2 segundos
setTimeout(() => {
  listTasks();
  
  console.log('💡 Observe a ordem de execução baseada nas prioridades!');
  console.log('   immediate > high > normal > low\n');
}, 2000);
