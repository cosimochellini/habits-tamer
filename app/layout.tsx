import '@/styles/global.css'
import { Inter } from 'next/font/google'
import type { ReactNode } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

const Layout = ({ children }: { children: ReactNode }) => (
  <html lang='en'>
    <body className={inter.className}>{children}</body>
  </html>
)

export default Layout
