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
    <select
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
  )
}
