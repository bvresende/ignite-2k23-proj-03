import { FetchUserCheckInsHistoryUseCase } from '../fetch-user-check-ins-history'
import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'

export function makeFetchUserCheckInsHistoryUseCase (): FetchUserCheckInsHistoryUseCase {
  const checkInsRepository = new PrismaCheckInsRepository()
  const fetchUserCheckInsUseCase = new FetchUserCheckInsHistoryUseCase(checkInsRepository)

  return fetchUserCheckInsUseCase
}
