import { isSameDay } from 'date-fns'
import classNames from 'classnames'

import { today } from '@/utils/date'
import { useModal } from '@/store/modal'
import { fetcher } from '@/utils/fetch'
import type { ModalResult } from '@/store/modal'
import type { HabitResult } from '@/store/habits'
import { optimisticInsertLog } from '@/store/habits'
import { startLoading, stopLoading } from '@/store/loading'
import { mediumDateFormatter } from '@/utils/internazionalitazion'
import type { PostHabitLogBody, PostHabitLogResult } from '@/app/api/habitLogs/route'

import { CustomDayLogModal } from './CustomDayLogModal'
import type { Range } from './HabitLogsOverview/utils/ranges'

const week = ['S', 'M', 'T', 'W', 'T', 'F', 'S'] as const
const postHabitLog = fetcher<PostHabitLogResult, never, PostHabitLogBody>('/api/habitLogs', 'POST')

const saveLog = async ({ reason }: ModalResult<unknown>, habit: PostHabitLogBody) => {
  if (reason === 'cancel') return

  startLoading()

  const { result } = await postHabitLog({ body: habit })

  if (result) optimisticInsertLog(result)

  stopLoading()
}

interface WeekRangeProps {
  habit: HabitResult
  range: Range
}
export const WeekRange = ({ habit, range }: WeekRangeProps) => {
  const openModal = useModal(CustomDayLogModal)

  const start = range.at(0) ?? today()
  const end = range.at(-1) ?? today()
  const todayDate = today()

  return (
    <div className='w-full py-2'>
      <div className='prose prose-lg'>{mediumDateFormatter.formatRange(start, end)}</div>

      <div className='flex flex-row gap-2 justify-around mt-2'>
        {range.map((day) => {
          const habitDoneInThisDay = habit.habitLogs.some((log) =>
            isSameDay(new Date(log.date), day),
          )

          const isToday = isSameDay(new Date(day), todayDate)

          const onDayClick = async () => {
            const result = await openModal({
              additionalState: { day },
              outsideClick: true,
              modalActions: true,
            })

            await saveLog(result, { date: day, habitId: habit.id })
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
