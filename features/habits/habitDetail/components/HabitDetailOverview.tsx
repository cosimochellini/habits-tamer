import { relativeTime } from '@/utils/date'
import type { HabitResult } from '@/store/habits'
import { HabitCategoryIconBadge } from '@/components/habits/HabitCategoryIcon'

interface HabitDetailOverviewProps {
  habit: HabitResult
}
export const HabitDetailOverview = ({ habit }: HabitDetailOverviewProps) => (
  <div className='card bg-base-200 card-bordered'>
    <div className='card-body'>
      <h2 className='card-title text-balanced'>
        {habit.name}
        <HabitCategoryIconBadge category={habit.habitCategory} />
      </h2>
      <p className='py-3 text-balanced'>{habit.description}</p>
      <div className='card-actions justify-end'>
        <div className='badge badge-outline'>{relativeTime(habit.createdAt)}</div>
        <div className='badge badge-outline'>
          {habit.frequency} X {habit.quantity}
        </div>
      </div>
    </div>
  </div>
)
