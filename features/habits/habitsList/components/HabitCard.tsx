import type { Habit } from '@prisma/client'
import Link from 'next/link'

import { HabitCategoryIcon } from '@/components/habits/HabitCategoryIcon'
import { HabitFrequencyBadge } from '@/components/habits/HabitFrequencyBadge'

interface HabitCardProps {
  habit: Habit
}

export const HabitCard = ({ habit }: HabitCardProps) => {
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
          <button type='button' className='btn btn-sm btn-accent'>
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
