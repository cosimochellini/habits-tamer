import Link from 'next/link'
import { IconCirclePlus } from '@tabler/icons-react'

export const HabitsListPage = () => {
  return (
    <div className='h-screen flex flex-col gap-6'>
      <h1 className='prose-2xl font-semibold w-full text-center'>Your habits</h1>

      <div className='flex flex-col gap-6 w-full items-center'>
        <Link href='/habits/new' className='btn btn-accent'>
          Add a new habit <IconCirclePlus />
        </Link>
      </div>
    </div>
  )
}
