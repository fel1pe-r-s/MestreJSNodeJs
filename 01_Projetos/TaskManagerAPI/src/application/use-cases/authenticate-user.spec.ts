import { describe, expect, it, beforeEach } from 'vitest'
import { AuthenticateUserUseCase } from './authenticate-user.js'
import { InMemoryUserRepository } from '../../../tests/unit/repositories/in-memory-user-repository.js'
import type { Hasher } from '../protocols/hasher.js'
import type { Encrypter } from '../protocols/encrypter.js'
import { User } from '../../domain/entities/user.js'

class FakeHasher implements Hasher {
  async hash(value: string): Promise<string> {
    return value + 'hashed'
  }
  async compare(value: string, hash: string): Promise<boolean> {
    return value + 'hashed' === hash
  }
}

class FakeEncrypter implements Encrypter {
  async encrypt(payload: Record<string, unknown>): Promise<string> {
    return JSON.stringify(payload)
  }
}

describe('Authenticate User Use Case', () => {
  let userRepository: InMemoryUserRepository
  let hasher: FakeHasher
  let encrypter: FakeEncrypter
  let sut: AuthenticateUserUseCase

  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    hasher = new FakeHasher()
    encrypter = new FakeEncrypter()
    sut = new AuthenticateUserUseCase(userRepository, hasher, encrypter)
  })

  it('should be able to authenticate a user', async () => {
    const passwordHash = await hasher.hash('password123')
    const user = new User({
      name: 'John Doe',
      email: 'john@example.com',
      passwordHash,
    })
    await userRepository.create(user)

    const result = await sut.execute({
      email: 'john@example.com',
      password: 'password123',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      accessToken: expect.any(String),
    })
  })

  it('should not be able to authenticate with wrong password', async () => {
    const passwordHash = await hasher.hash('password123')
    const user = new User({
      name: 'John Doe',
      email: 'john@example.com',
      passwordHash,
    })
    await userRepository.create(user)

    const result = await sut.execute({
      email: 'john@example.com',
      password: 'wrong-password',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(Error)
  })
})
