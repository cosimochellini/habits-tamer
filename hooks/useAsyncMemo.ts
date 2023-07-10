import type { DependencyList } from 'react'
import { useEffect, useState } from 'react'

export type AsyncMemoResult<T> = readonly [result: T | undefined, loaded: boolean]

export function useAsyncMemo<T>(
  callback: () => Promise<T>,
  initial: T | undefined = undefined,
  deps: DependencyList = [],
): AsyncMemoResult<T> {
  const [loaded, setLoaded] = useState(false)
  const [val, setVal] = useState<T | undefined>(initial)

  useEffect(() => {
    let cancel = false

    callback().then((val) => {
      if (cancel) return

      setVal(val)
      setLoaded(true)
    })

    return () => {
      cancel = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return [val, loaded]
}
