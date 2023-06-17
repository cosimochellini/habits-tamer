import Link from 'next/link'
import { IconCirclePlus } from '@tabler/icons-react'

import { useHabits } from '@/store/habits'

import { HabitCard } from '../components/HabitCard'

import classes from './HabitsListPage.module.scss'

export const HabitsListPage = () => {
  const habits = useHabits()

  return (
    <div className='flex flex-col gap-6'>
      <h1 className='prose-2xl font-semibold w-full text-center'>Your habits</h1>

      <div className='flex flex-col gap-6 w-full items-center'>
        <Link href='/habits/new' className='btn btn-accent' prefetch>
          Add a new habit <IconCirclePlus />
        </Link>

        <div className={`${classes.containerCustom} flex flex-col gap-4 px-2`}>
          {habits?.map((habit) => (
            <HabitCard habit={habit} key={habit.id} />
          ))}
        </div>
      </div>
    </div>
  )
}
