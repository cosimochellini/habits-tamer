import { addDays } from 'date-fns'

import { range } from '@/utils/range'

export type Range = Date[]

export const dateRange = (from: Date, to: Date, interval: number): Range[] => {
  const ret: Range[] = []
  let currentDate = from

  while (currentDate <= to) {
    // eslint-disable-next-line no-loop-func
    ret.push(range(interval).map((d, index) => addDays(currentDate, index)))

    currentDate = addDays(currentDate, interval)
  }

  return ret
}
