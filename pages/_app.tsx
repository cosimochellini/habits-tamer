import '@/styles/global.css'
import type { AppProps } from 'next/app'
import type { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'

import { inter } from '@/styles/fonts'
import { DefaultLayout } from '@/layouts'

type Props = AppProps<{ session: Session }>

const App = ({ Component, pageProps: { session, ...pageProps } }: Props) => {
  return (
    <div className={inter.className}>
      <DefaultLayout>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </DefaultLayout>
    </div>
  )
}

export default App
