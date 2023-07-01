import Head from 'next/head'

import { HabitsListPage } from '@/features/habits/habitsList/page/HabitsListPage'

const HabitsList = () => {
  return (
    <div>
      <Head>
        <title>Habits tamer - menage your habits</title>
      </Head>
      <HabitsListPage />
    </div>
  )
}

export default HabitsList
