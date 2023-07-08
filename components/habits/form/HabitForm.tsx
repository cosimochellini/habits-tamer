import type { ZodError } from 'zod'
import { useMemo, useState } from 'react'
import type { Habit } from '@prisma/client'
import { IconAlertTriangle, IconDeviceFloppy } from '@tabler/icons-react'

import { prevent } from '@/utils/react'
import { formatFrequency } from '@/utils/enum'
import { habitSchema } from '@/schemas/habit'

import { HabitFrequencySelect } from './HabitFrquencySelect'
import { HabitCategorySelect } from './HabitCategorySelect'

interface HabitFormProps {
  habit: Partial<Habit>
  setHabit: (h: Partial<Habit>) => void
  onConfirm: () => void
  onCancel: () => void
}

export const HabitForm = ({ habit, setHabit, onConfirm, onCancel }: HabitFormProps) => {
  const [error, setError] = useState<ZodError<typeof habitSchema>>()

  const errorMessage = useMemo(() => {
    const formError = error?.issues.at(0)
    if (!formError) return null
    return `The field ${formError?.path.at(-1)} is invalid, ${formError?.message}`
  }, [error])

  const onFormSubmit = async () => {
    const result = await habitSchema.safeParseAsync(habit)

    if (!result.success) {
      setError(result.error)
      return
    }

    onConfirm()
  }

  return (
    <form
      className='flex flex-col gap-3 w-full items-center h-full'
      onSubmit={prevent(onFormSubmit)}>
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

      <HabitFrequencySelect onChange={(f) => setHabit({ frequency: f })} value={habit.frequency} />

      <div className='form-control w-full max-w-xs'>
        <label htmlFor='frequency' className='label'>
          <span className='label-text'>How many times per {formatFrequency(habit.frequency)}</span>
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

      {errorMessage && (
        <div className='form-control w-full max-w-xs'>
          <div className='alert alert-warning'>
            <span>{errorMessage}</span>
          </div>
        </div>
      )}

      <div className='form-control flex flex-row justify-around w-full max-w-xs'>
        <button type='button' className='btn btn-warning' onClick={onCancel}>
          Cancel <IconAlertTriangle />
        </button>
        <button type='submit' className='btn btn-accent'>
          Save <IconDeviceFloppy />
        </button>
      </div>
    </form>
  )
}
