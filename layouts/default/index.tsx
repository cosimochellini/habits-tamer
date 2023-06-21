import Link from 'next/link'
import classNames from 'classnames'
import type { ReactNode } from 'react'
import { useRouter } from 'next/router'

import { useTheme } from '@/store/theme'
import { Sidebar } from '@/layouts/default/component/Sidebar'
import { paths } from '@/config/navbar'

import { Navbar } from './Navbar'

export const DefaultLayout = ({ children }: { children: ReactNode }) => {
  useTheme()

  const router = useRouter()

  return (
    <>
      <Navbar />
      <div className='md:flex md:flex-row'>
        <Sidebar />

        <div className='bg-gradient-to-t from-base to-base-100 pb-20 min-h-screen h-full py-3 lg:py-6 flex-1 md:mx-8 lg:mx-16 xl:mx-24'>
          {children}
        </div>
      </div>

      <div className='btm-nav bg-base-300 lg:btm-nav-lg md:hidden'>
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
