import { Task } from '../../domain/entities/task'
import { TaskRepository } from '../../domain/repositories/task-repository'
import { Either, right } from '../../shared/either'

interface CreateTaskUseCaseRequest {
  title: string
  description?: string
  userId: string
}

type CreateTaskUseCaseResponse = Either<null, { task: Task }>

export class CreateTaskUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute({
    title,
    description,
    userId,
  }: CreateTaskUseCaseRequest): Promise<CreateTaskUseCaseResponse> {
    const task = new Task({
      title,
      description,
      userId,
      isCompleted: false,
    })

    await this.taskRepository.create(task)

    return right({ task })
  }
}
