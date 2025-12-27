import { PrismaTaskRepository } from '../../database/prisma-task-repository.js'
import { UpdateTaskUseCase } from '../../../application/use-cases/update-task.js'

export function makeUpdateTaskUseCase() {
  const taskRepository = new PrismaTaskRepository()
  const useCase = new UpdateTaskUseCase(taskRepository)

  return useCase
}
