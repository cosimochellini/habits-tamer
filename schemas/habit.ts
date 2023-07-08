import { z } from 'zod'
import { HabitCategory, HabitFrequency } from '@prisma/client'

export const habitSchema = z.object({
  name: z.string().min(5).max(20).nonempty(),
  habitCategory: z.nativeEnum(HabitCategory),
  description: z.string().min(10).max(1000).nullable(),
  frequency: z.nativeEnum(HabitFrequency),
  quantity: z.number(),
})
