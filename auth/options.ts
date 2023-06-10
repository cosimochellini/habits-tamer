import EmailProvider from 'next-auth/providers/email'
import { PrismaAdapter } from '@auth/prisma-adapter'
import type { Adapter } from 'next-auth/adapters'

import { provider } from '@/config/email'
import { prismaClient } from '@/prisma/client'
import { secret } from '@/config/secret'

export const authOptions = {
  providers: [EmailProvider(provider)],
  adapter: PrismaAdapter(prismaClient) as Adapter,
  secret,
}
