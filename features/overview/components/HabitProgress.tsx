import type { ReactNode, CSSProperties } from 'react'
import classNames from 'classnames'

interface HabitProgressProps {
  progress: number
  children?: ReactNode
}
export const HabitProgress = ({ progress, children }: HabitProgressProps) => {
  const radialProgress = {
    '--value': progress.toFixed(0),
    '--thickness': '0.6rem',
  } as CSSProperties

  const habitCompleted = progress >= 100

  return (
    <div
      className={classNames('radial-progress after:hidden w-full h-full m-auto', {
        'text-accent bg-transparent/10': habitCompleted,
      })}
      style={radialProgress}>
      {children}
    </div>
  )
}
