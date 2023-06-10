// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DebouncedFunc<T extends (...args: any[]) => any> = (...args: Parameters<T>) => void

type Timeout = ReturnType<typeof setTimeout>

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait = 50,
): DebouncedFunc<T> => {
  let timeout: Timeout | null

  return (...args: Parameters<T>) => {
    const later = () => {
      timeout = null
      func(...args)
    }

    clearTimeout(timeout as Timeout)
    timeout = setTimeout(later, wait)
  }
}
