import type { ReactNode } from 'react'
import { IconCirclePlus, IconListCheck, IconSettingsFilled } from '@tabler/icons-react'
import { useRouter } from 'next/router'
import classNames from 'classnames'

import { useTheme } from '@/store/theme'

import { Navbar } from './Navbar'

const paths = [
  { name: 'overview', icon: <IconListCheck />, path: '/' },
  { name: 'habits', icon: <IconCirclePlus />, path: '/habits' },
  { name: 'settings', icon: <IconSettingsFilled />, path: '/settings' },
]

export const DefaultLayout = ({ children }: { children: ReactNode }) => {
  useTheme()

  const router = useRouter()

  const onButtonClick = router.push

  return (
    <>
      <Navbar />

      <div className='bg-base'>{children}</div>

      <div className='btm-nav bg-base-300'>
        {paths.map((path) => (
          <button
            type='button'
            key={path.name}
            className={classNames({
              'active text-secondary bg-base-200': router.pathname === path.path,
            })}
            onClick={() => onButtonClick(path.path)}>
            {path.icon}
          </button>
        ))}
      </div>
    </>
  )
}
