import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useEffectOnceWhen } from 'rooks'

const loginPath = '/api/auth/signin'

export const useEnsureAuthenticated = () => {
  const router = useRouter()
  const { status } = useSession({ required: true })

  useEffectOnceWhen(async () => {
    if (router.pathname === loginPath) return

    if (status !== 'authenticated') {
      await router.replace(loginPath)
    }
  }, status !== 'loading' && router.isReady)
}
