import type { Task } from '../../domain/entities/task.js'
import type { TaskRepository } from '../../domain/repositories/task-repository.js'
import { type Either, right } from '../../shared/either.js'

interface FetchUserTasksUseCaseRequest {
  userId: string
}

type FetchUserTasksUseCaseResponse = Either<null, { tasks: Task[] }>

export class FetchUserTasksUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute({
    userId,
  }: FetchUserTasksUseCaseRequest): Promise<FetchUserTasksUseCaseResponse> {
    const tasks = await this.taskRepository.findManyByUserId(userId)

    return right({ tasks })
  }
}
