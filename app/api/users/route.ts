import { z } from 'zod'

import { ok } from '@/ssr/status'
import { body } from '@/ssr/modules/body'
import { auth } from '@/ssr/modules/auth'
import { withModules } from '@/ssr/modules'
import { prismaClient } from '@/prisma/client'
import type { InferResponse } from '@/types/api'

const habitSchema = z
  .object({
    name: z.string(),
    email: z.string().email(),
  })
  .partial()

export const PATCH = withModules([auth, body(habitSchema)], async (_, { email, body }) => {
  const user = await prismaClient.user.findUniqueOrThrow({
    where: { email },
  })

  const updatedUser = {
    ...user,
    ...body,
  }

  const result = await prismaClient.user.update({
    where: { id: user.id },
    data: updatedUser,
  })

  return ok({ user: result })
})

export type PatchUserResult = InferResponse<typeof PATCH>
export type PatchUserBody = z.infer<typeof habitSchema>
