import { useProgress } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import {
  Center,
  Flex,
  Text,
  chakra,
  shouldForwardProp,
  Switch,
  useColorMode,
  Link,
  Grid,
  GridItem,
  useBreakpointValue,
  keyframes,
  Kbd
} from '@chakra-ui/react'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'
import { useEffect, useRef, useState } from 'react'
import { motion, isValidMotionProp } from 'framer-motion'
import SpeechBox from '../components/SpeechBox'
import Image from 'next/image'
import CustomSlide from '../components/Slide'
import useKeyPress from '../hooks/useKeyPress'
import Scene from '../components/Scene'

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

const bounce = keyframes`
  from { transform: translate3d(0, 0, 0); }
  to   { transform: translate3d(0, 50px, 0); }
}`

const animation = `${bounce} 600ms cubic-bezier(.7,0,1,1) alternate infinite`

const Draft = () => {
  const [loading, setLoading] = useState(true)
  const { progress } = useProgress()

  const rightArrow = useKeyPress('ArrowRight')
  const leftArrow = useKeyPress('ArrowLeft')
  const { colorMode, toggleColorMode } = useColorMode()
  const [currentSpeechBox, setCurrentSpeechBox] = useState(1)

  const introSpeechBox = useRef(null)
  const experienceSpeechBox = useRef(null)
  const projectSpeechBox = useRef(null)

  const variant = useBreakpointValue({
    base: 'mobile',
    sm: 'sm',
    md: 'md'
  })

  // Start the typewriter for the first box
  useEffect(() => {
    if (introSpeechBox.current && !loading) introSpeechBox.current.start()
  }, [introSpeechBox, loading])

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

  // Artificially set the loading state to false after 2 seconds
  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        setLoading(false)
      }, 2000)
    }
  }, [progress])

  return (
    <>
      <Center
        id="preloader"
        position="fixed"
        h="100vh"
        w="100vw"
        visibility={!loading ? 'hidden' : 'visible'}>
        <Flex animation={animation}>
          <Flex
            h="1rem"
            w="1rem"
            bg="brand.purpleHighlight"
            borderRadius="0.5rem"></Flex>
        </Flex>
        <Flex
          sx={{
            animationDelay: '200ms'
          }}
          animation={animation}>
          <Flex
            h="1rem"
            w="1rem"
            bg="brand.purpleHighlight"
            borderRadius="0.5rem"></Flex>
        </Flex>
        <Flex
          sx={{
            animationDelay: '400ms'
          }}
          animation={animation}>
          <Flex
            h="1rem"
            w="1rem"
            bg="brand.purpleHighlight"
            borderRadius="0.5rem"></Flex>
        </Flex>
      </Center>
      <ChakraBox
        id="main"
        h="100vh"
        w="100vw"
        initial={{ opacity: 0 }}
        animate={{
          opacity: loading ? 0 : 1
        }}
        transition={{
          duration: 1
        }}>
        <Flex
          id="splinewrapper"
          position="fixed"
          zIndex="999"
          top="50%"
          left="50%"
          h="100vh"
          w="100vw"
          transform="translateX(-50%) translateY(-50%)">
          <Canvas shadows flat linear>
            <Scene zoom={1} currentSpeechBox={currentSpeechBox} />
          </Canvas>
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
          opacity={[0, 0, 1]}
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
                    ? 'brand.purpleHighlight'
                    : 'brand.purpleHighlight'
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
                    ? 'brand.purpleHighlight'
                    : 'brand.purpleHighlight'
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
                    ? 'brand.purpleHighlight'
                    : 'brand.purpleHighlight'
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
            bgColor={'brand.purpleHighlight'}
            border="1px black solid"
          />
        </Flex>
        <CustomSlide active={currentSpeechBox === 1}>
          <SpeechBox
            phrase="Hi! My name is Henry and I am a software engineer. I graduated on May 2022 with a degree in Finance and Computer Science."
            typewriterRef={introSpeechBox}
            subNote={
              !(variant === 'mobile' || variant === 'sm') && (
                <Text>
                  You can also use the <Kbd>{'Arrow Keys'}</Kbd> to navigate
                </Text>
              )
            }>
            <Link
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
                              "image main"`}
              gridTemplateRows={'90px'}
              gridTemplateColumns={'100px 230px'}
              mb="16px"
              border="2px"
              bg="white">
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
                <Link
                  fontSize="2xl"
                  p="0"
                  href="https://www.guidewire.com/"
                  isExternal>
                  Guidewire Software
                </Link>
                <Text>Software Developer</Text>
                <Text>June 2022 to December 2022</Text>
              </GridItem>
              <GridItem area="footer"></GridItem>
            </Grid>
            <Grid
              templateAreas={`"image main"
                              "image main"`}
              gridTemplateRows={'90px'}
              gridTemplateColumns={'100px 230px'}
              border="2px"
              bg="white">
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
                <Link
                  fontSize="2xl"
                  p="0"
                  href="https://www.celestica.com/"
                  isExternal>
                  Celestica Inc.
                </Link>
                <Text>Financial Analyst Intern</Text>
                <Text>May 2020 to August 2021</Text>
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
      </ChakraBox>
    </>
  )
}

export default Draft
