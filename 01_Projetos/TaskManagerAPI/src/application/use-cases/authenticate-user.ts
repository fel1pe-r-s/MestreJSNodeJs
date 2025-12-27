import type { UserRepository } from '../../domain/repositories/user-repository.js'
import { type Either, left, right } from '../../shared/either.js'
import type { Hasher } from '../protocols/hasher.js'
import type { Encrypter } from '../protocols/encrypter.js'

interface AuthenticateUserUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUserUseCaseResponseData {
  accessToken: string
}

type AuthenticateUserUseCaseResponse = Either<Error, AuthenticateUserUseCaseResponseData>

export class AuthenticateUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private hasher: Hasher,
    private encrypter: Encrypter,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      return left(new Error('Invalid credentials'))
    }

    const isPasswordValid = await this.hasher.compare(password, user.passwordHash)

    if (!isPasswordValid) {
      return left(new Error('Invalid credentials'))
    }

    const accessToken = await this.encrypter.encrypt({
      sub: user.id,
    })

    return right({ accessToken })
  }
}
