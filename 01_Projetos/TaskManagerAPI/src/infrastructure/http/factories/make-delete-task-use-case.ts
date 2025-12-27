import { PrismaTaskRepository } from '../../database/prisma-task-repository.js'
import { DeleteTaskUseCase } from '../../../application/use-cases/delete-task.js'

export function makeDeleteTaskUseCase() {
  const taskRepository = new PrismaTaskRepository()
  const useCase = new DeleteTaskUseCase(taskRepository)

  return useCase
}
