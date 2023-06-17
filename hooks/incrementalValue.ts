import { useState, useEffect, useRef } from 'react'

export const useIncrementalValue = (number: number, milliseconds: number) => {
  const previousValueRef = useRef(0)
  const [value, setValue] = useState(previousValueRef.current - number)

  useEffect(() => {
    let startTime: number
    let animationFrameId: number
    const previousValue = previousValueRef.current
    let startValue = previousValue

    if (previousValue === number) {
      // If previous value is equal to the new number,
      // reset the animation by setting startValue to 0
      startValue = 0
    } else {
      // If previous value is not equal to the new number,
      // update previousValueRef and start animation from the current value
      previousValueRef.current = number
      startValue = value
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

      if (nextValue > number) return

      setValue(nextValue)
      animationFrameId = requestAnimationFrame(animateValue)
    }

    animationFrameId = requestAnimationFrame(startAnimation)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [number])

  return value
}
