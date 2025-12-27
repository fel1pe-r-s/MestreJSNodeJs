import { describe, expect, it, beforeEach } from 'vitest'
import { RegisterUserUseCase } from './register-user.js'
import { InMemoryUserRepository } from '../../../tests/unit/repositories/in-memory-user-repository.js'
import type { Hasher } from '../protocols/hasher.js'

class FakeHasher implements Hasher {
  async hash(value: string): Promise<string> {
    return value + 'hashed'
  }
  async compare(value: string, hash: string): Promise<boolean> {
    return value + 'hashed' === hash
  }
}

describe('Register User Use Case', () => {
  let userRepository: InMemoryUserRepository
  let hasher: FakeHasher
  let sut: RegisterUserUseCase

  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    hasher = new FakeHasher()
    sut = new RegisterUserUseCase(userRepository, hasher)
  })

  it('should be able to register a new user', async () => {
    const result = await sut.execute({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    })

    expect(result.isRight()).toBe(true)
    expect(userRepository.items).toHaveLength(1)
    expect(userRepository.items[0].email).toBe('john@example.com')
  })

  it('should not be able to register a user with same email twice', async () => {
    await sut.execute({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
    })

    const result = await sut.execute({
      name: 'Jane Doe',
      email: 'john@example.com',
      password: 'password456',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(Error)
    expect((result.value as Error).message).toBe('User already exists')
  })
})
