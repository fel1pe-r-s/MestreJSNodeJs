import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeAuthenticateUserUseCase } from '../factories/make-authenticate-user-use-case.js'

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  const authenticateUserUseCase = makeAuthenticateUserUseCase(request.server as any)

  const result = await authenticateUserUseCase.execute({
    email,
    password,
  })

  if (result.isLeft()) {
    return reply.status(400).send({ message: result.value.message })
  }

  const { accessToken } = result.value

  return reply.status(200).send({
    accessToken,
  })
}
