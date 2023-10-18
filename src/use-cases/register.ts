import { hash } from 'bcryptjs'
import { type UsersRepository } from '../repositories/users-repository'
import { UserAlreadyExists } from './errors/user-already-exists-error'
import { type User } from '@prisma/client'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor (private readonly usersRepository: UsersRepository) {}

  async execute ({ name, email, password }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail != null) {
      throw new UserAlreadyExists()
    }

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const password_hash = await hash(password, 6)

    const user = await this.usersRepository.create({ name, email, password_hash })

    return {
      user
    }
  }
}
