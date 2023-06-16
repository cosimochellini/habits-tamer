import { create } from 'zustand'
import { useEffectOnceWhen } from 'rooks'
import { persist } from 'zustand/middleware'

import { fetcher } from '@/utils/fetch'
import { useSSRSafeSelector } from '@/hooks/ssrStore'
import type { GetHabitsResult } from '@/app/api/habits/route'

export type HabitResult = GetHabitsResult['habits'][0]

interface State {
  habits: HabitResult[]
  initialized: boolean
}

const fetchHabits = fetcher<GetHabitsResult>('/api/habits')

const useStore = create(
  persist<State>(() => ({ habits: [], initialized: false }), {
    name: 'habits-storage',
    partialize: ({ habits }) => ({ habits } as State),
  }),
)

export const useHabits = () => {
  const store = useStore()
  const set = useStore.setState
  const { habits, initialized } = useSSRSafeSelector(store, { habits: [] })

  useEffectOnceWhen(() => {
    fetchHabits().then(({ habits }) => set({ habits, initialized: true }))
  }, !initialized)

  return habits
}

export const reloadHabits = () => {
  const set = useStore.setState

  return fetchHabits().then(({ habits }) => set({ habits, initialized: true }))
}
