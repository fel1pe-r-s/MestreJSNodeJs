import type { FastifyInstance } from 'fastify'
import type { Encrypter } from '../../application/protocols/encrypter.js'

export class JwtEncrypter implements Encrypter {
  constructor(private app: FastifyInstance) {}

  async encrypt(payload: Record<string, unknown>): Promise<string> {
    return this.app.jwt.sign(payload)
  }
}
