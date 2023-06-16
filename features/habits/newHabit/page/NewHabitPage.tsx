import type { Habit } from '@prisma/client'
import {
  IconAlertTriangle,
  IconArrowNarrowRight,
  IconCirclePlus,
  IconLoader,
} from '@tabler/icons-react'
import Router from 'next/router'

import { prevent } from '@/utils/react'
import { fetcher } from '@/utils/fetch'
import { useObjectState } from '@/hooks/object'
import { startLoading, stopLoading } from '@/store/loading'
import type { PostHabitBody, PostHabitResult } from '@/app/api/habits/route'
import type { SuggestionQuery, SuggestionResult } from '@/app/api/habits/new/suggestions/route'

import { HabitFrequencySelect } from '../components/HabitFrquencySelect'
import { HabitCategorySelect } from '../components/HabitCategorySelect'
import { reloadHabits } from '@/store/habits'

const fetchSuggestions = fetcher<SuggestionResult, SuggestionQuery>('/api/habits/new/suggestions')

const postHabit = fetcher<PostHabitResult, never, PostHabitBody>('/api/habits', 'POST')

export const NewHabitPage = () => {
  const [suggestion, setSuggestion] = useObjectState({
    loading: false,
    completed: false,
    name: '',
  })

  const [habit, setHabit] = useObjectState<Habit>()

  const onAiClick = async () => {
    if (!suggestion.name) return

    setSuggestion({ loading: true })

    const { suggestedHabit } = await fetchSuggestions({
      query: { habit: suggestion.name },
    })

    if (!suggestedHabit) return

    setHabit(suggestedHabit)
    setSuggestion({ loading: false, completed: true })
  }

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
        <form
          className='flex flex-col gap-6 w-full items-center h-full'
          onSubmit={prevent(onAiClick)}>
          <div className='flex flex-col gap-6 w-full items-center justify-center px-10'>
            <input
              type='text'
              name='habitDescription'
              value={suggestion.name}
              onChange={(e) => setSuggestion({ name: e.target.value })}
              placeholder='eg. "Eat healthy four times a week"'
              className='input input-bordered input-accent w-full max-w-xs'
            />
            <button type='button' className='btn btn-accent w-full' onClick={onAiClick}>
              Next
              {suggestion.loading ? (
                <IconLoader className='animate-spin' />
              ) : (
                <IconArrowNarrowRight />
              )}
            </button>
          </div>
        </form>
      ) : (
        <form
          className='flex flex-col gap-6 w-full items-center h-full'
          onSubmit={prevent(onConfirm)}>
          <input
            type='text'
            name='name'
            value={habit.name}
            onChange={(e) => setHabit({ name: e.target.value })}
            placeholder='Enter the habit name'
            className='input input-bordered input-accent w-full max-w-xs'
          />

          <HabitCategorySelect
            onChange={(c) => setHabit({ habitCategory: c })}
            value={habit.habitCategory}
          />

          <input
            type='text'
            name='description'
            placeholder='Enter the habit description'
            value={habit.description ?? undefined}
            onChange={(e) => setHabit({ description: e.target.value })}
            className='input input-bordered input-accent w-full max-w-xs'
          />

          <HabitFrequencySelect
            onChange={(f) => setHabit({ frequency: f })}
            value={habit.frequency}
          />

          <input
            type='number'
            name='frequency'
            value={habit.quantity}
            onChange={(e) => setHabit({ quantity: Number(e.target.value) })}
            placeholder='Enter the habit frequency'
            className='input input-bordered input-accent w-full max-w-xs'
          />

          <div className='flex flex-row items-stretch gap-10'>
            <button
              type='button'
              className='btn btn-warning'
              onClick={() => setSuggestion({ completed: false })}>
              Cancel <IconAlertTriangle />
            </button>
            <button type='submit' className='btn btn-accent'>
              Add habit <IconCirclePlus />
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
