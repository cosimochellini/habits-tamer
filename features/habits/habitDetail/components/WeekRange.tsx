import { isSameDay } from 'date-fns'
import classNames from 'classnames'

import type { HabitResult } from '@/store/habits'
import { reloadHabits } from '@/store/habits'
import { useModal } from '@/store/modal'
import { today } from '@/utils/date'
import { startLoading, stopLoading } from '@/store/loading'
import { fetcher } from '@/utils/fetch'
import type { PostHabitLogBody, PostHabitLogResult } from '@/app/api/habitLogs/route'

import { CustomDayLogModal } from './CustomDayLogModal'
import type { Range } from './HabitLogsOverview/utils/ranges'

const week = ['S', 'M', 'T', 'W', 'T', 'F', 'S'] as const
const postHabitLog = fetcher<PostHabitLogResult, never, PostHabitLogBody>('/api/habitLogs', 'POST')

interface WeekRangeProps {
  habit: HabitResult
  range: Range
}
export const WeekRange = ({ habit, range }: WeekRangeProps) => {
  const openModal = useModal(CustomDayLogModal)

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

          const onDayClick = async () => {
            const { reason } = await openModal({
              additionalState: { day },
              outsideClick: true,
              modalActions: true,
            })

            if (reason === 'cancel') return

            startLoading()

            const { result } = await postHabitLog({
              body: { habitId: habit.id, date: day },
            })

            if (result) await reloadHabits()

            stopLoading()
          }

          return (
            <button
              type='button'
              onClick={onDayClick}
              key={day.getTime()}
              className={classNames('badge md:p-3 xl:p-4', {
                'badge-success': habitDoneInThisDay,
                'badge-outline': !isToday && !habitDoneInThisDay,
                'badge-accent': isToday,
              })}>
              {week.at(day.getDay())}
            </button>
          )
        })}
      </div>
    </div>
  )
}
