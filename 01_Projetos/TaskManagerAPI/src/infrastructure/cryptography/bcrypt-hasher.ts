import { compare, hash } from 'bcryptjs'
import { Hasher } from '../../application/protocols/hasher'

export class BcryptHasher implements Hasher {
  private HASH_SALT_LENGTH = 8

  async hash(value: string): Promise<string> {
    return hash(value, this.HASH_SALT_LENGTH)
  }

  async compare(value: string, hash: string): Promise<boolean> {
    return compare(value, hash)
  }
}
