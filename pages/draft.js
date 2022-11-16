import Spline from '@splinetool/react-spline'
import {
  Flex,
  Text,
  chakra,
  shouldForwardProp,
  Switch,
  useColorMode,
  Box,
  Link,
  Button
} from '@chakra-ui/react'
import { TriangleDownIcon, SunIcon, MoonIcon } from '@chakra-ui/icons'
import { useEffect, useRef, useState } from 'react'
import useMousePosition from '../hooks/useMousePosition'
import { motion, isValidMotionProp } from 'framer-motion'
import SpeechBox from '../components/SpeechBox'

import ReactFullpage from '@fullpage/react-fullpage'

const ChakraBox = chakra(motion.div, {
  shouldForwardProp: prop => isValidMotionProp(prop) || shouldForwardProp(prop)
})

const headRotationMulti = 0.25
const bodyRotationMulti = 0.1

const Draft = () => {
  const mousePosition = useMousePosition()
  const scene = useRef()
  const headObj = useRef()
  const bodyObj = useRef()

  const introSection = useRef(null)
  const experienceSection = useRef(null)
  const projectSection = useRef(null)

  const introSpeechBox = useRef(null)
  const experienceSpeechBox = useRef(null)
  const projectSpeechBox = useRef(null)

  const { toggleColorMode } = useColorMode()

  const loadSpline = splineObj => {
    // Get a reference to the head and body children of the spline scene
    const head = splineObj.findObjectByName('Head')
    const body = splineObj.findObjectByName('Lower Body')
    scene.current = splineObj
    headObj.current = head
    bodyObj.current = body
    scene.current.setZoom(0.5)
  }

  const [isVisible, setIsVisible] = useState(false)

  const callbackFunction = entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        switch (entry.target.id) {
          case 'intro':
            introSpeechBox.current.start()
            break
          case 'experience':
            experienceSpeechBox.current.start()
            break
          case 'project':
            projectSpeechBox.current.start()
            break
        }
      }
    })
  }
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
  }

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunction, options)
    if (introSection.current) observer.observe(introSection.current)
    if (experienceSection.current) observer.observe(experienceSection.current)
    if (projectSection.current) observer.observe(projectSection.current)

    return () => {
      if (introSection.current) observer.unobserve(introSection.current)
      if (experienceSection.current)
        observer.unobserve(experienceSection.current)
      if (projectSection.current) observer.unobserve(projectSection.current)
    }
  }, [introSection, experienceSection, projectSection])

  // Rotate the head and body whenever the mouse position changes
  useEffect(() => {
    // Ensure that the reference to the spline object is set
    if (headObj.current && bodyObj.current) {
      // Get the width and height of the window
      const windowWidth = window.innerWidth
      const windowHeight = window.innerHeight

      // Get the center coordinates of the window
      const centerXCoordinate = windowWidth / 2
      const centerYCoordinate = windowHeight / 2

      // Rotate the head and body on the y and x axis based on mouse position and multipliers
      headObj.current.rotation.y =
        ((mousePosition.x - centerXCoordinate) * headRotationMulti * 2.5) /
        windowWidth
      headObj.current.rotation.x =
        ((mousePosition.y - centerYCoordinate) * headRotationMulti) /
        windowHeight

      bodyObj.current.rotation.y =
        ((mousePosition.x - centerXCoordinate) * bodyRotationMulti * 2.5) /
        windowWidth
      bodyObj.current.rotation.x =
        ((mousePosition.y - centerYCoordinate) * bodyRotationMulti) /
        windowHeight
    }
  }, [mousePosition])

  return (
    <Flex position="relative" scrollBehavior="smooth">
      <Flex h="100vh" w="100vw" align="center" justify="center">
        <ChakraBox
          position="fixed"
          h="400px"
          w="400px"
          transform={['scale(0.5)', 'scale(0.75)', 'scale(1)']}
          // animate={{
          //   x: ['0px', '400px'],
          //   y: ['0px', '400px']
          // }}
          zIndex="1">
          <Spline
            onLoad={loadSpline}
            scene="avatarNoMovement.splinecode"
            onMouseEnter={() => {
              headObj?.current?.emitEvent('mouseHover')
            }}
            onMouseLeave={() => {
              headObj?.current?.emitEventReverse('mouseHover')
            }}
          />
        </ChakraBox>
      </Flex>
      <Flex position="fixed" top="48px" right="48px" zIndex="999">
        <Flex justify="center" align="center">
          <SunIcon />
        </Flex>
        <Switch
          colorScheme="gray"
          size="lg"
          mx="16px"
          onChange={toggleColorMode}
        />
        <Flex justify="center" align="center">
          <MoonIcon />
        </Flex>
      </Flex>
      <Flex position="fixed" bottom="48px" right="48px" zIndex="999">
        <Flex flexDir="column">
          <Text
            as={Link}
            onClick={() => {
              introSection.current.scrollIntoView({
                behavior: 'smooth'
              })
            }}>
            Intro
          </Text>
          <Text
            as={Link}
            onClick={() => {
              experienceSection.current.scrollIntoView({
                behavior: 'smooth'
              })
            }}>
            Experience
          </Text>
          <Text
            as={Link}
            onClick={() => {
              projectSection.current.scrollIntoView({
                behavior: 'smooth'
              })
            }}>
            Projects
          </Text>
        </Flex>
      </Flex>
      <Flex position="absolute" w="100%" justify="center">
        <Box
          h="100vh"
          overflowX="hidden"
          overflowY="scroll"
          scrollSnapType="y mandatory">
          <Flex
            id="intro"
            ref={introSection}
            h="100vh"
            w="100vw"
            position="relative"
            scrollSnapAlign="start">
            <SpeechBox
              phrase="Hi! My name is Henry. I am a software engineer."
              typewriterRef={introSpeechBox}
            />
            <ChakraBox
              position="absolute"
              left="50%"
              ml="-8px"
              bottom="10%"
              zIndex="1"
              animate={{
                y: ['0px', '8px']
              }}
              transition={{
                y: {
                  duration: 0.5,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut'
                }
              }}>
              <TriangleDownIcon />
            </ChakraBox>
          </Flex>
          <Flex
            id="experience"
            ref={experienceSection}
            h="100vh"
            w="100vw"
            position="relative"
            scrollSnapAlign="start">
            <SpeechBox
              phrase="I currently work at Amazon as a Software Development Engineer I. Here are some of my previous roles."
              typewriterRef={experienceSpeechBox}
            />
          </Flex>
          <Flex
            id="project"
            ref={projectSection}
            h="100vh"
            w="100vw"
            position="relative"
            scrollSnapAlign="start">
            <SpeechBox
              phrase="When I am not working, I like to work on small side projects to teach myself new technologies."
              typewriterRef={projectSpeechBox}
            />
          </Flex>
        </Box>
      </Flex>
    </Flex>
  )
}

export default Draft
