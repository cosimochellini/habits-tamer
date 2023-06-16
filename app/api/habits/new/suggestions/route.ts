import { z } from 'zod'
import type { Habit } from '@prisma/client'
import { HabitCategory, HabitFrequency } from '@prisma/client'

import { auth } from '@/ssr/modules/auth'
import { query } from '@/ssr/modules/query'
import { withModules } from '@/ssr/modules'
import { badRequest, ok } from '@/ssr/status'
import { completions } from '@/istances/openAi'
import type { InferResponse } from '@/types/api'

const schema = z.object({
  habit: z.string().max(100),
})

export const GET = withModules([query(schema), auth], async ({ query }) => {
  const { habit } = query

  const prompt = `
  I have a model like this:  
  type Habit = { name: string  description: string frequency: HabitFrequency  quantity: number habitCategory: HabitCategory } 
  const HabitCategory: ${JSON.stringify(HabitCategory)}
  const HabitFrequency: ${JSON.stringify(HabitFrequency)}
  Generate a JSON containing a Habit entity based on the habit '${habit}', make sure the description is smaller than 100 characters 
  Return me ONLY the JSON
`

  const habitCompletions = await completions(prompt)

  const content = habitCompletions.choices[0]?.message.content

  if (!content) return badRequest('Suggestion not found')

  return ok({ suggestedHabit: JSON.parse(content) as Habit })
})

export type SuggestionResult = InferResponse<typeof GET>
export type SuggestionQuery = z.infer<typeof schema>
