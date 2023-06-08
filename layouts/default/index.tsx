import { ReactNode } from 'react'
import { IconCirclePlus, IconListCheck, IconSettingsFilled } from '@tabler/icons-react'
import { Navbar } from './Navbar'
import { useRouter } from 'next/router'
import classNames from 'classnames'

const paths = [
  { name: 'overview', icon: <IconListCheck />, path: '/' },
  { name: 'tasks', icon: <IconCirclePlus />, path: '/tasks' },
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
            key={path.name}
            className={classNames({ active: router.pathname === path.path })}
            onClick={() => onButtonClick(path.path)}>
            {path.icon}
          </button>
        ))}
      </div>
    </>
  )
}