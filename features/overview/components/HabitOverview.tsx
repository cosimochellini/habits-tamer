import classNames from 'classnames'
import { memo, useState } from 'react'
import type { CSSProperties } from 'react'
import { IconPlus } from '@tabler/icons-react'

import { fetcher } from '@/utils/fetch'
import type { HabitResult } from '@/store/habits'
import { optimisticInsertLog } from '@/store/habits'
import { currentPeriodLogs } from '@/features/overview/utils'
import { useIncrementalValue } from '@/hooks/incrementalValue'
import { HabitCategoryIconBadge } from '@/components/habits/HabitCategoryIcon'
import type { PostHabitLogBody, PostHabitLogResult } from '@/app/api/habitLogs/route'

interface HabitOverviewProps {
  habit: HabitResult
}

const postHabitLog = fetcher<PostHabitLogResult, never, PostHabitLogBody>('/api/habitLogs', 'POST')
export const HabitOverview = memo(function HabitOverviewComponent({ habit }: HabitOverviewProps) {
  const [logLoading, setLogLoading] = useState(false)

  const doneLogs = currentPeriodLogs(habit)

  const percentage = (doneLogs.length / habit.quantity) * 100 || 5

  const value = useIncrementalValue(percentage, percentage * 10)

  const logHabit = async () => {
    setLogLoading(true)

    const { result } = await postHabitLog({
      body: { habitId: habit.id },
    })

    if (result) optimisticInsertLog(result)

    setLogLoading(false)
  }

  const radialProgress = {
    '--value': value.toFixed(0),
    '--thickness': '0.6rem',
    '--size': '100%',
  } as CSSProperties

  const habitCompleted = value >= 100

  return (
    <div className='w-full pt-10'>
      <div
        className={classNames('card bg-transparent/10 w-full h-full aspect-square lg:max-w-min', {
          'border-2 border-accent': habitCompleted,
        })}>
        <div className='card-body p-3'>
          <div
            className={classNames('radial-progress after:hidden', {
              'text-accent bg-transparent/10': habitCompleted,
            })}
            style={radialProgress}>
            <div className='flex gap-2 flex-col items-center'>
              <div className='px-1 capitalize text-balanced'>{habit.name}</div>
            </div>
          </div>
          <div className='absolute -top-2 -left-2'>
            <HabitCategoryIconBadge compact category={habit.habitCategory} />
          </div>
          <div className='absolute -bottom-2 -right-2'>
            <button
              onClick={logHabit}
              type='button'
              disabled={logLoading}
              className='btn btn-accent btn-sm rounded-full'>
              <IconPlus className={logLoading ? 'loading' : ''} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
})
