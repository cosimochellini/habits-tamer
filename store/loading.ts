import { create } from 'zustand'

interface State {
  loaders: number
  start(): void
  stop(): void
}

const useStore = create<State>((set) => ({
  loaders: 0,
  start: () => set((s) => ({ loaders: s.loaders + 1 })),
  stop: () => set((s) => ({ loaders: s.loaders - 1 })),
}))

export const useLoading = () => {
  const loaders = useStore((x) => x.loaders)

  return loaders > 0
}

export const startLoading = () => {
  useStore.getState().start()
}

export const stopLoading = () => {
  useStore.getState().stop()
}
