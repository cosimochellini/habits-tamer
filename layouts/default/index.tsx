import Link from 'next/link'
import classNames from 'classnames'
import type { ReactNode } from 'react'
import { useRouter } from 'next/router'
import { IconListCheck, IconSettingsFilled, IconTarget } from '@tabler/icons-react'

import { useTheme } from '@/store/theme'

import { Navbar } from './Navbar'

const paths = [
  { name: 'overview', icon: <IconTarget />, path: '/' },
  { name: 'habits', icon: <IconListCheck />, path: '/habits' },
  { name: 'settings', icon: <IconSettingsFilled />, path: '/settings' },
] as const

export const DefaultLayout = ({ children }: { children: ReactNode }) => {
  useTheme()

  const router = useRouter()

  return (
    <>
      <Navbar />

      <div className='bg-gradient-to-t from-base to-base-100 pb-20 min-h-screen py-3 lg:py-6'>
        {children}
      </div>

      <div className='btm-nav bg-base-300 lg:btm-nav-lg'>
        {paths.map((path) => (
          <Link
            key={path.name}
            className={classNames('hover:text-accent', {
              'active text-content bg-transparent/40': router.pathname === path.path,
            })}
            href={path.path}>
            {path.icon}
            <span className='hidden md:block'>{path.name}</span>
          </Link>
        ))}
      </div>
    </>
  )
}
