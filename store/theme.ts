import { create } from 'zustand'
import { useEffectOnceWhen } from 'rooks'
import { persist } from 'zustand/middleware'

export const availableThemes = [
  'light',
  'dark',
  'cupcake',
  'bumblebee',
  'emerald',
  'corporate',
  'synthwave',
  'retro',
  'cyberpunk',
  'valentine',
  'halloween',
  'garden',
  'forest',
  'aqua',
  'lofi',
  'pastel',
  'fantasy',
  'wireframe',
  'black',
  'luxury',
  'dracula',
  'cmyk',
  'autumn',
  'business',
  'acid',
  'lemonade',
  'night',
  'coffee',
  'winter',
] as const

export type Theme = (typeof availableThemes)[number]

interface State {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const useStore = create(
  persist<State>(
    (set) => ({
      theme: 'dark',
      setTheme: (theme) => {
        set({ theme })
        updateTheme(theme)
      },
    }),
    {
      name: 'theme-storage',
    },
  ),
)

const updateTheme = (theme: Theme) => {
  document.body.setAttribute('data-theme', theme)
}

export const useTheme = () => {
  const store = useStore()

  useEffectOnceWhen(() => updateTheme(store.theme))

  return store
}
