import { safeNavigator } from '@/utils/safeSSR'

export const greater = (date1: Date | string, date2: Date | string) =>
  new Date(date1).getTime() >= new Date(date2).getTime()

const rtf = new Intl.RelativeTimeFormat(safeNavigator?.language ?? 'en', { numeric: 'auto' })
const cutoffs = [60, 3600, 86400, 86400 * 7, 86400 * 30, 86400 * 365, Infinity] as const
const units = ['second', 'minute', 'hour', 'day', 'week', 'month', 'year'] as const

export const relativeTime = (date: Date | number) => {
  const timeMs = new Date(date).getTime()

  const deltaSeconds = Math.round((timeMs - Date.now()) / 1000)

  // Grab the ideal cutoff unit
  const unitIndex = cutoffs.findIndex((cutoff) => cutoff > Math.abs(deltaSeconds))

  // Get the divisor to divide from the seconds. E.g. if our unit is "day" our divisor
  // is one day in seconds, so we can divide our seconds by this to get the # of days
  const divisor = unitIndex ? cutoffs[unitIndex - 1] : 1

  return rtf.format(Math.floor(deltaSeconds / divisor), units[unitIndex])
}
