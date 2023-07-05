import { isSameDay } from 'date-fns'
import classNames from 'classnames'
import { useMemo } from 'react'

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

const todayDate = today()
export const WeekRange = ({ habit, range }: WeekRangeProps) => {
  const openModal = useModal(CustomDayLogModal)

  const start = range.at(0) ?? todayDate
  const end = range.at(-1) ?? todayDate

  const processedRange = useMemo(
    () =>
      range.map((date) => {
        const habitDoneInThisDay = habit.habitLogs.some((log) =>
          isSameDay(new Date(log.date), date),
        )

        const isToday = isSameDay(new Date(date), todayDate)

        return { date, habitDoneInThisDay, isToday }
      }),
    [habit.habitLogs, range],
  )

  return (
    <div className='w-full py-4'>
      <div className='prose prose-lg flex gap-2 flex-row items-center justify-between'>
        <span>{mediumDateFormatter.formatRange(start, end)}</span>
        <WeeklyBadge
          quantity={habit.quantity}
          doneLogs={processedRange.filter((r) => r.habitDoneInThisDay).length}
        />
      </div>

      <div className='flex flex-row gap-2 justify-between mt-2 flex-1 items-center'>
        {processedRange.map(({ date, habitDoneInThisDay, isToday }) => {
          const onDayClick = async () => {
            const result = await openModal({
              additionalState: { day: date },
              outsideClick: true,
              modalActions: true,
            })

            await saveLog(result, { date, habitId: habit.id })
          }

          return (
            <button
              type='button'
              onClick={onDayClick}
              key={date.getTime()}
              className={classNames('badge md:p-3 xl:p-4', {
                'badge-success': habitDoneInThisDay,
                'badge-outline': !isToday && !habitDoneInThisDay,
                'badge-accent': isToday,
              })}>
              {week.at(date.getDay())}
            </button>
          )
        })}
      </div>
    </div>
  )
}

interface WeeklyBadgeProps {
  quantity: number
  doneLogs: number
}
const WeeklyBadge = ({ quantity, doneLogs }: WeeklyBadgeProps) => {
  return (
    <div
      className={classNames('badge badge-outline', {
        'badge-success': doneLogs >= quantity,
        'badge-accent': doneLogs < quantity,
        'badge-error': doneLogs === 0,
      })}>
      {doneLogs}/{quantity}
    </div>
  )
}
