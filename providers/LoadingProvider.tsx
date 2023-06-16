import { useLoading } from '@/store/loading'

export const LoadingProvider = () => {
  const loading = useLoading()

  if (!loading) return null

  return (
    <div className='absolute top-0 left-0 h-full w-full z-50 bg-transparent/50 flex items-center justify-center backdrop-blur-sm'>
      <div className='loading loading-ring loading-lg' />
    </div>
  )
}
