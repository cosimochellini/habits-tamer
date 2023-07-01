import Head from 'next/head'
import { useRouter } from 'next/router'

import { HabitDetail } from '@/features/habits/habitDetail'
import { useHabits } from '@/store/habits'

const HabitDetailPage = () => {
  const router = useRouter()
  const habits = useHabits()

  const { id } = router.query

  const actualHabit = habits.find((h) => h.id === id)

  if (!actualHabit) return null

  return (
    <div>
      <Head>
        <title>Habits tamer - {actualHabit.name}</title>
      </Head>
      <HabitDetail habit={actualHabit} />
    </div>
  )
}
export default HabitDetailPage
