import { BcryptHasher } from '../../cryptography/bcrypt-hasher.js'
import { PrismaUserRepository } from '../../database/prisma-user-repository.js'
import { RegisterUserUseCase } from '../../../application/use-cases/register-user.js'

export function makeRegisterUserUseCase() {
  const userRepository = new PrismaUserRepository()
  const hasher = new BcryptHasher()

  return new RegisterUserUseCase(userRepository, hasher)
}
