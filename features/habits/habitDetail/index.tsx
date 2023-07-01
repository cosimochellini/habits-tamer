import type { HabitResult } from '@/store/habits'
import { HabitDetailOverview } from '@/features/habits/habitDetail/components/HabitDetailOverview'
import { HabitLogsOverview } from '@/features/habits/habitDetail/components/HabitLogsOverview'

interface HabitDetailOverviewProps {
  habit: HabitResult
}
export const HabitDetail = ({ habit }: HabitDetailOverviewProps) => (
  <div className='flex flex-col gap-4'>
    <HabitDetailOverview habit={habit} />
    <HabitLogsOverview habit={habit} />
  </div>
)
