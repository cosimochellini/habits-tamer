import { getServerSession } from 'next-auth'

import { authOptions } from '@/auth/options'
import type { Module } from '@/ssr/modules/index'

export const auth = (async () => {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) throw new Error('Unauthorized')

  return { email: session.user.email }
}) satisfies Module
