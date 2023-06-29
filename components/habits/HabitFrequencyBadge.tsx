import type { Habit } from '@prisma/client'
import { IconCalendar } from '@tabler/icons-react'

interface HabitCardProps {
  habit: Habit
  icon?: boolean
}
export const HabitFrequencyBadge = ({ habit, icon }: HabitCardProps) => (
  <div className='badge badge-secondary px-4 py-3 gap-1'>
    {icon && <IconCalendar />}

    <div className='flex gap-1'>
      <span>{habit.frequency}</span>
      <span>x</span>
      <span>{habit.quantity} </span>
    </div>
  </div>
)
