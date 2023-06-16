import type { HabitCategory } from '@prisma/client'
import type { ReactNode } from 'react'
import { memo, useMemo } from 'react'
import type { TablerIconsProps } from '@tabler/icons-react'
import {
  IconAirBalloon,
  IconBeerFilled,
  IconBooks,
  IconBrain,
  IconDevicesPc,
  IconFriends,
  IconHeartbeat,
} from '@tabler/icons-react'

interface HabitCategoryIconProps extends TablerIconsProps {
  category: HabitCategory
}

const habitIcons = {
  EDUCATION: IconBooks,
  FAMILY: IconFriends,
  WORK: IconDevicesPc,
  HEALTH: IconHeartbeat,
  HOBBIES: IconAirBalloon,
  LIFESTYLE: IconBeerFilled,
  PERSONAL_GROWTH: IconBrain,
} as const satisfies Record<HabitCategory, (props: TablerIconsProps) => ReactNode>

export const HabitCategoryIcon = memo(function HabitCategoryIcon({
  category,
  ...props
}: HabitCategoryIconProps) {
  const Icon = habitIcons[category]
  return <Icon {...props} />
})

const colorFactory = (category: HabitCategory) => {
  switch (category) {
    case 'EDUCATION':
      return 'badge-primary'
    case 'FAMILY':
      return 'badge-info'
    case 'WORK':
      return 'badge-secondary'
    case 'HEALTH':
      return 'badge-success'
    case 'HOBBIES':
      return 'badge-info'
    case 'PERSONAL_GROWTH':
      return 'badge-warning'
    default:
      return 'badge-primary'
  }
}

export const HabitCategoryIconBadge = ({
  category,
  compact,
  ...props
}: HabitCategoryIconProps & { compact?: boolean }) => {
  const Icon = habitIcons[category]
  const bgColor = useMemo(() => colorFactory(category), [category])

  return (
    <div className={`badge gap-2 px-4 py-3 ${bgColor}`} title={category}>
      {!compact && category}
      <Icon {...props} />
    </div>
  )
}
