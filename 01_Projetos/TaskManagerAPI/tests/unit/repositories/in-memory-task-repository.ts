import { Task } from '../../../src/domain/entities/task.js'
import type { TaskRepository } from '../../../src/domain/repositories/task-repository.js'

export class InMemoryTaskRepository implements TaskRepository {
  public items: Task[] = []

  async create(task: Task): Promise<void> {
    this.items.push(task)
  }

  async findById(id: string): Promise<Task | null> {
    const task = this.items.find((item) => item.id === id)

    if (!task) {
      return null
    }

    return task
  }

  async findManyByUserId(userId: string): Promise<Task[]> {
    return this.items.filter((item) => item.userId === userId)
  }

  async save(task: Task): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === task.id)

    this.items[itemIndex] = task
  }

  async delete(id: string): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === id)

    this.items.splice(itemIndex, 1)
  }
}
