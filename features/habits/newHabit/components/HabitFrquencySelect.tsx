import { HabitFrequency } from '@prisma/client'

import { typedObjectValues } from '@/types/object'
import { formatEnumValue } from '@/utils/enum'

interface HabitFrequencySelectProps {
  value?: HabitFrequency
  onChange: (HabitFrequency: HabitFrequency) => void
}

export const HabitFrequencySelect = ({ value, onChange }: HabitFrequencySelectProps) => {
  const options = typedObjectValues(HabitFrequency)

  return (
    <div className='w-full max-w-xs form-control'>
      <label htmlFor='habitFrequency' className='label'>
        <span className='label-text'>Habit frequency</span>
      </label>

      <select
        id='habitFrequency'
        name='habitFrequency'
        value={value}
        onChange={(e) => onChange(e.target.value as HabitFrequency)}
        className='select select-accent w-full max-w-xs'>
        <option disabled selected>
          Select the frequency
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
