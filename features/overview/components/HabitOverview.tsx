import type { HabitResult } from '@/store/habits'
import { HabitCategoryIcon } from '@/components/habits/HabitCategoryIcon'

interface HabitOverviewProps {
  habit: HabitResult
}
export const HabitOverview = ({ habit }: HabitOverviewProps) => {
  const percentage = Math.random() * 100

  return (
    <div className='card rounded-2xl bg-accent w-full h-full aspect-square'>
      <div className='card-body'>
        <div>
          <HabitCategoryIcon category={habit.habitCategory} className='text-center m-auto' />
          <div className='text-center m-auto'>{habit.name}</div>
        </div>
        <div className='text-center'>{percentage.toFixed(0)}%</div>
      </div>
    </div>
  )
}
