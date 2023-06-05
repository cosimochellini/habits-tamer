import Router from 'next/router'
import { useSession } from 'next-auth/react'
import { useEffectOnceWhen } from 'rooks'

const loginPath = '/api/auth/signin'

export const useEnsureAuthenticated = () => {
  const { status } = useSession()

  useEffectOnceWhen(async () => {
    if (Router.pathname === loginPath) return

    await Router.replace(loginPath)
  }, status === 'unauthenticated')
}
