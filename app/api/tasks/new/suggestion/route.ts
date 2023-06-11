import { z } from 'zod'
import { TaskCategory, TaskFrequency } from '@prisma/client'

import { auth } from '@/ssr/modules/auth'
import { query } from '@/ssr/modules/query'
import { withModules } from '@/ssr/modules'
import { badRequest, ok } from '@/ssr/status'
import { completions } from '@/istances/openAi'

const schema = z.object({
  task: z.string(),
})

export const GET = withModules([query(schema), auth], async (res, context) => {
  const { task } = context.query

  const prompt = `
  I have a model like this:  
  type Habit = { name: string  description: string | null frequency: TaskFrequency  quantity: number taskCategory: TaskCategory } 
  const TaskCategory: ${JSON.stringify(TaskCategory)}
  const TaskFrequency: ${JSON.stringify(TaskFrequency)}
  Generate a JSON containing a Habit entity based on the task '${task}' and add a proper description 
  Return me ONLY the JSON
`

  const taskCompletions = await completions(prompt)

  const content = taskCompletions.choices[0]?.message.content

  if (!content) return badRequest({ error: 'Task not found' })

  return ok({ suggestedTask: JSON.parse(content) })
})
