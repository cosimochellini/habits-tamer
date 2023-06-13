import type { Habit } from '@prisma/client'
import Link from 'next/link'

import { HabitCategoryIcon } from '@/components/habits/HabitCategoryIcon'
import { formatFrequency } from '@/utils/enum'

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
          {habit.quantity} {habit.quantity === 1 ? 'time' : 'times'} per{' '}
          {formatFrequency(habit.frequency)}
        </div>

        <div className='card-actions justify-end'>
          <Link href='/' className='btn'>
            Buy Now
          </Link>
        </div>
      </div>
    </div>
  )
}
