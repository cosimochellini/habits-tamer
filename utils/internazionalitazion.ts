import { safeNavigator } from '@/utils/safeSSR'

export const longDateFormatter = new Intl.DateTimeFormat(safeNavigator?.language, {
  year: 'numeric',
  month: 'long',
  day: '2-digit',
  weekday: 'long',
})

export const mediumDateFormatter = new Intl.DateTimeFormat(safeNavigator?.language, {
  year: 'numeric',
  month: 'long',
  day: '2-digit',
})

export const relativeTimeFormat = new Intl.RelativeTimeFormat(safeNavigator?.language, {
  numeric: 'auto',
})
