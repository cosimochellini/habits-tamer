import { useModalState } from '@/store/modal'
import { longDateFormatter } from '@/utils/internazionalitazion'

export const CustomDayLogModal = () => {
  const { day } = useModalState<{ day: Date }>()

  if (!day) return null

  return (
    <div className='flex flex-col gap-2'>
      <h3 className='text-lg prose prose-lg'>Do you want add a log in this day?</h3>
      <p className='badge badge-outline px-3 py-4'>{longDateFormatter.format(day)}</p>
    </div>
  )
}
