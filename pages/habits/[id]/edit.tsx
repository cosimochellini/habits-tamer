import Head from 'next/head'

import { useCurrentHabit } from '@/hooks/habits/currentHabit'
import { EditHabitDetail } from '@/features/habits/editHabit/EditHabit'

const EditHabitDetailPage = () => {
  const actualHabit = useCurrentHabit()

  if (!actualHabit) return null

  return (
    <div>
      <Head>
        <title>Habits tamer - {actualHabit.name}</title>
      </Head>
      <EditHabitDetail habit={actualHabit} />
    </div>
  )
}

export default EditHabitDetailPage
