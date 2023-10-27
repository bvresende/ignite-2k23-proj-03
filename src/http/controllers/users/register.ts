import { type FastifyRequest, type FastifyReply } from 'fastify'
import { z } from 'zod'
import { UserAlreadyExists } from '@/use-cases/errors/user-already-exists-error'
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case'

export async function register (request: FastifyRequest, reply: FastifyReply): Promise<any> {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterUseCase()

    await registerUseCase.execute({ name, email, password })
  } catch (error) {
    if (error instanceof UserAlreadyExists) {
      return await reply.status(409).send({ message: error.message })
    }

    return await reply.status(500).send() // TO DO fix me
  }

  return await reply.status(201).send()
}
