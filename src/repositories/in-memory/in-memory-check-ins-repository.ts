import dayjs from 'dayjs'
import { randomUUID } from 'node:crypto'
import { type CheckIn, type Prisma } from '@prisma/client'
import { type CheckInsRepository } from '../check-ins-repository'

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public items: CheckIn[] = []

  async create (data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      created_at: new Date(),
      validated_at: data.validated_at ? new Date(data.validated_at) : null
    }

    this.items.push(checkIn)

    return checkIn
  }

  async findByUserIdOnDate (userId: string, date: Date): Promise<CheckIn | null> {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkInOnSameDate = this.items.find(
      (checkIn) => {
        const checkInDate = dayjs(checkIn.created_at)
        const isOnSameDate =
          checkInDate.isAfter(startOfTheDay) &&
          checkInDate.isBefore(endOfTheDay)

        return checkIn.user_id === userId && isOnSameDate
      })

    if (checkInOnSameDate === undefined) {
      return null
    }

    return checkInOnSameDate
  }

  async findManyByUserId (userId: string, page: number): Promise<CheckIn[] | null> {
    return this.items
      .filter((item) => item.user_id === userId)
      .slice((page - 1) * 20, page * 20)
  }

  async countByUserId (userId: string): Promise<number> {
    return this.items
      .filter((item) => item.user_id === userId).length
  }
}
