import { TaskCategory } from '@prisma/client'

import { typedObjectValues } from '@/types/object'
import { formatEnumValue } from '@/utils/enum'

interface TaskCategorySelectProps {
  value?: TaskCategory
  onChange: (taskCategory: TaskCategory) => void
}

export const TaskCategorySelect = ({ value, onChange }: TaskCategorySelectProps) => {
  const options = typedObjectValues(TaskCategory)

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as TaskCategory)}
      className='select select-accent w-full max-w-xs'>
      <option disabled selected>
        Select a task category
      </option>
      {options.map((option) => (
        <option key={option} value={option}>
          {formatEnumValue(option)}
        </option>
      ))}
    </select>
  )
}
