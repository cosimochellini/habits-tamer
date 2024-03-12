import { IconUser } from '@tabler/icons-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

const initials = (name: string | undefined | null) =>
  name
    ?.split(' ')
    .map(([n]) => n?.toUpperCase())
    .join('')

export const Navbar = () => {
  const { data } = useSession()

  const avatarInitials = initials(data?.user?.name)

  return (
    <div className='navbar bg-base-200 md:border border-b-base-content'>
      <div className='navbar-start hidden md:block'>
        <Link href='/' className='btn btn-ghost normal-case text-xl'>
          Habits Tamer
        </Link>
      </div>
      <div className='navbar-center block md:hidden'>
        <Link href='/' className='btn btn-ghost normal-case text-xl'>
          Habits Tamer
        </Link>
      </div>
      <div className='navbar-end'>
        <div className='avatar placeholder'>
          <div className='bg-primary/30 text-primary w-10 ring ring-primary ring-offset-base-100 ring-offset-2 rounded-full'>
            <Link href='/settings' className='text-xl'>
              {avatarInitials ?? <IconUser />}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
