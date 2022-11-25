import { Button, Flex } from '@chakra-ui/react'

import { useScrollDirection } from '../hooks/useScrollDirection'
import { useEffect, useState, useRef } from 'react'

const Intersection = () => {
  const scrollDirection = useScrollDirection()

  const introSection = useRef(null)
  const experienceSection = useRef(null)
  const projectSection = useRef(null)

  useEffect(() => {
    console.log(scrollDirection)
  }, [scrollDirection])

  return (
    <>
      <Button
        onClick={() => {
          window.scrollTo({
            top: 1000,
            behavior: 'smooth'
          })
        }}>
        Slide to bottom
      </Button>
      <Flex ref={introSection} h="100vh" w="100vw">
        {}
      </Flex>
      <Flex ref={experienceSection} h="100vh" w="100vw">
        {}
      </Flex>
      <Flex ref={projectSection} h="100vh" w="100vw">
        {}
      </Flex>
    </>
  )
}

export default Intersection
