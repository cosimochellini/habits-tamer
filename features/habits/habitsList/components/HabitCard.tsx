import Link from 'next/link'
import type { Habit } from '@prisma/client'

import { useModal } from '@/store/modal'
import { HabitCategoryIcon } from '@/components/habits/HabitCategoryIcon'
import { HabitFrequencyBadge } from '@/components/habits/HabitFrequencyBadge'
import { fetcher } from '@/utils/fetch'
import type { DeleteHabitResult } from '@/app/api/habits/[id]/route'
import { reloadHabits } from '@/store/habits'

interface HabitCardProps {
  habit: Habit
}

const deleteHabit = (id: string) => fetcher<DeleteHabitResult>(`/api/habits/${id}`, 'DELETE')()

const DeleteModal = () => {
  return (
    <div>
      <h3 className='font-bold text-lg'>Delete Habit</h3>
      <p className='py-4'>You are about to delete this habit, are you sure?</p>
    </div>
  )
}

export const HabitCard = ({ habit }: HabitCardProps) => {
  const openModal = useModal(DeleteModal)
  const onDeleteClick = async () => {
    const result = await openModal({ outsideClick: true, modalActions: true })

    if (result === 'cancel') return

    const { result: deleteResult } = await deleteHabit(habit.id)

    if (deleteResult.count > 0) await reloadHabits()
  }

  return (
    <div className='card w-full bg-primary text-primary-content'>
      <div className='card-body'>
        <h2 className='card-title'>
          {habit.name}
          <HabitCategoryIcon category={habit.habitCategory} />
        </h2>

        <p>{habit.description}</p>

        <div>
          <HabitFrequencyBadge habit={habit} />
        </div>

        <div className='card-actions justify-end'>
          <button type='button' className='btn btn-sm btn-accent' onClick={onDeleteClick}>
            Delete
          </button>
          <Link href='/' className='btn btn-sm btn-secondary'>
            Edit
          </Link>
        </div>
      </div>
    </div>
  )
}
