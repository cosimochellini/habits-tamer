import { useMemo } from 'react'
import { byDate, byValue } from 'sort-es'
import { IconCalendarCheck } from '@tabler/icons-react'
import classNames from 'classnames'

import type { HabitResult } from '@/store/habits'
import { firstDayOfTheWeek, removeHours, today } from '@/utils/date'

import { WeekRange } from '../WeekRange'

import { dateRange } from './utils/ranges'
import classes from './index.module.scss'

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

    const startingDate = removeHours(firstDayOfTheWeek(new Date(oldestLog.date)))

    return dateRange(startingDate, removeHours(today()), 7)
  }, [oldestLog])

  return (
    <div className='card bg-base-300 card-bordered'>
      <div className='card-body'>
        <h2 className='card-title text-balanced'>
          Logs <IconCalendarCheck />
        </h2>
        <div
          className={classNames(
            'card-actions justify-end max-h-96 overflow-auto',
            classes.container,
          )}>
          {ranges.map((range) => (
            <WeekRange habit={habit} range={range} key={range.at(0)?.getTime()} />
          ))}
        </div>
      </div>
    </div>
  )
}
