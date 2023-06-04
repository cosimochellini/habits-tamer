import { NextResponse } from 'next/server'
import { prismaClient } from '@/prisma/client'

export const GET = async (request: Request) => {
  const users = await prismaClient.user.findMany()

  return NextResponse.json({ users })
}
