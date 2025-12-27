import type { FastifyReply, FastifyRequest } from 'fastify'
import { makeFetchUserTasksUseCase } from '../factories/make-fetch-user-tasks-use-case.js'
import { TaskPresenter } from '../presenters/task-presenter.js'

export async function fetch(request: FastifyRequest, reply: FastifyReply) {
  const fetchUserTasksUseCase = makeFetchUserTasksUseCase()

  const result = await fetchUserTasksUseCase.execute({
    userId: request.user.sub,
  })

  const tasks = result.value.tasks.map(TaskPresenter.toHTTP)

  return reply.status(200).send({ tasks })
}
