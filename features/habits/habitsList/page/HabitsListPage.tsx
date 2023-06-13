import Link from 'next/link'
import { IconCirclePlus } from '@tabler/icons-react'
import { useState } from 'react'
import { useEffectOnceWhen } from 'rooks'

import { fetcher } from '@/utils/fetch'
import type { GetHabitsResult } from '@/app/api/habits/route'
import { HabitCard } from '@/features/habits/habitsList/components/HabitCard'

import classes from './HabitsListPage.module.scss'

const fetchHabits = fetcher<GetHabitsResult>('/api/habits')
export const HabitsListPage = () => {
  const [habits, setHabits] = useState<GetHabitsResult['habits']>()

  useEffectOnceWhen(() => {
    fetchHabits().then(({ habits }) => setHabits(habits))
  })

  return (
    <div className='h-screen flex flex-col gap-6'>
      <h1 className='prose-2xl font-semibold w-full text-center'>Your habits</h1>

      <div className='flex flex-col gap-6 w-full items-center'>
        <Link href='/habits/new' className='btn btn-accent'>
          Add a new habit <IconCirclePlus />
        </Link>

        <div className={`${classes.containerCustom} flex flex-col gap-3 px-2`}>
          {habits?.map((habit) => (
            <HabitCard habit={habit} key={habit.id} />
          ))}
        </div>
      </div>
    </div>
  )
}
