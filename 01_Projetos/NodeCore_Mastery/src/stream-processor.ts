import { createReadStream, createWriteStream } from 'node:fs'
import { Transform } from 'node:stream'
import { pipeline } from 'node:stream/promises'
import { join } from 'node:path'

// A simple Transform stream that converts text to Uppercase
const uppercaseTransform = new Transform({
  transform(chunk, encoding, callback) {
    const transformedData = chunk.toString().toUpperCase()
    callback(null, transformedData)
  },
})

async function processFile() {
  const inputPath = join(process.cwd(), 'input.txt')
  const outputPath = join(process.cwd(), 'output.txt')

  console.log('🚀 Starting file processing with Streams...')

  try {
    await pipeline(
      createReadStream(inputPath),
      uppercaseTransform,
      createWriteStream(outputPath)
    )
    console.log('✅ File processed successfully!')
  } catch (err) {
    console.error('❌ Pipeline failed:', err)
  }
}

processFile()
