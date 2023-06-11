import { TaskFrequency } from '@prisma/client'

import { typedObjectValues } from '@/types/object'
import { formatEnumValue } from '@/utils/enum'

interface TaskFrequencySelectProps {
  value?: TaskFrequency
  onChange: (TaskFrequency: TaskFrequency) => void
}

export const TaskFrequencySelect = ({ value, onChange }: TaskFrequencySelectProps) => {
  const options = typedObjectValues(TaskFrequency)

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as TaskFrequency)}
      className='select select-accent w-full max-w-xs'>
      <option disabled selected>
        Select the task frequency
      </option>
      {options.map((option) => (
        <option key={option} value={option}>
          {formatEnumValue(option)}
        </option>
      ))}
    </select>
  )
}
