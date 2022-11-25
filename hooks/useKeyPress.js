import { useState, useEffect } from 'react'

const useKeyPress = targetKey => {
  const [keyPressed, setKeyPressed] = useState(false)

  // Sets the keyPressed state to true if the key is pressed
  const downHandler = ({ key }) => {
    if (key === targetKey) {
      setKeyPressed(true)
    }
  }

  // Sets the keyPressed state to false if the key is released
  const upHandler = ({ key }) => {
    if (key === targetKey) {
      setKeyPressed(false)
    }
  }

  // Add event listeners to keydown and keyup
  useEffect(() => {
    window.addEventListener('keydown', downHandler)
    window.addEventListener('keyup', upHandler)
    return () => {
      window.removeEventListener('keydown', downHandler)
      window.removeEventListener('keyup', upHandler)
    }
  }, []) // Empty array ensures that effect is only run on mount and unmount
  return keyPressed
}

export default useKeyPress
