import { useRouter } from 'next/router'

import { useHabits } from '@/store/habits'
import { HabitDetailOverview } from '@/features/habits/habitDetail/components/HabitDetailOverview'
import { HabitLogsOverview } from '@/features/habits/habitDetail/components/HabitLogsOverview'

export const HabitDetail = () => {
  const router = useRouter()
  const habits = useHabits()

  const { id } = router.query

  const actualHabit = habits.find((h) => h.id === id)

  if (!actualHabit) return null

  return (
    <div className='flex flex-col gap-4'>
      <HabitDetailOverview habit={actualHabit} />
      <HabitLogsOverview habit={actualHabit} />
    </div>
  )
}
