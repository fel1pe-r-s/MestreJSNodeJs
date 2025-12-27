import type { Task } from '../entities/task.js'

export interface TaskRepository {
  create(task: Task): Promise<void>
  findById(id: string): Promise<Task | null>
  findManyByUserId(userId: string): Promise<Task[]>
  save(task: Task): Promise<void>
  delete(id: string): Promise<void>
}
