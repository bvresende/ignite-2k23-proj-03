import { type Gym } from '@prisma/client'
import { type GymsRepository } from '@/repositories/gyms-repository'

interface FetchNearbyGymsUseCaseRequest {
  userLatitude: number
  userLongitude: number
}

interface FetchNearbyGymsUseCaseResponse {
  gyms: Gym[] | null
}

export class FetchNearbyGymsUseCase {
  constructor (private readonly gymsRepository: GymsRepository) {}

  async execute ({
    userLatitude,
    userLongitude
  }: FetchNearbyGymsUseCaseRequest): Promise<FetchNearbyGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude
    })

    return {
      gyms
    }
  }
}
