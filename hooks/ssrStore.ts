import { useState } from 'react'
import { useEffectOnceWhen } from 'rooks'

export const useSSRSafeSelector = <TData>(state: TData, ssrState: Partial<TData>) => {
  const [initialized, setInitialized] = useState(false)

  useEffectOnceWhen(() => setInitialized(true))

  return initialized ? state : { ...state, ...ssrState }
}
