import Link from 'next/link'
import { useRouter } from 'next/router'
import classNames from 'classnames'

import { paths } from '@/config/navbar'

export const Sidebar = () => {
  const router = useRouter()

  return (
    <aside className='w-56 h-screen transition-transform -translate-x-full sm:translate-x-0 hidden md:block'>
      <div className='h-full px-3 py-4 overflow-y-auto bg-base-200'>
        <ul className='space-y-2 font-medium'>
          {paths.map((path) => {
            const isActive = router.pathname === path.path
            return (
              <li key={path.name}>
                <Link
                  href={path.path}
                  className={classNames('flex items-center p-2 rounded-lg hover:bg-accent', {
                    'bg-accent/50': isActive,
                  })}>
                  {path.icon}

                  <span className='ml-3 capitalize'>{path.name}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </aside>
  )
}
