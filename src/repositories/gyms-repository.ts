import { type Prisma, type Gym } from '@prisma/client'

export interface FindManyNearbyParams {
  latitude: number
  longitude: number
}

export interface GymsRepository {
  findById: (id: string) => Promise<Gym | null>
  findManyNearby: (params: FindManyNearbyParams) => Promise<Gym[] | null>
  create: (data: Prisma.GymCreateInput) => Promise<Gym>
  searchMany: (query: string, page: number) => Promise<Gym[] | null>
}
