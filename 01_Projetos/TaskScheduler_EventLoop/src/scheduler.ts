/**
 * Task Scheduler - Event Loop Mastery
 * 
 * Este projeto demonstra como o Node.js gerencia diferentes tipos de tarefas assíncronas
 * através das fases do Event Loop.
 */

type Priority = 'HIGH' | 'MEDIUM' | 'LOW'

interface Task {
  name: string
  priority: Priority
  delay?: number
}

class TaskScheduler {
  private tasks: Task[] = []

  add(task: Task) {
    this.tasks.push(task)
    console.log(`📌 Task added: [${task.priority}] ${task.name}`)
  }

  run() {
    console.log('\n🚀 Starting Task Scheduler...\n')

    // Execução Síncrona
    console.log('1. Execution: Síncrona (Main Stack)')

    // 1. HIGH Priority (process.nextTick - Microtask Queue)
    const highTasks = this.tasks.filter(t => t.priority === 'HIGH')
    highTasks.forEach(task => {
      process.nextTick(() => {
        console.log(`🔥 [HIGH] Executing: ${task.name} (Microtask Phase)`)
      })
    })

    // 2. MEDIUM Priority (setTimeout - Timers Phase)
    const mediumTasks = this.tasks.filter(t => t.priority === 'MEDIUM')
    mediumTasks.forEach(task => {
      setTimeout(() => {
        console.log(`⏰ [MEDIUM] Executing: ${task.name} (Timers Phase)`)
      }, task.delay || 0)
    })

    // 3. LOW Priority (setImmediate - Check Phase)
    const lowTasks = this.tasks.filter(t => t.priority === 'LOW')
    lowTasks.forEach(task => {
      setImmediate(() => {
        console.log(`💤 [LOW] Executing: ${task.name} (Check Phase)`)
      })
    })

    console.log('4. Execution Log: Síncrono finalizado. Aguardando assincronismo...\n')
  }
}

// Demonstração
const scheduler = new TaskScheduler()

scheduler.add({ name: 'Validar dados do usuário', priority: 'HIGH' })
scheduler.add({ name: 'Enviar log para analytics', priority: 'LOW' })
scheduler.add({ name: 'Limpar cache temporário', priority: 'MEDIUM', delay: 0 })
scheduler.add({ name: 'Atualizar banco de dados', priority: 'HIGH' })

scheduler.run()
