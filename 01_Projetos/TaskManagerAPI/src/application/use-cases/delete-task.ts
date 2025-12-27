import type { TaskRepository } from '../../domain/repositories/task-repository.js'
import { ResourceNotFoundError } from '../../domain/errors/resource-not-found-error.js'
import { NotAllowedError } from '../../domain/errors/not-allowed-error.js'
import { type Either, left, right } from '../../shared/either.js'

interface DeleteTaskUseCaseRequest {
  taskId: string
  userId: string
}

type DeleteTaskUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, null>

export class DeleteTaskUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute({
    taskId,
    userId,
  }: DeleteTaskUseCaseRequest): Promise<DeleteTaskUseCaseResponse> {
    const task = await this.taskRepository.findById(taskId)

    if (!task) {
      return left(new ResourceNotFoundError())
    }

    if (userId !== task.userId) {
      return left(new NotAllowedError())
    }

    await this.taskRepository.delete(taskId)

    return right(null)
  }
}
