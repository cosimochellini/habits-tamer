import Router from 'next/router'
import { isSameDay } from 'date-fns'
import { IconSquareRoundedPlus, IconTrashX } from '@tabler/icons-react'

import { useHabits } from '@/store/habits'
import type { ModalComponentProps } from '@/store/modal'
import { useModalState } from '@/store/modal'
import { longDateFormatter } from '@/utils/internazionalitazion'

export interface CustomDayLogModalProps {
  day: Date
}

export const CustomDayLogModal = ({
  onConfirm,
  onClose,
}: ModalComponentProps<{ operation: 'delete'; logId: string } | { operation: 'add' }>) => {
  const habits = useHabits()
  const { day } = useModalState<CustomDayLogModalProps>()
  const { id } = Router.query

  if (!day || !id) return null

  const logInThisDay = habits
    .find((habit) => habit.id === id)
    ?.habitLogs.find((log) => isSameDay(new Date(log.date), day))

  if (logInThisDay) {
    return (
      <>
        <div className='flex flex-col gap-2'>
          <h3 className='text-lg prose prose-lg flex gap-2 flex-row items-center'>
            Delete log in this day <IconTrashX />
          </h3>

          <p className='badge badge-outline px-3 py-4'>{longDateFormatter.format(day)}</p>
        </div>
        <div className='modal-action'>
          <button type='button' onClick={() => onClose()} className='btn btn-warning'>
            Close
          </button>
          <button
            type='button'
            onClick={() => {
              onConfirm({ operation: 'delete', logId: logInThisDay.id })
            }}
            className='btn btn-accent'>
            Confirm
          </button>
        </div>
      </>
    )
  }

  return (
    <>
      <div className='flex flex-col gap-2'>
        <h3 className='text-lg prose prose-lg flex gap-2 flex-row items-center'>
          Do you want add a log in this day? <IconSquareRoundedPlus />
        </h3>
        <p className='badge badge-outline px-3 py-4'>{longDateFormatter.format(day)}</p>
      </div>
      <div className='modal-action'>
        <button type='button' onClick={() => onClose()} className='btn btn-warning'>
          Close
        </button>
        <button
          type='button'
          onClick={() => {
            onConfirm({ operation: 'add' })
          }}
          className='btn btn-accent'>
          Confirm
        </button>
      </div>
    </>
  )
}
