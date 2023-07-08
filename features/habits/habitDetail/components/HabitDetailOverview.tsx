import Link from 'next/link'
import { IconEdit } from '@tabler/icons-react'

import { relativeTime } from '@/utils/date'
import type { HabitResult } from '@/store/habits'
import { HabitCategoryIconBadge } from '@/components/habits/HabitCategoryIcon'

interface HabitDetailOverviewProps {
  habit: HabitResult
}
export const HabitDetailOverview = ({ habit }: HabitDetailOverviewProps) => (
  <div className='card bg-base-300 card-bordered'>
    <div className='card-body'>
      <h2 className='card-title text-balanced justify-between capitalize'>
        {habit.name}
        <HabitCategoryIconBadge compact category={habit.habitCategory} />
      </h2>
      <p className='py-3 text-balanced'>{habit.description}</p>
      <div className='card-actions justify-end'>
        <div className='badge badge-outline'>{relativeTime(habit.createdAt)}</div>
        <div className='badge badge-outline'>
          {habit.frequency} X {habit.quantity}
        </div>
      </div>
    </div>
    <div className='absolute -bottom-2 right-0'>
      <Link href={`/habits/${habit.id}/edit`} className='btn btn-primary btn-sm btn-circle w-14'>
        <IconEdit />
      </Link>
    </div>
  </div>
)
