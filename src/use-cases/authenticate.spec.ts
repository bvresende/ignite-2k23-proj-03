import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { hash } from 'bcryptjs'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('should be able to authenticate', async () => {
    const password = '123456'

    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash(password, 6)
    })

    const { user: userAuthenticated } = await sut.execute({
      email: 'johndoe@example.com',
      password
    })

    expect(userAuthenticated.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticated with wrong password', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('123456', 6)
    })

    await expect(async () =>
      await sut.execute({
        email: 'johndoe@example.com',
        password: '12345'
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticated with wrong email', async () => {
    await expect(async () =>
      await sut.execute({
        email: 'johndoe@example.com',
        password: '123456'
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
