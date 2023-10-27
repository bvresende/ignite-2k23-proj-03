import { type FastifyRequest, type FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeSearchGymsUseCase } from '@/use-cases/factories/make-search-gyms-use-case'

export async function search (request: FastifyRequest, reply: FastifyReply): Promise<any> {
  const searchGymsQuerySchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1)
  })

  const {
    query,
    page
  } = searchGymsQuerySchema.parse(request.query)

  const searchGymsUseCase = makeSearchGymsUseCase()

  const { gyms } = await searchGymsUseCase.execute({ query, page })

  return await reply.status(200).send({ gyms })
}
