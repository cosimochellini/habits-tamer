import { useEnsureAuthenticated } from '@/hooks/auth'
import { ReactNode } from 'react'

export const AuthenticatedUserProvider = ({ children }: { children: ReactNode }) => {
  useEnsureAuthenticated()
  return <>{children}</>
}
