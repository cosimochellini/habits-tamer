import { ReactNode } from 'react'
import { IconCirclePlus, IconListCheck, IconSettingsFilled } from '@tabler/icons-react'

export const DefaultLayout = ({ children }: { children: ReactNode }) => (
  <div>
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
