import { Task } from '../../domain/entities/task.js'
import type { TaskRepository } from '../../domain/repositories/task-repository.js'
import { prisma } from './prisma.js'

export class PrismaTaskRepository implements TaskRepository {
  async create(task: Task): Promise<void> {
    await prisma.task.create({
      data: {
        id: task.id,
        title: task.title,
        description: task.description,
        isCompleted: task.isCompleted,
        userId: task.userId,
        createdAt: task.createdAt,
      },
    })
  }

  async findById(id: string): Promise<Task | null> {
    const task = await prisma.task.findUnique({
      where: { id },
    })

    if (!task) {
      return null
    }

    return new Task(
      {
        title: task.title,
        description: task.description,
        isCompleted: task.isCompleted,
        userId: task.userId,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt,
      },
      task.id,
    )
  }

  async findManyByUserId(userId: string): Promise<Task[]> {
    const tasks = await prisma.task.findMany({
      where: { userId },
    })

    return tasks.map(
      (task: any) =>
        new Task(
          {
            title: task.title,
            description: task.description,
            isCompleted: task.isCompleted,
            userId: task.userId,
            createdAt: task.createdAt,
            updatedAt: task.updatedAt,
          },
          task.id,
        ),
    )
  }

  async save(task: Task): Promise<void> {
    await prisma.task.update({
      where: { id: task.id },
      data: {
        title: task.title,
        description: task.description,
        isCompleted: task.isCompleted,
        updatedAt: task.updatedAt,
      },
    })
  }

  async delete(id: string): Promise<void> {
    await prisma.task.delete({
      where: { id },
    })
  }
}
