import { useRouter } from 'next/router'
import { useHabits } from '@/store/habits'

const HabitDetail = () => {
  const router = useRouter()
  const habits = useHabits()

  const { id } = router.query

  const actualHabit = habits.find((h) => h.id === id)
  return (
    <div>
      <h1>HabitDetail</h1>
      <p>{id}</p>
      <code>{JSON.stringify(actualHabit, null, 2)}</code>
    </div>
  )
}

export default HabitDetail
