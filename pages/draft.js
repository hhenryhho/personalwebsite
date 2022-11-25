import Spline from '@splinetool/react-spline'
import {
  Center,
  Flex,
  Text,
  chakra,
  shouldForwardProp,
  Switch,
  useColorMode,
  Link,
  Button,
  Grid,
  GridItem,
  useBreakpointValue
} from '@chakra-ui/react'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'
import { useEffect, useRef, useState } from 'react'
import useMousePosition from '../hooks/useMousePosition'
import { motion, isValidMotionProp } from 'framer-motion'
import SpeechBox from '../components/SpeechBox'
import Image from 'next/image'
import CustomSlide from '../components/Slide'
import useKeyPress from '../hooks/useKeyPress'

const ChakraBox = chakra(motion.div, {
  shouldForwardProp: prop => isValidMotionProp(prop) || shouldForwardProp(prop)
})

const ChakraNextImage = chakra(Image, {
  baseStyle: { maxH: 120, maxW: 120 },
  shouldForwardProp: prop =>
    [
      'width',
      'height',
      'src',
      'alt',
      'quality',
      'placeholder',
      'blurDataURL',
      'loader '
    ].includes(prop)
})

const headRotationMulti = 0.25
const bodyRotationMulti = 0.1

const upShift = '-200px'

