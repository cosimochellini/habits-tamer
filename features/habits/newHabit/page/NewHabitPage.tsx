import type { Habit } from '@prisma/client'
import { IconAlertTriangle, IconCirclePlus } from '@tabler/icons-react'
import Router from 'next/router'

import { prevent } from '@/utils/react'
import { fetcher } from '@/utils/fetch'
import { useObjectState } from '@/hooks/object'
import { startLoading, stopLoading } from '@/store/loading'
import type { PostHabitBody, PostHabitResult } from '@/app/api/habits/route'
import { reloadHabits } from '@/store/habits'
import { formatFrequency } from '@/utils/enum'

import type { SuggestionState } from '../components/NewHabitSuggestion'
import { NewHabitSuggestion } from '../components/NewHabitSuggestion'
import { HabitFrequencySelect } from '../components/HabitFrquencySelect'
import { HabitCategorySelect } from '../components/HabitCategorySelect'

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
        <form
          className='flex flex-col gap-3 w-full items-center h-full'
          onSubmit={prevent(onConfirm)}>
          <div className='form-control w-full max-w-xs'>
            <label htmlFor='name' className='label'>
              <span className='label-text'>Name</span>
            </label>
            <input
              id='name'
              type='text'
              name='name'
              value={habit.name}
              onChange={(e) => setHabit({ name: e.target.value })}
              placeholder='Enter the habit name'
              className='input input-bordered input-accent w-full'
            />
          </div>

          <HabitCategorySelect
            onChange={(c) => setHabit({ habitCategory: c })}
            value={habit.habitCategory}
          />

          <div className='form-control w-full max-w-xs'>
            <label htmlFor='description' className='label'>
              <span className='label-text'>Description</span>
            </label>

            <textarea
              id='description'
              name='description'
              placeholder='Enter the habit description'
              value={habit.description ?? undefined}
              onChange={(e) => setHabit({ description: e.target.value })}
              className='textarea textarea-bordered textarea-accent w-full'
            />
          </div>

          <HabitFrequencySelect
            onChange={(f) => setHabit({ frequency: f })}
            value={habit.frequency}
          />
          <div className='form-control w-full max-w-xs'>
            <label htmlFor='frequency' className='label'>
              <span className='label-text'>
                How many times per {formatFrequency(habit.frequency)}
              </span>
            </label>

            <input
              type='number'
              name='frequency'
              value={habit.quantity}
              onChange={(e) => setHabit({ quantity: Number(e.target.value) })}
              placeholder='Enter the habit frequency'
              className='input input-bordered input-accent w-full'
            />
          </div>

          <div className='form-control flex flex-row justify-around w-full max-w-xs'>
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
