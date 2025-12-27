import { PrismaTaskRepository } from '../../database/prisma-task-repository.js'
import { CreateTaskUseCase } from '../../../application/use-cases/create-task.js'

export function makeCreateTaskUseCase() {
  const taskRepository = new PrismaTaskRepository()
  const useCase = new CreateTaskUseCase(taskRepository)

  return useCase
}
