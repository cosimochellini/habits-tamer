import { HabitCategory } from '@prisma/client'

import { typedObjectValues } from '@/types/object'
import { formatEnumValue } from '@/utils/enum'

interface HabitCategorySelectProps {
  value?: HabitCategory
  onChange: (habitCategory: HabitCategory) => void
}

export const HabitCategorySelect = ({ value, onChange }: HabitCategorySelectProps) => {
  const options = typedObjectValues(HabitCategory)

  return (
    <div className='w-full max-w-xs form-control'>
      <label htmlFor='habitCategory' className='label'>
        <span className='label-text'>Category</span>
      </label>
      <select
        id='habitCategory'
        name='habitCategory'
        value={value}
        onChange={(e) => onChange(e.target.value as HabitCategory)}
        className='select select-accent w-full max-w-xs'>
        <option disabled selected>
          Select a category
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {formatEnumValue(option)}
          </option>
        ))}
      </select>
    </div>
  )
}
