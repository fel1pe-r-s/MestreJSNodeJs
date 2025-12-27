import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeUpdateTaskUseCase } from '../factories/make-update-task-use-case.js'
import { ResourceNotFoundError } from '../../../domain/errors/resource-not-found-error.js'
import { NotAllowedError } from '../../../domain/errors/not-allowed-error.js'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const updateTaskParamsSchema = z.object({
    taskId: z.string().uuid(),
  })

  const updateTaskBodySchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    isCompleted: z.boolean().optional(),
  })

  const { taskId } = updateTaskParamsSchema.parse(request.params)
  const { title, description, isCompleted } = updateTaskBodySchema.parse(
    request.body
  )

  const updateTaskUseCase = makeUpdateTaskUseCase()

  const result = await updateTaskUseCase.execute({
    taskId,
    userId: request.user.sub,
    title,
    description,
    isCompleted,
  })

  if (result.isLeft()) {
    const error = result.value

    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }

    if (error instanceof NotAllowedError) {
      return reply.status(401).send({ message: error.message })
    }

    throw error
  }

  return reply.status(204).send()
}
