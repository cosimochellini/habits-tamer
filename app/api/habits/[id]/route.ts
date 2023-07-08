import type { z } from 'zod'

import { ok } from '@/ssr/status'
import { idSchema } from '@/schemas/id'
import { body } from '@/ssr/modules/body'
import { auth } from '@/ssr/modules/auth'
import { withModules } from '@/ssr/modules'
import { params } from '@/ssr/modules/params'
import { prismaClient } from '@/prisma/client'
import type { InferResponse } from '@/types/api'
import { habitSchema } from '@/schemas/habit'

export const PATCH = withModules(
  [auth, params(idSchema), body(habitSchema)],
  async ({ email, params, body }) => {
    const habitToUpdate = await prismaClient.habit.findFirstOrThrow({
      where: { id: params.id, user: { email } },
    })

    const result = await prismaClient.habit.update({
      where: { id: habitToUpdate.id },
      data: body,
    })

    return ok({ result })
  },
)

export type PatchHabitResult = InferResponse<typeof PATCH>
export type PatchHabitBody = z.infer<typeof habitSchema>

export const DELETE = withModules([auth, params(idSchema)], async ({ email, params }) => {
  const result = await prismaClient.habit.deleteMany({
    where: { id: params.id, user: { email } },
  })

  return ok({ result })
})

export type DeleteHabitResult = InferResponse<typeof DELETE>
