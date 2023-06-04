import { NextResponse } from 'next/server'

import { prismaClient } from '@/prisma/client'

export const GET = async () => {
  const users = await prismaClient.user.findMany({ include: { sessions: true, accounts: true } })

  return NextResponse.json({ users })
}
