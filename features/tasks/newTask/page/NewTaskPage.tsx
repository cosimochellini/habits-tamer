import type { Habit } from '@prisma/client'
import { IconArrowNarrowRight, IconLoader } from '@tabler/icons-react'

import { useObjectState } from '@/hooks/object'

import { TaskCategorySelect } from '../components/TaskCategorySelect'
import { TaskFrequencySelect } from '../components/TaskFrquencySelect'
import { logger } from '@/istances/logger'

const fetchSuggestion = async (task: string) => {
  const res = await fetch(`/api/tasks/new/suggestion?${new URLSearchParams({ task })}`)
  return (await res.json()) as { suggestedTask: Habit }
}

export const NewTaskPage = () => {
  const [suggestion, setSuggestion] = useObjectState({
    loading: false,
    completed: false,
    name: '',
  })

  const [task, setTask] = useObjectState<Habit>()

  const onAiClick = async () => {
    if (!suggestion.name) return

    setSuggestion({ loading: true })

    const { suggestedTask } = (await fetchSuggestion(suggestion.name).catch(logger.log)) ?? {}

    if (!suggestedTask) return

    setTask(suggestedTask)
    setSuggestion({ loading: false, completed: true })
  }

  return (
    <div className='flex flex-col gap-6 h-screen items-center pt-4'>
      <h1 className='prose-2xl font-semibold'>Add a new habit to track</h1>

      {!suggestion.completed ? (
        <form
          className='flex flex-col gap-6 w-full items-center h-full'
          onSubmit={(e) => {
            e.preventDefault()
            onAiClick()
          }}>
          <div className='flex flex-col gap-6 w-full items-center justify-center px-10'>
            <input
              type='text'
              name='taskDescription'
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
        <form className='flex flex-col gap-6 w-full items-center h-full'>
          <input
            type='text'
            name='name'
            value={task.name}
            onChange={(e) => setTask({ ...task, name: e.target.value })}
            placeholder='Enter the task name'
            className='input input-bordered input-accent w-full max-w-xs'
          />

          <TaskCategorySelect
            onChange={(c) => setTask({ ...task, taskCategory: c })}
            value={task.taskCategory}
          />

          <input
            type='text'
            name='description'
            placeholder='Enter the task description'
            value={task.description ?? undefined}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
            className='input input-bordered input-accent w-full max-w-xs'
          />

          <TaskFrequencySelect
            onChange={(f) => setTask({ ...task, frequency: f })}
            value={task.frequency}
          />

          <input
            type='number'
            name='frequency'
            value={task.quantity}
            onChange={(e) => setTask({ ...task, quantity: Number(e.target.value) })}
            placeholder='Enter the task frequency'
            className='input input-bordered input-accent w-full max-w-xs'
          />

          <div className='flex flex-row-reverse items-end gap-6'>
            <button type='button' className='btn btn-accent'>
              Cancel
            </button>
            <button type='submit' className='btn btn-accent'>
              Add task
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
