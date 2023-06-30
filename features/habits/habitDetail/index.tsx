import { useRouter } from 'next/router'

import { useHabits } from '@/store/habits'
import { HabitDetailOverview } from '@/features/habits/habitDetail/components/HabitDetailOverview'

export const HabitDetail = () => {
  const router = useRouter()
  const habits = useHabits()

  const { id } = router.query

  const actualHabit = habits.find((h) => h.id === id)

  if (!actualHabit) return null

  return (
    <div>
      <HabitDetailOverview habit={actualHabit} />
    </div>
  )
}
