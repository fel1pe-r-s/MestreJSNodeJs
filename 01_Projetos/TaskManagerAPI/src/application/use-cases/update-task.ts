import { Task } from '../../domain/entities/task.js'
import type { TaskRepository } from '../../domain/repositories/task-repository.js'
import { ResourceNotFoundError } from '../../domain/errors/resource-not-found-error.js'
import { type Either, left, right } from '../../shared/either.js'

interface UpdateTaskUseCaseRequest {
  taskId: string
  userId: string
  title?: string
  description?: string
  isCompleted?: boolean
}

type UpdateTaskUseCaseResponse = Either<ResourceNotFoundError | Error, { task: Task }>

export class UpdateTaskUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute({
    taskId,
    userId,
    title,
    description,
    isCompleted,
  }: UpdateTaskUseCaseRequest): Promise<UpdateTaskUseCaseResponse> {
    const task = await this.taskRepository.findById(taskId)

    if (!task) {
      return left(new ResourceNotFoundError())
    }

    if (userId !== task.userId) {
      return left(new Error('Not allowed'))
    }

    if (title !== undefined) {
      task.title = title
    }

    if (description !== undefined) {
      task.description = description
    }

    if (isCompleted !== undefined) {
      if (isCompleted) {
        task.complete()
      } else {
        task.uncomplete()
      }
    }

    await this.taskRepository.save(task)

    return right({ task })
  }
}
