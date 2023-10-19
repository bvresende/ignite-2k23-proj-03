import { type CheckIn, type Prisma } from '@prisma/client'

export interface CheckInsRepository {
  create: (data: Prisma.CheckInUncheckedCreateInput) => Promise<CheckIn>
  save: (checkIn: CheckIn) => Promise<CheckIn>
  findById: (checkInId: string) => Promise<CheckIn | null>
  findByUserIdOnDate: (userId: string, date: Date) => Promise<CheckIn | null>
  findManyByUserId: (userId: string, page: number) => Promise<CheckIn[] | null>
  countByUserId: (userId: string) => Promise<number>
}
