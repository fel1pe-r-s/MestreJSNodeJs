import { describe, expect, it, beforeEach } from 'vitest'
import { FetchUserTasksUseCase } from './fetch-user-tasks.js'
import { InMemoryTaskRepository } from '../../../tests/unit/repositories/in-memory-task-repository.js'
import { Task } from '../../domain/entities/task.js'

describe('Fetch User Tasks Use Case', () => {
  let taskRepository: InMemoryTaskRepository
  let sut: FetchUserTasksUseCase

  beforeEach(() => {
    taskRepository = new InMemoryTaskRepository()
    sut = new FetchUserTasksUseCase(taskRepository)
  })

  it('should be able to fetch tasks from a user', async () => {
    await taskRepository.create(new Task({ title: 'Task 1', userId: 'user-1', isCompleted: false }))
    await taskRepository.create(new Task({ title: 'Task 2', userId: 'user-1', isCompleted: false }))
    await taskRepository.create(new Task({ title: 'Task 3', userId: 'user-2', isCompleted: false }))

    const result = await sut.execute({
      userId: 'user-1',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.tasks).toHaveLength(2)
  })
})
