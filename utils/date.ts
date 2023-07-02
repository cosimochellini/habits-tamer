import { relativeTimeFormat } from '@/utils/internazionalitazion'

export const greater = (date1: Date | string, date2: Date | string) =>
  new Date(date1).getTime() >= new Date(date2).getTime()

const cutoffs = [60, 3600, 86400, 86400 * 7, 86400 * 30, 86400 * 365, Infinity] as const
const units = ['second', 'minute', 'hour', 'day', 'week', 'month', 'year'] as const

export const relativeTime = (date: Date | number) => {
  const timeMs = new Date(date).getTime()

  const deltaSeconds = Math.round((timeMs - Date.now()) / 1000)

  const unitIndex = cutoffs.findIndex((cutoff) => cutoff > Math.abs(deltaSeconds))

  const divisor = cutoffs.at(unitIndex - 1) ?? 1

  return relativeTimeFormat.format(Math.floor(deltaSeconds / divisor), units[unitIndex])
}

export const removeHours = (date: Date) => new Date(date.setHours(0, 0, 0, 0))

export const today = () => new Date()
export const firstDayOfTheWeek = (date = new Date()) =>
  new Date(date.setDate(date.getDate() - ((date.getDay() + 6) % 7)))

export const firstDayOfTheMonth = () => new Date(new Date().setDate(1))

export const firstDayOfTheYear = () => new Date(new Date().setMonth(0))
