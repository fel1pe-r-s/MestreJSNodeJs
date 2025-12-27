import { User } from '../../domain/entities/user.js'
import type { UserRepository } from '../../domain/repositories/user-repository.js'
import { type Either, left, right } from '../../shared/either.js'
import type { Hasher } from '../protocols/hasher.js'

interface RegisterUserUseCaseRequest {
  name: string
  email: string
  password: string
}

type RegisterUserUseCaseResponse = Either<Error, { user: User }>

export class RegisterUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private hasher: Hasher,
  ) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
    const userWithSameEmail = await this.userRepository.findByEmail(email)

    if (userWithSameEmail) {
      return left(new Error('User already exists'))
    }

    const passwordHash = await this.hasher.hash(password)

    const user = new User({
      name,
      email,
      passwordHash,
    })

    await this.userRepository.create(user)

    return right({ user })
  }
}
