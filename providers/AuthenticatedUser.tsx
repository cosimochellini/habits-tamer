import type { ReactNode } from 'react'

import { useEnsureAuthenticated } from '@/hooks/auth'

export const AuthenticatedUserProvider = ({ children }: { children: ReactNode }) => {
  useEnsureAuthenticated()
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>
}
