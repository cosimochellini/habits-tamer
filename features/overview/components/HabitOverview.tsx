import { useMemo } from 'react'

import type { HabitResult } from '@/store/habits'
import { HabitCategoryIconBadge } from '@/components/habits/HabitCategoryIcon'
import { currentPeriodLogs } from '@/features/overview/utils'

interface HabitOverviewProps {
  habit: HabitResult
}

export const HabitOverview = ({ habit }: HabitOverviewProps) => {
  const doneLogs = useMemo(() => currentPeriodLogs(habit), [habit])
  const percentage = doneLogs / habit.quantity

  return (
    <div className='card bg-secondary/80 w-full h-full aspect-square'>
      <div className='card-body'>
        <div className='flex gap-2 flex-col items-center'>
          <div className='text-center m-auto -mx-8 capitalize'>{habit.name}</div>
          <HabitCategoryIconBadge category={habit.habitCategory} />
        </div>
        <div className='text-center'>{percentage.toFixed(0)}%</div>
      </div>
    </div>
  )
}
