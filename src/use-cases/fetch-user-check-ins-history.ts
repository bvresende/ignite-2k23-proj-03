import { type CheckInsRepository } from '@/repositories/check-ins-repository'
import { type CheckIn } from '@prisma/client'

interface FetchUserUseCheckInsHistoryCaseRequest {
  userId: string
  page: number
}

interface FetchUserUseCheckInsHistoryCaseResponse {
  checkIns: CheckIn[] | null
}

export class FetchUserUseCheckInsHistoryCase {
  constructor (private readonly checkInsRepository: CheckInsRepository) {}

  async execute ({ userId, page }: FetchUserUseCheckInsHistoryCaseRequest): Promise<FetchUserUseCheckInsHistoryCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(userId, page)

    return {
      checkIns
    }
  }
}
