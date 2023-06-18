import type { Habit } from '@prisma/client'
import { useState } from 'react'
import { useEffectOnceWhen } from 'rooks'

import { fetcher } from '@/utils/fetch'
import type { SuggestionListResult } from '@/app/api/habits/new/suggestions/list/route'
import { HabitCategoryIconBadge } from '@/components/habits/HabitCategoryIcon'
import type { ModalComponentProps } from '@/store/modal'

const fetchSuggestions = fetcher<SuggestionListResult>('/api/habits/new/suggestions/list')

export const HabitSuggestionsModal = ({
  onChangeState,
  onConfirm,
}: ModalComponentProps<{ habit: Habit }>) => {
  const [suggestions, setSuggestions] = useState<Habit[]>()

  const suggestionLoading = suggestions === undefined

  useEffectOnceWhen(() => {
    fetchSuggestions().then(({ suggestedHabits }) => {
      setSuggestions(suggestedHabits)
    })
  })

  const reloadSuggestions = () => {
    setSuggestions(undefined)
    fetchSuggestions().then(({ suggestedHabits }) => {
      setSuggestions(suggestedHabits)
    })
  }

  const onSuggestionClick = (suggestion: Habit) => {
    onChangeState({ habit: suggestion })
    onConfirm()
  }

  return (
    <div className='flex flex-col gap-6 w-full items-center justify-center'>
      <h2 className='text-2xl font-bold'>Suggestions</h2>

      {suggestionLoading && (
        <div className='flex flex-col items-center justify-center gap-10'>
          <div className='text-center'>
            <p>A list of suggested habits is loading</p>
            <p>This may take a few seconds...</p>
          </div>

          <div className='loading loading-lg loading-ring' />
        </div>
      )}

      <div className='flex flex-col gap-6 w-full items-center justify-center'>
        {suggestions?.map((suggestion) => (
          <div className='card w-full bg-accent-focus' key={suggestion.description}>
            <div className='card-body'>
              <h2 className='card-title flex flex-row flex-wrap justify-around'>
                <span>{suggestion.name}</span>
                <div className='flex'>
                  <div className='badge badge-secondary px-4 py-3'>{suggestion.frequency}</div>
                  <HabitCategoryIconBadge category={suggestion.habitCategory} compact />
                </div>
              </h2>
              <p className='italic text-sm text-balanced py-2'>{suggestion.description}</p>
              <div className='card-actions justify-end'>
                <button
                  type='button'
                  className='btn btn-sm'
                  onClick={() => onSuggestionClick(suggestion)}>
                  Select
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!suggestionLoading && (
        <div>
          <button type='button' className='btn btn-sm' onClick={reloadSuggestions}>
            Load more
          </button>
        </div>
      )}
    </div>
  )
}
