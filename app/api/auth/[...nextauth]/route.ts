import NextAuth from 'next-auth'
import EmailProvider from 'next-auth/providers/email'

import { provider } from '@/config/email'

const handler = NextAuth({
  providers: [EmailProvider(provider())],
})

export { handler as GET, handler as POST }
