import { useState, useEffect } from 'react'

const useTouchPosition = () => {
  const [touchPosition, setTouchPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleTouchStart = event => {
      setTouchPosition({
        x: event.touches[0].clientX,
        y: event.touches[0].clientY
      })
    }

    const handleTouchMove = event => {
      setTouchPosition({
        x: event.touches[0].clientX,
        y: event.touches[0].clientY
      })
    }

    const handleTouchEnd = event => {
      // Nothing
    }

    window.addEventListener('touchstart', handleTouchStart)
    window.addEventListener('touchmove', handleTouchMove)
    window.addEventListener('touchend', handleTouchEnd)
    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [])
  return touchPosition
}
export default useTouchPosition
