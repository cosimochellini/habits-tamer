import { useSession } from 'next-auth/react'
import Link from 'next/link'

const initials = (name: string | undefined | null) =>
  name
    ?.split(' ')
    .map(([n]) => n.toUpperCase())
    .join('')

export const Navbar = () => {
  const { data } = useSession()

  return (
    <div className='navbar bg-base-200 md:border border-b-base-content'>
      <div className='navbar-start hidden md:block'>
        <Link href='/' className='btn btn-ghost normal-case text-xl'>
          Habit Tamer
        </Link>
      </div>
      <div className='navbar-center block md:hidden'>
        <Link href='/' className='btn btn-ghost normal-case text-xl'>
          Habit Tamer
        </Link>
      </div>
      <div className='navbar-end'>
        <div className='avatar placeholder'>
          <div className='bg-primary/30 text-primary w-10 ring ring-primary ring-offset-base-100 ring-offset-2 rounded-full'>
            <span className='text-xl'>{initials(data?.user?.name)} </span>
          </div>
        </div>
      </div>
    </div>
  )
}
