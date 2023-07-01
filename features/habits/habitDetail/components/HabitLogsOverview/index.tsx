import { useMemo } from 'react'
import { byDate, byValue } from 'sort-es'
import classNames from 'classnames'
import { isSameDay } from 'date-fns'
import { IconCalendarCheck } from '@tabler/icons-react'

import type { HabitResult } from '@/store/habits'
import { firstDayOfTheWeek, today } from '@/utils/date'

import type { Range } from './utils/ranges'
import { dateRange } from './utils/ranges'

const week = ['S', 'M', 'T', 'W', 'T', 'F', 'S'] as const

interface HabitLogOverviewProps {
  habit: HabitResult
}
export const HabitLogsOverview = ({ habit }: HabitLogOverviewProps) => {
  const oldestLog = useMemo(
    () =>
      habit.habitLogs
        .concat()
        .sort(byValue((x) => x.date, byDate()))
        .at(0),
    [habit],
  )

  const ranges = useMemo(() => {
    if (!oldestLog) return []

    const startingDate = firstDayOfTheWeek(new Date(oldestLog.date))

    return dateRange(startingDate, today(), 7)
  }, [oldestLog])

  return (
    <div className='card bg-base-300 card-bordered'>
      <div className='card-body'>
        <h2 className='card-title text-balanced'>
          Logs <IconCalendarCheck />
        </h2>
        <div className='card-actions justify-end'>
          {ranges.map((range) => (
            <WeekRange habit={habit} range={range} key={range.at(0)?.getTime()} />
          ))}
        </div>
      </div>
    </div>
  )
}
interface WeekRangeProps {
  habit: HabitResult
  range: Range
}
const WeekRange = ({ habit, range }: WeekRangeProps) => {
  const start = range.at(0)
  const end = range.at(-1)
  const todayDate = today()

  return (
    <div className='w-full py-2'>
      <div className='prose prose-lg'>
        {start?.toLocaleDateString()} - {end?.toLocaleDateString()}
      </div>
      <div className='flex flex-row gap-2 justify-around mt-2'>
        {range.map((day) => {
          const habitDoneInThisDay = habit.habitLogs.some((log) =>
            isSameDay(new Date(log.date), day),
          )

          const isToday = isSameDay(new Date(day), todayDate)

          return (
            <div
              key={day.getTime()}
              className={classNames('badge md:p-3 xl:p-4', {
                'badge-success': habitDoneInThisDay,
                'badge-outline': !isToday && !habitDoneInThisDay,
                'badge-accent': isToday,
              })}>
              {week.at(day.getDay())}
            </div>
          )
        })}
      </div>
    </div>
  )
}
