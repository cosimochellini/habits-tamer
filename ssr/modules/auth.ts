import { getServerSession } from 'next-auth'

import { authOptions } from '@/auth/options'
import type { Module } from '@/ssr/modules/index'

export const auth = (async () => {
  const session = await getServerSession(authOptions)

  if (!session?.user) throw new Error('Unauthorized')

  return { user: session.user }
}) satisfies Module
