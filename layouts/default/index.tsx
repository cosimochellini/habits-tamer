import type { ReactNode } from 'react'
import { IconCirclePlus, IconListCheck, IconSettingsFilled } from '@tabler/icons-react'
import { useRouter } from 'next/router'
import classNames from 'classnames'

import { Navbar } from './Navbar'

const paths = [
  { name: 'overview', icon: <IconListCheck />, path: '/' },
  { name: 'habits', icon: <IconCirclePlus />, path: '/habits' },
  { name: 'settings', icon: <IconSettingsFilled />, path: '/settings' },
]

export const DefaultLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter()

  const onButtonClick = async (path: string) => {
    await router.push(path)
  }

  return (
    <>
      <Navbar />

      {children}

      <div className='btm-nav'>
        {paths.map((path) => (
          <button
            type='button'
            key={path.name}
            className={classNames({ 'active text-secondary': router.pathname === path.path })}
            onClick={() => onButtonClick(path.path)}>
            {path.icon}
          </button>
        ))}
      </div>
    </>
  )
}