const Draft = () => {
  const mousePosition = useMousePosition()
  const rightArrow = useKeyPress('ArrowRight')
  const leftArrow = useKeyPress('ArrowLeft')
  const { colorMode, toggleColorMode } = useColorMode()
  const [currentSpeechBox, setCurrentSpeechBox] = useState(1)
  const [clothesSwapped, setClothesSwapped] = useState(false)

  const headObj = useRef()
  const bodyObj = useRef()
  const regClothes = useRef()
  const logoClothes = useRef()

  const introSpeechBox = useRef(null)
  const experienceSpeechBox = useRef(null)
  const projectSpeechBox = useRef(null)

  const variant = useBreakpointValue({
    base: '0.7',
    md: '0.9',
    lg: '1'
  })

  // Start the typewriter for the first box
  useEffect(() => {
    if (introSpeechBox.current) {
      introSpeechBox.current.start()
    }
  }, [introSpeechBox.current])

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

  // Change the clothes based on the current speech box
  useEffect(() => {
    if (currentSpeechBox === 2 && !clothesSwapped) {
      const ogX = regClothes.current.position.x
      regClothes.current.position.x = logoClothes.current.position.x
      logoClothes.current.position.x = ogX
      setClothesSwapped(true)
      console.log('Swapped clothes')
    } else if (currentSpeechBox === 1 && clothesSwapped) {
      const ogX = regClothes.current.position.x
      regClothes.current.position.x = logoClothes.current.position.x
      logoClothes.current.position.x = ogX
      setClothesSwapped(false)
      console.log('Swapped clothes back')
    }
  }, [currentSpeechBox])

  // Checks if the right or left arrow key is pressed and changes the current speech box
  useEffect(() => {
    if (rightArrow) {
      if (currentSpeechBox === 1) {
        setCurrentSpeechBox(2)
        experienceSpeechBox.current.start()
      } else if (currentSpeechBox === 2) {
        setCurrentSpeechBox(3)
        projectSpeechBox.current.start()
      }
    } else if (leftArrow) {
      if (currentSpeechBox === 3) {
        setCurrentSpeechBox(2)
        experienceSpeechBox.current.start()
      } else if (currentSpeechBox === 2) {
        setCurrentSpeechBox(1)
        introSpeechBox.current.start()
      }
    }
  }, [rightArrow, leftArrow])

  return (
    <>
      <Flex
        id="splinewrapper"
        position="fixed"
        zIndex="999"
        top="50%"
        left="50%"
        h="400px"
        w="400px"
        transform="translateX(-50%) translateY(-50%)">
        <ChakraBox
          h="inherit"
          w="inherit"
          animate={{
            y:
              currentSpeechBox === 2
                ? upShift
                : currentSpeechBox === 3
                ? upShift
                : '0',
            scale: variant
          }}
          transition={{ ease: 'anticipate', duration: 1 }}>
          <Spline
            onLoad={splineObj => {
              // Get a reference to the head and body children of the spline scene
              const head = splineObj.findObjectByName('Head')
              const body = splineObj.findObjectByName('Lower Body')
              headObj.current = head
              bodyObj.current = body
              regClothes.current = splineObj.findObjectByName('Regular')
              logoClothes.current = splineObj.findObjectByName('Logo')
              splineObj.setZoom(0.4)
            }}
            scene="scene.splinecode"
            onMouseEnter={() => {
              headObj?.current?.emitEvent('mouseHover')
            }}
            onMouseLeave={() => {
              headObj?.current?.emitEventReverse('mouseHover')
            }}
            transform={['scale(0.8)', 'scale(0.9)', 'scale(1)']}
          />
        </ChakraBox>
      </Flex>
      <Flex
        id="colorModeSwitch"
        position="fixed"
        top={['20px', '48px']}
        right={['20px', '48px']}
        zIndex="999">
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
      <Flex
        id="links"
        visibility={['hidden', 'hidden', 'visible']}
        position="fixed"
        bottom="48px"
        right="48px"
        zIndex="999">
        <Flex flexDir="column">
          <Text
            as={Link}
            color={
              currentSpeechBox === 1
                ? colorMode === 'light'
                  ? 'red'
                  : 'blue'
                : colorMode === 'light'
                ? 'black'
                : 'white'
            }
            onClick={() => {
              setCurrentSpeechBox(1)
            }}>
            Intro
          </Text>
          <Text
            as={Link}
            color={
              currentSpeechBox === 2
                ? colorMode === 'light'
                  ? 'red'
                  : 'blue'
                : colorMode === 'light'
                ? 'black'
                : 'white'
            }
            onClick={() => {
              setCurrentSpeechBox(2)
              experienceSpeechBox.current.start()
            }}>
            Experience
          </Text>
          <Text
            as={Link}
            color={
              currentSpeechBox === 3
                ? colorMode === 'light'
                  ? 'red'
                  : 'blue'
                : colorMode === 'light'
                ? 'black'
                : 'white'
            }
            onClick={() => {
              setCurrentSpeechBox(3)
              projectSpeechBox.current.start()
            }}>
            Projects
          </Text>
        </Flex>
      </Flex>
      <Flex
        id="progress-bar"
        position="fixed"
        h="100vh"
        top="0"
        right="0"
        width="12px"
        zIndex="999">
        <ChakraBox
          animate={{
            height:
              currentSpeechBox === 2
                ? '50%'
                : currentSpeechBox === 3
                ? '100%'
                : '0%'
          }}
          transition={{ ease: 'easeInOut', duration: 1 }}
          h="0px"
          w="100%"
          bgColor={colorMode === 'light' ? 'brand.darkBg' : 'brand.lightBg'}
          border="1px black solid"
        />
      </Flex>
      <CustomSlide active={currentSpeechBox === 1}>
        <SpeechBox
          phrase="Hi! My name is Henry and I am a software engineer. I graduated on May 2022 with a degree in Finance and Computer Science."
          typewriterRef={introSpeechBox}>
          <Link
            as={Button}
            position="absolute"
            bottom="0"
            right="0"
            onClick={() => {
              setCurrentSpeechBox(2)
              experienceSpeechBox.current.start()
            }}>
            Continue
          </Link>
        </SpeechBox>
      </CustomSlide>

      <CustomSlide active={currentSpeechBox === 2}>
        <Flex
          position="fixed"
          maxW="400px"
          flexDir="column"
          bottom={['25%', '25%', '30%']}
          h={['385px', '385px', '520px']}
          left="50%"
          transform="translateX(-50%)">
          <Grid
            templateAreas={`"image main"
                           "footer footer"`}
            gridTemplateRows={'60px 20px'}
            gridTemplateColumns={'100px 230px'}
            pb="30px">
            <GridItem area="image">
              <Center h="100%">
                <ChakraNextImage
                  src="/work/guidewire.png"
                  alt="guidewire logo"
                  height="50"
                  width="50"
                  h="auto"
                  w="auto"
                />
              </Center>
            </GridItem>
            <GridItem area="main">
              <Text fontSize="2xl">Guidewire Software</Text>
              <Text fontSize="sm">June 2022 to December 2022</Text>
            </GridItem>
            <GridItem area="footer">
              <Button h="auto" w="100%" my="10px">
                <Link href="https://www.guidewire.com/" isExternal>
                  View Website
                </Link>
              </Button>
            </GridItem>
          </Grid>
          <Grid
            templateAreas={`"image main"
                            "footer footer"`}
            gridTemplateRows={'60px 20px'}
            gridTemplateColumns={'100px 230px'}>
            <GridItem area="image">
              <Center h="100%">
                <ChakraNextImage
                  src="/work/celestica.png"
                  alt="celestica logo"
                  height="50"
                  width="50"
                  h="auto"
                  w="auto"
                />
              </Center>
            </GridItem>
            <GridItem area="main">
              <Text fontSize="2xl">Celestica Inc.</Text>
              <Text fontSize="sm">May 2020 to August 2021</Text>
            </GridItem>
            <GridItem area="footer">
              <Button h="auto" w="100%" my="10px">
                <Link href="https://www.celestica.com/" isExternal>
                  View Website
                </Link>
              </Button>
            </GridItem>
          </Grid>
        </Flex>
        <SpeechBox
          phrase="I am an incoming Software Engineer at Amazon. Here are some of my previous roles."
          typewriterRef={experienceSpeechBox}>
          <Link
            position="absolute"
            bottom="0"
            left="0"
            onClick={() => {
              setCurrentSpeechBox(1)
            }}>
            Back
          </Link>
          <Link
            position="absolute"
            bottom="0"
            right="0"
            onClick={() => {
              setCurrentSpeechBox(3)
              projectSpeechBox.current.start()
            }}>
            Continue
          </Link>
        </SpeechBox>
      </CustomSlide>
      <CustomSlide active={currentSpeechBox == 3}>
        <SpeechBox
          phrase="When I am not working, I like to work on small side projects to teach myself new technologies."
          typewriterRef={projectSpeechBox}>
          <Link
            position="absolute"
            bottom="0"
            left="0"
            onClick={() => {
              setCurrentSpeechBox(2)
            }}>
            Back
          </Link>
        </SpeechBox>
      </CustomSlide>
    </>
  )
}

export default Draft
