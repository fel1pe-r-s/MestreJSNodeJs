import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeDeleteTaskUseCase } from '../factories/make-delete-task-use-case.js'
import { ResourceNotFoundError } from '../../../domain/errors/resource-not-found-error.js'
import { NotAllowedError } from '../../../domain/errors/not-allowed-error.js'

export async function remove(request: FastifyRequest, reply: FastifyReply) {
  const deleteTaskParamsSchema = z.object({
    taskId: z.string().uuid(),
  })

  const { taskId } = deleteTaskParamsSchema.parse(request.params)

  const deleteTaskUseCase = makeDeleteTaskUseCase()

  const result = await deleteTaskUseCase.execute({
    taskId,
    userId: request.user.sub,
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
