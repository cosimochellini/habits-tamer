import { useRouter } from 'next/router'

import { useHabits } from '@/store/habits'

export const useCurrentHabit = () => {
  const router = useRouter()
  const habits = useHabits()

  const { id } = router.query

  return habits.find((h) => h.id === id)
}
