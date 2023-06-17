import { useSession } from 'next-auth/react'
import { byString } from 'sort-es'

import { fetcher } from '@/utils/fetch'
import packageJson from '@/package.json'
import type { Theme } from '@/store/theme'
import { capitalize } from '@/utils/string'
import { useObjectState } from '@/hooks/object'
import { availableThemes, useTheme } from '@/store/theme'
import type { PatchUserBody, PatchUserResult } from '@/app/api/users/route'

import classes from './SettingsPage.module.scss'

const patchUser = fetcher<PatchUserResult, never, PatchUserBody>('/api/users', 'PATCH')

export const SettingsPage = () => {
  const { theme, setTheme } = useTheme()
  const [updatedInfos, setUpdatedInfos] = useObjectState({
    name: undefined as string | undefined,
    email: undefined as string | undefined,
  })

  const { data: session, update } = useSession()

  const saveInfos = async () => {
    await patchUser({ body: updatedInfos })
    await update(updatedInfos)
  }

  return (
    <div className='w-full flex flex-col gap-4'>
      <h1 className='prose-2xl font-semibold text-center'>Settings</h1>

      <div className={`flex flex-col gap-4 px-2 ${classes.container}`}>
        <div className='card card-bordered bg-base-200 p-4 rounded-xl'>
          <div className='card-body'>
            <h2 className='card-title'>Appearance</h2>
            <div>
              <h3 className='text-lg'>Theme</h3>

              <select
                className='select select-accent w-full max-w-xs'
                value={theme}
                onChange={(e) => setTheme(e.target.value as Theme)}>
                {availableThemes
                  .concat()
                  .sort(byString())
                  .map((t) => (
                    <option key={t} value={t}>
                      {capitalize(t)}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </div>

        <div className='card card-bordered bg-base-200 p-4 rounded-xl'>
          <div className='card-body'>
            <h2 className='card-title'>User information</h2>
            <div>
              <div className='flex flex-col gap-2'>
                <input
                  type='text'
                  placeholder={session?.user?.name ?? undefined}
                  value={updatedInfos.name ?? session?.user?.name ?? undefined}
                  onChange={(e) => setUpdatedInfos({ name: e.target.value })}
                  className='input input-bordered input-primary w-full max-w-xs'
                />

                <input
                  type='email'
                  value={session?.user?.email ?? undefined}
                  placeholder={updatedInfos.email ?? session?.user?.email ?? undefined}
                  onChange={(e) => setUpdatedInfos({ email: e.target.value })}
                  className='input input-bordered input-primary w-full max-w-xs'
                />
              </div>
            </div>
            <div className='card-actions justify-end'>
              <button type='button' className='btn btn-accent' onClick={saveInfos}>
                Save
              </button>
            </div>
          </div>
        </div>

        <div className='card card-bordered bg-base-200 p-4 rounded-xl'>
          <div className='card-body'>
            <h2 className='card-title'>App settings</h2>
            <div>
              <div className='flex flex-col gap-2'>
                {session?.expires && (
                  <input
                    type='text'
                    disabled
                    value={`Expires: ${new Date(session?.expires).toDateString()}`}
                    className='input input-bordered w-full max-w-xs'
                  />
                )}
                <kbd className='kbd kbd-md'>{`Version: ${packageJson.version}`}</kbd>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
