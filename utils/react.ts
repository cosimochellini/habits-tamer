// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GenericFunction<T> = (arg: T) => any
type PreventableEvent = {
  preventDefault: () => void
}

export const prevent =
  <TEvent extends PreventableEvent, TFunction extends GenericFunction<TEvent>>(
    callback: TFunction,
  ) =>
  (e: TEvent) => {
    e.preventDefault()
    return callback(e)
  }
