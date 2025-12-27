import { describe, expect, it, beforeEach } from 'vitest'
import { UpdateTaskUseCase } from './update-task.js'
import { InMemoryTaskRepository } from '../../../tests/unit/repositories/in-memory-task-repository.js'
import { Task } from '../../domain/entities/task.js'
import { ResourceNotFoundError } from '../../domain/errors/resource-not-found-error.js'

describe('Update Task Use Case', () => {
  let taskRepository: InMemoryTaskRepository
  let sut: UpdateTaskUseCase

  beforeEach(() => {
    taskRepository = new InMemoryTaskRepository()
    sut = new UpdateTaskUseCase(taskRepository)
  })

  it('should be able to update a task', async () => {
    const task = new Task({ title: 'Old Title', userId: 'user-1', isCompleted: false })
    await taskRepository.create(task)

    const result = await sut.execute({
      taskId: task.id,
      userId: 'user-1',
      title: 'New Title',
      isCompleted: true,
    })

    expect(result.isRight()).toBe(true)
    expect(taskRepository.items[0].title).toBe('New Title')
    expect(taskRepository.items[0].isCompleted).toBe(true)
  })

  it('should not be able to update a task from another user', async () => {
    const task = new Task({ title: 'Old Title', userId: 'user-1', isCompleted: false })
    await taskRepository.create(task)

    const result = await sut.execute({
      taskId: task.id,
      userId: 'user-2',
      title: 'New Title',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(Error)
  })
})
