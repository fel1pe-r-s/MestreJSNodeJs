import { app } from './infrastructure/http/app.js'
import { env } from './infrastructure/env/index.js'

app
  .listen({
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then(() => {
    console.log(`🚀 HTTP Server Running on http://localhost:${env.PORT}`)
  })
