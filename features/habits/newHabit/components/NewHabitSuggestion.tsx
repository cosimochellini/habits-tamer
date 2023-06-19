import type { Habit } from '@prisma/client'
import { IconArrowNarrowRight, IconLoader } from '@tabler/icons-react'

import { prevent } from '@/utils/react'
import { fetcher } from '@/utils/fetch'
import type { SuggestionQuery, SuggestionResult } from '@/app/api/habits/new/suggestions/route'
import { useModal } from '@/store/modal'
import { HabitSuggestionsModal } from '@/features/habits/newHabit/components/HabitSuggestionsModal'

const fetchSuggestions = fetcher<SuggestionResult, SuggestionQuery>('/api/habits/new/suggestions')

export interface SuggestionState {
  loading: boolean
  completed: boolean
  name: string
}

interface NewHabitSuggestionProps {
  onHabitSuggested: (habit: Habit) => void
  suggestion: Partial<SuggestionState>
  setSuggestion: (suggestion: Partial<SuggestionState>) => void
}
export const NewHabitSuggestion = ({
  onHabitSuggested,
  suggestion,
  setSuggestion,
}: NewHabitSuggestionProps) => {
  const openModal = useModal(HabitSuggestionsModal)

  const onSuggestionSelected = (habit: Habit) => {
    onHabitSuggested(habit)
    setSuggestion({ loading: false, completed: true })
  }

  const onAiClick = async () => {
    if (!suggestion.name) return

    setSuggestion({ loading: true })

    const { suggestedHabit } = await fetchSuggestions({
      query: { habit: suggestion.name },
    })

    if (!suggestedHabit) return

    onSuggestionSelected(suggestedHabit)
  }

  const onSuggestionClick = async () => {
    const result = await openModal({ outsideClick: true })

    if (result.reason === 'cancel') return

    if (result.data) onSuggestionSelected(result.data.habit)
  }

  return (
    <form className='flex flex-col gap-6 w-full items-center h-full' onSubmit={prevent(onAiClick)}>
      <div className='flex flex-col gap-6 w-full items-center justify-center px-10'>
        <input
          type='text'
          name='habitDescription'
          value={suggestion.name}
          onChange={(e) => setSuggestion({ name: e.target.value })}
          placeholder='eg. "Eat healthy four times a week"'
          className='input input-bordered input-accent w-full max-w-xs'
        />
        <button type='submit' className='btn btn-accent w-full'>
          Next
          {suggestion.loading ? <IconLoader className='animate-spin' /> : <IconArrowNarrowRight />}
        </button>
        <button type='button' className='link' onClick={onSuggestionClick}>
          Need some suggestions?
        </button>
      </div>
    </form>
  )
}
