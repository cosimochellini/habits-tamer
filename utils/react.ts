// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GenericFunction<T> = (arg: T) => any
type PreventableEvent = {
  preventDefault: () => void
}
type StopPropagation = {
  stopPropagation: () => void
}

export const prevent =
  <TEvent extends PreventableEvent, TFunction extends GenericFunction<TEvent>>(
    callback: TFunction,
  ) =>
  (e: TEvent) => {
    e.preventDefault()
    return callback(e)
  }

export const stopPropagation =
  <TEvent extends StopPropagation, TFunction extends GenericFunction<TEvent>>(
    callback: TFunction,
  ) =>
  (e: TEvent) => {
    e.stopPropagation()
    return callback(e)
  }
