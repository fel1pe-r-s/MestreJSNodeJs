import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const args = process.argv.slice(2)
const command = args[0]
const fileName = args[1]
const content = args.slice(2).join(' ')

function showHelp() {
  console.log(`
  🛠️  NodeCore CLI Helper
  
  Usage:
    npm run cli <command> <filename> [content]
    
  Commands:
    create  - Create a new file with content
    delete  - Remove a file
    list    - List files in current directory
  `)
}

async function runCLI() {
  if (!command) {
    showHelp()
    return
  }

  const filePath = join(process.cwd(), fileName || '')

  switch (command) {
    case 'create':
      if (!fileName) {
        console.error('❌ Error: Filename is required for create.')
        return
      }
      writeFileSync(filePath, content || 'Default content')
      console.log(`✅ File "${fileName}" created successfully!`)
      break

    case 'list':
      const { readdirSync } = await import('node:fs')
      const files = readdirSync(process.cwd())
      console.log('📂 Files in directory:')
      files.forEach(file => console.log(` - ${file}`))
      break

    default:
      console.log(`❓ Unknown command: ${command}`)
      showHelp()
  }
}

runCLI()
