import type { FastifyInstance } from 'fastify'
import { BcryptHasher } from '../../cryptography/bcrypt-hasher.js'
import { JwtEncrypter } from '../../cryptography/jwt-encrypter.js'
import { PrismaUserRepository } from '../../database/prisma-user-repository.js'
import { AuthenticateUserUseCase } from '../../../application/use-cases/authenticate-user.js'

export function makeAuthenticateUserUseCase(app: FastifyInstance) {
  const userRepository = new PrismaUserRepository()
  const hasher = new BcryptHasher()
  const encrypter = new JwtEncrypter(app)

  return new AuthenticateUserUseCase(userRepository, hasher, encrypter)
}
