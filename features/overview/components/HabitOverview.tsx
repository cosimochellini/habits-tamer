import Link from 'next/link'
import classNames from 'classnames'
import { byDate, byValue } from 'sort-es'
import { memo, useMemo, useState } from 'react'
import { IconClock, IconInfoCircle, IconPlus } from '@tabler/icons-react'

import { fetcher } from '@/utils/fetch'
import { stopPropagation } from '@/utils/react'
import type { HabitResult } from '@/store/habits'
import { relativeTime } from '@/utils/date'
import { optimisticInsertLog } from '@/store/habits'
import { currentPeriodLogs } from '@/features/overview/utils'
import { useIncrementalValue } from '@/hooks/incrementalValue'
import { HabitFrequencyBadge } from '@/components/habits/HabitFrequencyBadge'
import { HabitCategoryIconBadge } from '@/components/habits/HabitCategoryIcon'
import type { PostHabitLogBody, PostHabitLogResult } from '@/app/api/habitLogs/route'

import { HabitProgress } from './HabitProgress'
import classes from './HabitOverview.module.scss'

interface HabitOverviewProps {
  habit: HabitResult
}

const postHabitLog = fetcher<PostHabitLogResult, never, PostHabitLogBody>('/api/habitLogs', 'POST')

export const HabitOverview = memo(function HabitOverviewComponent({ habit }: HabitOverviewProps) {
  const [flipped, setFlipped] = useState(false)

  const onHabitCardClick = () => {
    setFlipped((f) => !f)
  }

  return (
    <button
      type='button'
      className={classNames('w-full pt-10', classes.deck)}
      onClick={onHabitCardClick}>
      <div className={classNames(classes.card, { [classes.flipped]: flipped })}>
        <HabitOverviewFront habit={habit} />
        <HabitOverviewBack habit={habit} />
        <div
          className={classNames('absolute -bottom-2 -left-2 transition-opacity opacity-100', {
            '!opacity-0': !flipped,
          })}>
          <Link className='btn btn-success btn-sm ' href={`/habits/${habit.id}`}>
            <IconInfoCircle />
          </Link>
        </div>
      </div>
    </button>
  )
})

const HabitOverviewFront = ({ habit }: HabitOverviewProps) => {
  const [logLoading, setLogLoading] = useState(false)

  const doneLogs = useMemo(() => currentPeriodLogs(habit), [habit])
  const percentage = useMemo(
    () => (doneLogs.length / habit.quantity) * 100 || 5,
    [doneLogs.length, habit.quantity],
  )

  const value = useIncrementalValue(percentage, percentage * 10)
  const habitCompleted = value >= 100
  const logHabit = async (habitId: string) => {
    setLogLoading(true)

    const { result } = await postHabitLog({
      body: { habitId },
    })

    if (result) optimisticInsertLog(result)

    setLogLoading(false)
  }

  return (
    <div
      className={classNames(
        'card bg-transparent/10 w-full h-full m-auto aspect-square',
        classes.front,
        classes.face,
        {
          'border-2 border-accent': habitCompleted,
        },
      )}>
      <div className='card-body p-3'>
        <HabitProgress progress={value}>
          <div className='flex gap-2 flex-col items-center'>
            <div className='px-3 capitalize text-balanced text-center md:mx-2'>{habit.name}</div>
            <div>
              {doneLogs.length} / {habit.quantity}
            </div>
          </div>
        </HabitProgress>
        <div className='absolute -top-2 -left-2'>
          <HabitCategoryIconBadge compact category={habit.habitCategory} />
        </div>
        <div className='absolute -bottom-2 -right-2'>
          <button
            onClick={stopPropagation(() => logHabit(habit.id))}
            type='button'
            disabled={logLoading}
            className='btn btn-accent btn-sm'>
            <IconPlus className={logLoading ? 'loading' : ''} />
          </button>
        </div>
      </div>
    </div>
  )
}

const HabitOverviewBack = ({ habit }: HabitOverviewProps) => {
  const lastLog = useMemo(
    () =>
      habit.habitLogs
        .concat()
        .sort(byValue((l) => l.date, byDate({ desc: true })))
        .at(0),
    [habit],
  )

  const formattedLastLog = useMemo(() => (lastLog ? relativeTime(lastLog.date) : ''), [lastLog])

  return (
    <div
      className={classNames(
        'card bg-transparent/10 w-full h-full m-auto aspect-square',
        classes.back,
        classes.face,
      )}>
      <div className='card-body p-3 items-center h-full justify-center relative'>
        <div className='flex gap-2 flex-col items-center'>
          <HabitFrequencyBadge habit={habit} icon />

          <div className='badge badge-accent gap-2 p-4'>
            <IconClock />

            {formattedLastLog}
          </div>
        </div>
      </div>
    </div>
  )
}
