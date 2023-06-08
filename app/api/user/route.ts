import { NextResponse } from 'next/server'

import { withAuth } from '@/ssr/withAuth'

export const GET = async () => {
  const { user } = await withAuth()

  return NextResponse.json({ user })
}
