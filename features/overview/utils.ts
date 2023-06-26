import type { HabitFrequency } from '@prisma/client'

import type { HabitResult } from '@/store/habits'
import { greater } from '@/utils/date'

const removeHours = (date: Date) => new Date(date.setHours(0, 0, 0, 0))
const today = () => new Date()
const firstDayOfTheWeek = () => {
  const date = new Date()
  return new Date(date.setDate(date.getDate() - date.getDay() + 1))
}

const firstDayOfTheMonth = () => new Date(new Date().setDate(1))

const firstDayOfTheYear = () => new Date(new Date().setMonth(0))

const firstDayStrategy = {
  DAILY: today,
  WEEKLY: firstDayOfTheWeek,
  MONTHLY: firstDayOfTheMonth,
  YEARLY: firstDayOfTheYear,
} as const satisfies Record<HabitFrequency, () => Date>

export const currentPeriodLogs = ({ habitLogs, frequency }: HabitResult) => {
  const startDate = removeHours(firstDayStrategy[frequency]())

  return habitLogs.filter((log) => greater(log.date, startDate))
}
