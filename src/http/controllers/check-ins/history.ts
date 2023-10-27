import { type FastifyRequest, type FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeFetchUserCheckInsHistoryUseCase } from '@/use-cases/factories/make-fetch-user-check-ins-history-use-case'

export async function history (request: FastifyRequest, reply: FastifyReply): Promise<any> {
  const historyCheckInQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1)
  })

  const { page } = historyCheckInQuerySchema.parse(request.query)

  const fetchUserCheckInsHistoryUseCase = makeFetchUserCheckInsHistoryUseCase()

  const { checkIns } = await fetchUserCheckInsHistoryUseCase.execute({
    userId: request.user.sub,
    page
  })

  return await reply.status(200).send({ checkIns })
}
