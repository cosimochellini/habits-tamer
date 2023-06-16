import { z } from 'zod'

import { withModules } from '@/ssr/modules'
import { auth } from '@/ssr/modules/auth'
import { prismaClient } from '@/prisma/client'
import { ok } from '@/ssr/status'
import type { InferResponse } from '@/types/api'
import { params } from '@/ssr/modules/params'

const habitSchema = z.object({
  id: z.string(),
})
export const DELETE = withModules([auth, params(habitSchema)], async ({ email, params }) => {
  const result = await prismaClient.habit.deleteMany({
    where: { id: params.id, user: { email } },
  })

  return ok({ result })
})

export type DeleteHabitResult = InferResponse<typeof DELETE>
