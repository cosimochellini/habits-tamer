import { ReactNode } from 'react'
import { IconCirclePlus, IconListCheck, IconSettingsFilled } from '@tabler/icons-react'
import { inter } from '@/styles/fonts'

export const DefaultLayout = ({ children }: { children: ReactNode }) => (
  <div className={inter.className}>
    {children}
    <div className='btm-nav'>
      <button className='text-primary'>
        <IconListCheck />
      </button>
      <button className='active'>
        <IconCirclePlus />
      </button>
      <button>
        <IconSettingsFilled />
      </button>
    </div>
  </div>
)
