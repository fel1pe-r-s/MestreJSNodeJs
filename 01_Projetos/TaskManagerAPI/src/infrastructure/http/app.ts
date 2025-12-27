import fastify from 'fastify'
import fastifyJwt from '@fastify/jwt'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import { env } from '../env/index.js'
import { appRoutes } from './routes.js'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(fastifySwagger, {
  swagger: {
    info: {
      title: 'Task Manager API',
      description: 'API for managing tasks using Clean Architecture',
      version: '1.0.0',
    },
  },
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

app.register(appRoutes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof Error) {
    return reply.status(400).send({ message: error.message })
  }

  console.error(error)

  return reply.status(500).send({ message: 'Internal server error' })
})
