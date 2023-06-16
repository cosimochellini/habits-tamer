import type { Habit } from '@prisma/client'

interface HabitCardProps {
  habit: Habit
}
export const HabitFrequencyBadge = ({ habit }: HabitCardProps) => (
  <div className='badge badge-secondary px-4 py-3 gap-1'>
    <span>{habit.frequency}</span>
    <span>x</span>
    <span>{habit.quantity} </span>
  </div>
)
