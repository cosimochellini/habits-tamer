import type { HabitCategory } from '@prisma/client'
import type { ReactNode } from 'react'
import { memo } from 'react'
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
