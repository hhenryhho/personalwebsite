import { useState, useEffect } from 'react'

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined
  })

  useEffect(() => {
    const updateSizes = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    window.addEventListener('resize', updateSizes)
    updateSizes() // Call it the first time to get the initial values
    return () => window.removeEventListener('resize', updateSizes)
  }, [])
  return windowSize
}

export { useWindowSize }
