import { useState, useEffect } from 'react'

export const useIncrementalValue = (number: number, milliseconds: number) => {
  const [value, setValue] = useState(0)
  const [previousValue, setPreviousValue] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrameId: number
    let startValue = previousValue

    if (previousValue === number) {
      // If previous value is equal to the new number,
      // no need to start from the previous value
      startValue = 0
    }

    const startAnimation = (timestamp: number) => {
      startTime = timestamp
      animateValue(timestamp)
    }

    const animateValue = (timestamp: number) => {
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / milliseconds, 1) // 1500 milliseconds = 1.5 seconds
      const easingProgress = 1 - (1 - progress) ** 2 // Apply easing function to make it start fast and continue slow
      const nextValue = Math.floor((number - startValue) * easingProgress) + startValue

      if (nextValue <= number) {
        setValue(nextValue)
        animationFrameId = requestAnimationFrame(animateValue)
      } else {
        setPreviousValue(number)
      }
    }

    animationFrameId = requestAnimationFrame(startAnimation)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [milliseconds, number, previousValue])

  return value
}
