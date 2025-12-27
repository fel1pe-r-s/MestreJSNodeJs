import { describe, expect, it, beforeEach } from 'vitest'
import { CreateTaskUseCase } from './create-task.js'
import { InMemoryTaskRepository } from '../../../tests/unit/repositories/in-memory-task-repository.js'

describe('Create Task Use Case', () => {
  let taskRepository: InMemoryTaskRepository
  let sut: CreateTaskUseCase

  beforeEach(() => {
    taskRepository = new InMemoryTaskRepository()
    sut = new CreateTaskUseCase(taskRepository)
  })

  it('should be able to create a new task', async () => {
    const result = await sut.execute({
      title: 'New Task',
      description: 'Task description',
      userId: 'user-1',
    })

    expect(result.isRight()).toBe(true)
    expect(taskRepository.items).toHaveLength(1)
    expect(taskRepository.items[0].title).toBe('New Task')
  })
})
