import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '../app.js'
import { prisma } from '../../database/prisma.js'
import { hash } from 'bcryptjs'

async function createAndAuthenticateUser(emailPrefix = 'user') {
  const email = `${emailPrefix}-${randomUUID()}@example.com`
  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email,
      passwordHash: await hash('password123', 6),
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email,
    password: 'password123',
  })

  return {
    token: authResponse.body.accessToken,
    user,
  }
}

import { randomUUID } from 'node:crypto'

describe('Tasks (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a task', async () => {
    const { token } = await createAndAuthenticateUser()

    const response = await request(app.server)
      .post('/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'New Task',
        description: 'Task description',
      })

    expect(response.statusCode).toBe(201)

    const taskOnDatabase = await prisma.task.findFirst({
      where: {
        title: 'New Task',
      },
    })

    expect(taskOnDatabase).toBeTruthy()
  })

  it('should be able to fetch user tasks', async () => {
    const { token, user } = await createAndAuthenticateUser()

    await prisma.task.createMany({
      data: [
        {
          title: 'Task 01',
          description: 'Desc 01',
          userId: user.id,
        },
        {
          title: 'Task 02',
          description: 'Desc 02',
          userId: user.id,
        },
      ],
    })

    const response = await request(app.server)
      .get('/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body.tasks).toHaveLength(2)
    expect(response.body.tasks[0]).toMatchObject({ title: 'Task 01' })
  })

  it('should be able to update a task', async () => {
    const { token, user } = await createAndAuthenticateUser()

    const task = await prisma.task.create({
      data: {
        title: 'Task to update',
        description: 'Original desc',
        userId: user.id,
      },
    })

    const response = await request(app.server)
      .put(`/tasks/${task.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Updated Task',
        isCompleted: true,
      })

    expect(response.statusCode).toBe(204)

    const updatedTask = await prisma.task.findUnique({
      where: {
        id: task.id,
      },
    })

    expect(updatedTask?.title).toBe('Updated Task')
    expect(updatedTask?.isCompleted).toBe(true)
  })

  it('should be able to delete a task', async () => {
    const { token, user } = await createAndAuthenticateUser()

    const task = await prisma.task.create({
      data: {
        title: 'Task to delete',
        description: 'Delete me',
        userId: user.id,
      },
    })

    const response = await request(app.server)
      .delete(`/tasks/${task.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toBe(204)

    const deletedTask = await prisma.task.findUnique({
      where: {
        id: task.id,
      },
    })

    expect(deletedTask).toBeNull()
  })
})
