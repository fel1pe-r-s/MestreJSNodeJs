import { describe, expect, it, beforeEach } from 'vitest'
import { DeleteTaskUseCase } from './delete-task.js'
import { InMemoryTaskRepository } from '../../../tests/unit/repositories/in-memory-task-repository.js'
import { Task } from '../../domain/entities/task.js'
import { ResourceNotFoundError } from '../../domain/errors/resource-not-found-error.js'
import { NotAllowedError } from '../../domain/errors/not-allowed-error.js'

describe('Delete Task Use Case', () => {
  let taskRepository: InMemoryTaskRepository
  let sut: DeleteTaskUseCase

  beforeEach(() => {
    taskRepository = new InMemoryTaskRepository()
    sut = new DeleteTaskUseCase(taskRepository)
  })

  it('should be able to delete a task', async () => {
    const task = new Task({
      title: 'Task for deletion',
      description: 'Test description',
      userId: 'user-01',
    })

    await taskRepository.create(task)

    const result = await sut.execute({
      taskId: task.id,
      userId: 'user-01',
    })

    expect(result.isRight()).toBe(true)
    expect(taskRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a non-existing task', async () => {
    const result = await sut.execute({
      taskId: 'non-existing-id',
      userId: 'user-01',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to delete a task from another user', async () => {
    const task = new Task({
      title: 'Task for deletion',
      description: 'Test description',
      userId: 'user-01',
    })

    await taskRepository.create(task)

    const result = await sut.execute({
      taskId: task.id,
      userId: 'user-02',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
