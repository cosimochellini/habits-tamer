import Router from 'next/router'

import { fetcher } from '@/utils/fetch'
import { logger } from '@/istances/logger'
import { reloadHabits } from '@/store/habits'
import { useObjectState } from '@/hooks/object'
import type { HabitResult } from '@/store/habits'
import { startLoading, stopLoading } from '@/store/loading'
import { HabitForm } from '@/components/habits/form/HabitForm'
import type { PatchHabitBody, PatchHabitResult } from '@/app/api/habits/[id]/route'

interface HabitDetailProps {
  habit: HabitResult
}

const patchHabit = async (body: HabitResult) =>
  fetcher<PatchHabitResult, never, PatchHabitBody>(`/api/habits/${body.id}`, 'PATCH')({ body })

export const EditHabitDetail = ({ habit }: HabitDetailProps) => {
  const [actualHabit, setActualHabit] = useObjectState<HabitResult>(habit)
  const onFormConfirm = async () => {
    startLoading()

    await patchHabit(actualHabit as HabitResult)

    stopLoading()

    reloadHabits().catch(logger.error)

    await Router.push('/habits')
  }
  return (
    <div>
      <HabitForm
        habit={actualHabit}
        setHabit={setActualHabit}
        onConfirm={onFormConfirm}
        onCancel={() => Router.push('/habits')}
      />
    </div>
  )
}
