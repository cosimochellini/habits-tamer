import type { HabitResult } from '@/store/habits'
import { HabitCategoryIconBadge } from '@/components/habits/HabitCategoryIcon'

interface HabitOverviewProps {
  habit: HabitResult
}
export const HabitOverview = ({ habit }: HabitOverviewProps) => {
  const percentage = Math.random() * 100

  return (
    <div className='card bg-secondary/80 w-full h-full aspect-square'>
      <div className='card-body'>
        <div className='flex gap-2 flex-col items-center'>
          <div className='text-center m-auto'>{habit.name}</div>
          <HabitCategoryIconBadge category={habit.habitCategory} />
        </div>
        <div className='text-center'>{percentage.toFixed(0)}%</div>
      </div>
    </div>
  )
}
