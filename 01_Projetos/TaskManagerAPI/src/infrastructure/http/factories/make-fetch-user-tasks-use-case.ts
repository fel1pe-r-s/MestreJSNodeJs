import { PrismaTaskRepository } from '../../database/prisma-task-repository.js'
import { FetchUserTasksUseCase } from '../../../application/use-cases/fetch-user-tasks.js'

export function makeFetchUserTasksUseCase() {
  const taskRepository = new PrismaTaskRepository()
  const useCase = new FetchUserTasksUseCase(taskRepository)

  return useCase
}
