import { useModalState } from '@/store/modal'

const rtf = new Intl.DateTimeFormat('en', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})
export const CustomDayLogModal = () => {
  const { day } = useModalState<{ day: Date }>()

  if (!day) return null

  return (
    <div className='flex flex-col gap-2'>
      <h3 className='text-lg prose prose-lg'>Do you want add a log in this day?</h3>
      <p className='badge badge-outline px-3 py-4'>{rtf.format(day)}</p>
    </div>
  )
}
