import type { Habit } from '@prisma/client'
import Router from 'next/router'

import { fetcher } from '@/utils/fetch'
import { reloadHabits } from '@/store/habits'
import { useObjectState } from '@/hooks/object'
import { startLoading, stopLoading } from '@/store/loading'
import { HabitForm } from '@/components/habits/form/HabitForm'
import type { PostHabitBody, PostHabitResult } from '@/app/api/habits/route'

import { NewHabitSuggestion } from '../components/NewHabitSuggestion'
import type { SuggestionState } from '../components/NewHabitSuggestion'

const postHabit = fetcher<PostHabitResult, never, PostHabitBody>('/api/habits', 'POST')

export const NewHabitPage = () => {
  const [habit, setHabit] = useObjectState<Habit>()
  const [suggestion, setSuggestion] = useObjectState<SuggestionState>()

  const onConfirm = async () => {
    if (!habit) return

    startLoading()

    await postHabit({ body: habit as Habit })

    await reloadHabits()

    stopLoading()

    await Router.push(`/habits`)
  }

  return (
    <div className='flex flex-col gap-6 h-screen items-center pt-4'>
      <h1 className='prose-2xl font-semibold'>Add a new habit to track</h1>

      {!suggestion.completed ? (
        <NewHabitSuggestion
          suggestion={suggestion}
          onHabitSuggested={setHabit}
          setSuggestion={setSuggestion}
        />
      ) : (
        <HabitForm
          habit={habit}
          setHabit={setHabit}
          onConfirm={onConfirm}
          onCancel={() => setSuggestion({ completed: false })}
        />
      )}
    </div>
  )
}
