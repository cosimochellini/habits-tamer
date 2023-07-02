import { useMemo } from 'react'
import { byDate, byValue } from 'sort-es'
import { IconCalendarCheck } from '@tabler/icons-react'

import type { HabitResult } from '@/store/habits'
import { firstDayOfTheWeek, today } from '@/utils/date'
import { WeekRange } from '@/features/habits/habitDetail/components/WeekRange'

import { dateRange } from './utils/ranges'

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
