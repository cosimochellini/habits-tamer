import { useSession } from 'next-auth/react'

export const Navbar = () => {
  const { data } = useSession()

  const initials = data?.user?.name
    ?.split(' ')
    .map(([n]) => n.toUpperCase())
    .join('')

  return (
    <div className='navbar bg-base-100'>
      <div className='navbar-start' />
      <div className='navbar-center'>
        <a className='btn btn-ghost normal-case text-xl'>Task Tamer</a>
      </div>
      <div className='navbar-end'>
        <div className='avatar placeholder'>
          <div className='bg-secondary-focus text-primary rounded-full w-10 ring ring-primary ring-offset-base-100 ring-offset-2'>
            <span className={'text-xl'}>{initials} </span>
          </div>
        </div>
      </div>
    </div>
  )
}
