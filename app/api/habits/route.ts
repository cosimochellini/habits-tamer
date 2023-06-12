import { withModules } from '@/ssr/modules'
import { auth } from '@/ssr/modules/auth'
import { prismaClient } from '@/prisma/client'
import { ok } from '@/ssr/status'

const lastYear = new Date(new Date().setFullYear(new Date().getFullYear() - 1))
export const GET = withModules([auth], async (req, context) => {
  const userId = context.user.id

  const habits = await prismaClient.habit.findMany({
    where: { userId },
    include: {
      habitLogs: {
        where: { date: { gte: lastYear } },
      },
    },
  })

  return ok({ habits })
})
