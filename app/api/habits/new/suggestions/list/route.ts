import type { Habit } from '@prisma/client'
import { HabitCategory, HabitFrequency } from '@prisma/client'

import { auth } from '@/ssr/modules/auth'
import { withModules } from '@/ssr/modules'
import { badRequest, ok } from '@/ssr/status'
import { completions } from '@/istances/openAi'
import type { InferResponse } from '@/types/api'
import { prismaClient } from '@/prisma/client'

export const GET = withModules([auth], async ({ email }) => {
  const user = await prismaClient.user.findUniqueOrThrow({
    where: { email },
    include: { habits: true },
  })

  const alreadyTrackedHabits = user.habits.map((habit) => habit.name)

  const prompt = `
  You're an expert on giving advice to habits, to improve his life.
  
  A user, who wants to improve his life, is looking for suggestions.
  
  ${
    alreadyTrackedHabits.length > 0
      ? `The user already tracked these habits: ${alreadyTrackedHabits.join(', ')}`
      : ''
  }
  Generate a list of additional habits that the user would like, the main goal is to improve his life.
  You need to generate a JSON containing an array of additional habits that the user would like, the main goal is to improve his life.
  This is the type of JSON you're looking for:
  type Habit = { name: string(max: 30)  description: string frequency: HabitFrequency habitCategory: HabitCategory, quantity: number } 
  const HabitCategory: ${JSON.stringify(HabitCategory)}
  const HabitFrequency: ${JSON.stringify(HabitFrequency)}  
  Generate a JSON containing an array of Habit
  Give me only 4 items, try to generate always a different set of habits
  Return me ONLY the JSON array
`

  const habitCompletions = await completions(prompt)

  const content = habitCompletions.choices[0]?.message.content

  if (!content) return badRequest('Suggestions not found')

  return ok({ suggestedHabits: JSON.parse(content) as Habit[] })
})
export type SuggestionListResult = InferResponse<typeof GET>
