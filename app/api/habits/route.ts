import { z } from 'zod'
import { HabitCategory, HabitFrequency } from '@prisma/client'

import { ok } from '@/ssr/status'
import { body } from '@/ssr/modules/body'
import { auth } from '@/ssr/modules/auth'
import { withModules } from '@/ssr/modules'
import { prismaClient } from '@/prisma/client'
import type { InferResponse } from '@/types/api'

const lastYear = new Date(new Date().setFullYear(new Date().getFullYear() - 1))
export const GET = withModules([auth], async ({ email }) => {
  const habits = await prismaClient.habit.findMany({
    where: { user: { email } },
    include: {
      habitLogs: {
        where: { date: { gte: lastYear } },
      },
    },
  })

  return ok({ habits })
})

export type GetHabitsResult = InferResponse<typeof GET>

const habitSchema = z.object({
  name: z.string(),
  description: z.string().nullable(),

  frequency: z.nativeEnum(HabitFrequency),
  quantity: z.number(),

  habitCategory: z.nativeEnum(HabitCategory),
})
export const POST = withModules([auth, body(habitSchema)], async ({ email, body }) => {
  const user = await prismaClient.user.findUniqueOrThrow({
    where: { email },
  })

  const habit = {
    ...body,
    user: { connect: { id: user.id } },
  }

  const result = await prismaClient.habit.create({
    data: habit,
  })

  return ok({ habitId: result.id })
})

export type PostHabitResult = InferResponse<typeof POST>
export type PostHabitBody = z.infer<typeof habitSchema>
