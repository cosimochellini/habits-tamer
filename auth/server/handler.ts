import NextAuth from 'next-auth'
import EmailProvider from 'next-auth/providers/email'

import { provider } from '@/config/email'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prismaClient } from '@/prisma/client'
import { Adapter } from 'next-auth/adapters'
import { secret } from '@/config/secret'

export const handler = NextAuth({
  providers: [EmailProvider(provider())],
  adapter: PrismaAdapter(prismaClient) as Adapter,
  secret,
})
