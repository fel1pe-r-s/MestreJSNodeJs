import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '../app.js'
import { prisma } from '../../database/prisma.js'
import { hash } from 'bcryptjs'

describe('Authenticate (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    const email = `johndoe-${randomUUID()}@example.com`

    await prisma.user.create({
      data: {
        name: 'John Doe',
        email,
        passwordHash: await hash('password123', 6),
      },
    })

    const response = await request(app.server).post('/sessions').send({
      email,
      password: 'password123',
    })

    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('accessToken')
  })
})

import { randomUUID } from 'node:crypto'
