import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth/options'

export const withAuth = async () => {
  const { user } = (await getServerSession(authOptions)) ?? {}

  return { user } as const
}
