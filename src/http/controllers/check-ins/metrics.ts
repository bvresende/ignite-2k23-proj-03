import { type FastifyRequest, type FastifyReply } from 'fastify'
import { makeGetUserMetricsUseCase } from '@/use-cases/factories/make-get-user-metrics-use-case'

export async function metrics (request: FastifyRequest, reply: FastifyReply): Promise<any> {
  const fetchGetUserMetricsUseCase = makeGetUserMetricsUseCase()

  const { checkInsCount } = await fetchGetUserMetricsUseCase.execute({
    userId: request.user.sub
  })

  return await reply.status(200).send({ checkInsCount })
}
