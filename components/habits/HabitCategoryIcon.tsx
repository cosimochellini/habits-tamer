import type { HabitCategory } from '@prisma/client'
import type { ReactNode } from 'react'
import { memo } from 'react'
import {
  IconAirBalloon,
  IconBeerFilled,
  IconBooks,
  IconBrain,
  IconDevicesPc,
  IconFriends,
  IconHeartbeat,
} from '@tabler/icons-react'

interface HabitCategoryIconProps {
  category: HabitCategory
}

const habitIcons = {
  EDUCATION: <IconBooks />,
  FAMILY: <IconFriends />,
  WORK: <IconDevicesPc />,
  HEALTH: <IconHeartbeat />,
  HOBBIES: <IconAirBalloon />,
  LIFESTYLE: <IconBeerFilled />,
  PERSONAL_GROWTH: <IconBrain />,
} as const satisfies Record<HabitCategory, ReactNode>

export const HabitCategoryIcon = memo(function HabitCategoryIcon({
  category,
}: HabitCategoryIconProps) {
  return habitIcons[category]
})
