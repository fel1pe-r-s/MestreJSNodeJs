import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeRegisterUserUseCase } from '../factories/make-register-user-use-case.js'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  const registerUserUseCase = makeRegisterUserUseCase()

  const result = await registerUserUseCase.execute({
    name,
    email,
    password,
  })

  if (result.isLeft()) {
    return reply.status(409).send({ message: result.value.message })
  }

  return reply.status(201).send()
}
