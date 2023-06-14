import type { Theme } from '@/store/theme'
import { capitalize } from '@/utils/string'
import { availableThemes, useTheme } from '@/store/theme'

export const SettingsPage = () => {
  const { theme, setTheme } = useTheme()

  return (
    <div className='w-full h-screen flex flex-col gap-4 py-3'>
      <div className='card card-bordered bg-base-200 p-4 rounded-md'>
        <div className='card-body'>
          <h2 className='card-title'>Settings</h2>
          <div>
            <h3 className='text-lg'>Theme</h3>

            <select
              className='select select-accent w-full max-w-xs'
              value={theme}
              onChange={(e) => setTheme(e.target.value as Theme)}>
              {availableThemes.map((t) => (
                <option key={t} value={t}>
                  {capitalize(t)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}
