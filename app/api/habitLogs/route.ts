import { z } from 'zod'

import { ok } from '@/ssr/status'
import { auth } from '@/ssr/modules/auth'
import { body } from '@/ssr/modules/body'
import { withModules } from '@/ssr/modules'
import { prismaClient } from '@/prisma/client'
import type { InferResponse } from '@/types/api'

const habitLogSchema = z.object({
  habitId: z.string(),
  date: z.coerce.date().optional(),
})
export const POST = withModules([auth, body(habitLogSchema)], async ({ email, body }) => {
  const { habitId, date } = body

  const habit = await prismaClient.habit.findFirstOrThrow({
    where: { id: habitId, user: { email } },
  })

  const habitLog = {
    date: date ?? new Date(),
    habit: { connect: { id: habit.id } },
  }

  const result = await prismaClient.habitLog.create({
    data: habitLog,
  })

  return ok({ result })
})

export type PostHabitLogResult = InferResponse<typeof POST>
export type PostHabitLogBody = z.infer<typeof habitLogSchema>
