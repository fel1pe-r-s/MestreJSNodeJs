import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '../app.js'

describe('Register (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register', async () => {
    const response = await request(app.server).post('/users').send({
      name: 'John Doe',
      email: `johndoe-${randomUUID()}@example.com`,
      password: 'password123',
    })

    expect(response.statusCode).toBe(201)
  })
})

import { randomUUID } from 'node:crypto'
