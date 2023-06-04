import NextAuth from 'next-auth'
import EmailProvider from 'next-auth/providers/email'
import { provider } from '@/config/email'

export const handler = NextAuth({
  providers: [EmailProvider(provider())],
})
