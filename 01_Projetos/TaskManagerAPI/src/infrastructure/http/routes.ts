import type { FastifyInstance } from 'fastify'
import { register } from './controllers/register.js'
import { authenticate } from './controllers/authenticate.js'
import { create } from './controllers/create-task.js'
import { fetch } from './controllers/fetch-user-tasks.js'
import { update } from './controllers/update-task.js'
import { remove } from './controllers/delete-task.js'
import { verifyJWT } from './middlewares/verify-jwt.js'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  /** Authenticated Routes */
  app.post('/tasks', { onRequest: [verifyJWT] }, create)
  app.get('/tasks', { onRequest: [verifyJWT] }, fetch)
  app.put('/tasks/:taskId', { onRequest: [verifyJWT] }, update)
  app.delete('/tasks/:taskId', { onRequest: [verifyJWT] }, remove)
}
