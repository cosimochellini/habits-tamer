import { z } from 'zod'
import { HabitCategory, HabitFrequency } from '@prisma/client'

import { ok } from '@/ssr/status'
import { body } from '@/ssr/modules/body'
import { auth } from '@/ssr/modules/auth'
import { withModules } from '@/ssr/modules'
import { prismaClient } from '@/prisma/client'

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

const habitSchema = z.object({
  name: z.string(),
  description: z.string().optional(),

  frequency: z.nativeEnum(HabitFrequency),
  quantity: z.number(),

  habitCategory: z.nativeEnum(HabitCategory),
})
export const POST = withModules([auth, body(habitSchema)], async (_, { user, body }) => {
  const habit = {
    ...body,
    userId: user.id,
  }

  const result = await prismaClient.habit.create({
    data: habit,
  })

  return ok({ habitId: result.id })
})
