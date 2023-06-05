import '@/styles/global.css'
import type { AppProps } from 'next/app'
import type { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'

import { DefaultLayout } from '@/layouts'
import { AuthenticatedUserProvider } from '@/providers/AuthenticatedUser'

type Props = AppProps<{ session: Session }>

const App = ({ Component, pageProps: { session, ...pageProps } }: Props) => {
  return (
    <SessionProvider session={session}>
      <AuthenticatedUserProvider>
        <DefaultLayout>
          <Component {...pageProps} />
        </DefaultLayout>
      </AuthenticatedUserProvider>
    </SessionProvider>
  )
}

export default App
