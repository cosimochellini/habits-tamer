import { useHabits } from '@/store/habits'

import { HabitOverview } from '../components/HabitOverview'

import classes from './OverviewPage.module.scss'

export const OverviewPage = () => {
  const habits = useHabits()

  return (
    <div className='h-screen flex flex-col gap-2 w-full'>
      <h1 className='prose-2xl font-semibold w-full text-center'>Your habits</h1>

      <div className={`grid grid-cols-2 gap-4 w-full px-4 ${classes.container}`}>
        {habits.map((habit) => (
          <HabitOverview habit={habit} key={habit.id} />
        ))}
      </div>
    </div>
  )
}
