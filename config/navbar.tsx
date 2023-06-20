import { IconListCheck, IconSettingsFilled, IconTarget } from '@tabler/icons-react'

export const paths = [
  { name: 'overview', icon: <IconTarget />, path: '/' },
  { name: 'habits', icon: <IconListCheck />, path: '/habits' },
  { name: 'settings', icon: <IconSettingsFilled />, path: '/settings' },
] as const
