import EmailProvider from 'next-auth/providers/email'
import { PrismaAdapter } from '@auth/prisma-adapter'
import type { Adapter } from 'next-auth/adapters'
import type { AuthOptions } from 'next-auth'

import { provider } from '@/config/email'
import { prismaClient } from '@/prisma/client'
import { secret } from '@/config/secret'

export const authOptions: AuthOptions = {
  providers: [EmailProvider(provider)],
  adapter: PrismaAdapter(prismaClient) as Adapter,
  secret,
  session: {
    maxAge: 3 * 30 * 24 * 60 * 60, // 3 months
  },
}
