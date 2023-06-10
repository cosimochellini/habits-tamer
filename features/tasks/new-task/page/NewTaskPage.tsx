import { useState } from 'react'
import type { Habit } from '@prisma/client'
import { IconFidgetSpinner } from '@tabler/icons-react'

import { TaskCategorySelect } from '../components/TaskCategorySelect'
import { TaskFrequencySelect } from '../components/TaskFrquencySelect'

type SuggestionState = 'ready' | 'loading' | 'error' | 'success'
export const NewTaskPage = () => {
  const [suggestion, setSuggestion] = useState<SuggestionState>('ready')

  const [task, setTask] = useState<Partial<Habit>>({
    name: undefined,
    description: null,
    quantity: undefined,
    frequency: undefined,
    taskCategory: undefined,
  })

  const onAiClick = async () => {
    setSuggestion('loading')
    if (!task.name) return
    try {
      const res = await fetch(`/api/tasks/new/suggestion?task=${task.name}`)
      const data = (await res.json()) as { suggestedTask: Partial<Habit> }

      setTask(data.suggestedTask)
    } catch (e) {
      console.log(e)
    } finally {
      setSuggestion('success')
    }
  }

  return (
    <div className='flex flex-col gap-6 h-screen items-center pt-4'>
      <h1 className='prose-2xl font-semibold'>Add a new task</h1>
      <form
        className='flex flex-col gap-6 w-full items-center'
        onSubmit={(e) => {
          e.preventDefault()
          onAiClick()
        }}>
        <div className='flex flex-row gap-6 w-full items-center px-10'>
          <input
            type='text'
            name='name'
            value={task.name}
            onChange={(e) => setTask({ ...task, name: e.target.value })}
            placeholder='Enter the task name'
            className='input input-bordered input-accent w-full max-w-xs'
          />
          <button type='button' className='btn btn-accent' onClick={onAiClick}>
            AI {suggestion === 'loading' ? <IconFidgetSpinner className='animate-spin' /> : null}
          </button>
        </div>
        {suggestion === 'success' && (
          <>
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
          </>
        )}
      </form>
    </div>
  )
}
