import type { Task } from '../../../domain/entities/task.js'

export class TaskPresenter {
  static toHTTP(task: Task) {
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      isCompleted: task.isCompleted,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    }
  }
}
