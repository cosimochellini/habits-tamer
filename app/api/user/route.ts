import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth/options'
import { NextResponse } from 'next/server'

export const GET = async (request: Request) => {
  const { user } = (await getServerSession(authOptions)) ?? {}

  return NextResponse.json({ user })
}
