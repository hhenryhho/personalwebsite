import { useEffect, useRef, useState, useContext } from 'react'
import {
  Button,
  Center,
  Flex,
  Text,
  chakra,
  Switch,
  Link,
  Stack,
  Grid,
  GridItem,
  keyframes,
  Tag,
  Kbd,
  Image,
  shouldForwardProp,
  useColorMode,
  useColorModeValue,
  Heading,
  Container,
  LinkBox,
  LinkOverlay,
  Wrap
} from '@chakra-ui/react'
import { FaLinkedin, FaGithub, FaFilePdf } from 'react-icons/fa'
import { SunIcon, MoonIcon, EmailIcon } from '@chakra-ui/icons'
import { Canvas } from '@react-three/fiber'
import { useProgress } from '@react-three/drei'
import { motion, isValidMotionProp } from 'framer-motion'
import useKeyPress from '../hooks/useKeyPress'
import Scene from '../components/Scene'
import SpeechBox from '../components/SpeechBox'
import CustomSlide from '../components/Slide'
import { useWindowSize } from '../hooks/useWindowSize'
import { CounterContext } from './_app'
import { capitalone, pathfinder, restockBot, shopify } from '../util/phrases'

const ChakraBox = chakra(motion.div, {
  shouldForwardProp: prop => isValidMotionProp(prop) || shouldForwardProp(prop)
})

const bounce = keyframes`
  from { transform: translate3d(0, 0, 0); }
  to   { transform: translate3d(0, 50px, 0); }
}`

const animation = `${bounce} 600ms cubic-bezier(.7,0,1,1) alternate infinite`

const Draft = () => {
  const [loading, setLoading] = useState(true)
  const counterCtx = useContext(CounterContext)

  const domRef = useRef(null)

  const { progress } = useProgress()

  const { colorMode, toggleColorMode } = useColorMode()
  const gridColorMode = useColorModeValue('white', 'black')

  const windowHeight = useWindowSize().height
  const windowWidth = useWindowSize().width

  const rightArrow = useKeyPress('ArrowRight')
  const leftArrow = useKeyPress('ArrowLeft')

  // Checks if the right or left arrow key is pressed and changes the current speech box
  useEffect(() => {
    if (rightArrow) {
      if (counterCtx.counter < 4) {
        counterCtx.setCounter(counterCtx.counter + 1)
      }
    } else if (leftArrow) {
      if (counterCtx.counter > 1) {
        if (counterCtx.counter > 4) {
          counterCtx.setCounter(3)
        } else {
          counterCtx.setCounter(counterCtx.counter - 1)
        }
      }
    }
  }, [rightArrow, leftArrow])

  // Artificially set the loading state to false after 2 seconds
  useEffect(() => {
    if (progress === 100) {
      setTimeout(() => {
        setLoading(false)
      }, 500)
    }
  }, [progress])

  return (
    <>
      <Center
        id="preloader"
        position="fixed"
        h="100%"
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
        ref={domRef}
        id="main"
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
          top="50%"
          left="50%"
          h="100%"
          w="100vw"
          transform="translateX(-50%) translateY(-50%)">
          <Canvas
            shadows
            flat
            linear
            style={{ pointerEvents: 'none' }}
            eventSource={domRef}
            eventPrefix="page">
            <Scene
              zoom={windowHeight > 800 && windowWidth > 800 ? 1 : 0.7}
              currentSpeechBox={counterCtx.counter}
              portal={domRef}
            />
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
            isChecked={colorMode === 'dark'}
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
              color={counterCtx.counter === 1 && 'brand.purpleHighlight'}
              onClick={() => {
                counterCtx.setCounter(1)
              }}>
              Intro
            </Text>
            <Text
              as={Link}
              color={counterCtx.counter === 2 && 'brand.purpleHighlight'}
              onClick={() => {
                counterCtx.setCounter(2)
              }}>
              Experience
            </Text>
            <Text
              as={Link}
              color={counterCtx.counter === 3 && 'brand.purpleHighlight'}
              onClick={() => {
                counterCtx.setCounter(3)
              }}>
              Projects
            </Text>
            <Text
              as={Link}
              color={counterCtx.counter === 4 && 'brand.purpleHighlight'}
              onClick={() => {
                counterCtx.setCounter(4)
              }}>
              Contact Me
            </Text>
          </Flex>
        </Flex>
        <Flex
          id="progress-bar"
          position="fixed"
          h="100%"
          top="0"
          right="0"
          width="12px"
          zIndex="999">
          <ChakraBox
            animate={{
              height: `${counterCtx.counter * 25}%`
            }}
            transition={{ ease: 'easeInOut', duration: 1 }}
            h="0px"
            w="100%"
            bgColor={'brand.purpleHighlight'}
            border="1px black solid"
          />
        </Flex>
        <CustomSlide active={counterCtx.counter === 1}>
          <SpeechBox
            phrase="Hi! My name is Henry and I am a software engineer. I graduated on May 2022 with a degree in Finance and Computer Science."
            topNote="intro"
            subNote={
              <Text>
                You can also use the <Kbd>{'Arrow Keys'}</Kbd> to navigate
              </Text>
            }
            rightButton={() => counterCtx.setCounter(counterCtx.counter + 1)}
            active={!loading && counterCtx.counter === 1}
          />
        </CustomSlide>

        <CustomSlide active={counterCtx.counter === 2}>
          <Flex maxW="400px" flexDir="column">
            <Grid
              templateAreas={`"image main"
                              "image main"`}
              gridTemplateRows={'90px'}
              gridTemplateColumns={'100px 230px'}
              mb="16px"
              border="2px"
              bg={gridColorMode}>
              <GridItem area="image">
                <Center h="100%" p="10px">
                  <Image src="/work/guidewire.png" alt="guidewire logo" />
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
              bg={gridColorMode}
              mb="16px">
              <GridItem area="image">
                <Center h="100%" p="10px">
                  <Image src="/work/celestica.png" alt="celestica logo" />
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
            leftButton={() => counterCtx.setCounter(counterCtx.counter - 1)}
            rightButton={() => counterCtx.setCounter(counterCtx.counter + 1)}
            active={counterCtx.counter === 2}
          />
        </CustomSlide>
        <CustomSlide active={counterCtx.counter == 3}>
          <SpeechBox
            phrase="When I am not working, I like to work on small side projects to teach myself new technologies."
            leftButton={() => counterCtx.setCounter(counterCtx.counter - 1)}
            rightButton={() => counterCtx.setCounter(counterCtx.counter + 1)}
            active={counterCtx.counter == 3}
          />
        </CustomSlide>
        <CustomSlide active={counterCtx.counter == 4}>
          <Center h="100%" w="100%">
            <Stack
              direction={['column', 'column', 'row']}
              mt={['50px', '100px']}
              spacing="15px"
              border="2px"
              bgColor={colorMode === 'light' ? 'white' : 'black'}
              shadow="2xl"
              p="15px">
              <Button
                as={Link}
                href="https://drive.google.com/file/d/1hMK7dfK2RthUn4SdI-KmT5jnr0Dtikyh/view?usp=sharing"
                target="_blank"
                leftIcon={<FaFilePdf />}
                variant="outline"
                size="md"
                key="Resume">
                Resume
              </Button>
              <Button
                as={Link}
                href="mailto:henryho73@hotmail.com"
                target="_blank"
                leftIcon={<EmailIcon />}
                variant="outline"
                size="md"
                key="Email">
                Email
              </Button>
              <Button
                as={Link}
                href="https://github.com/hhenryhho"
                target="_blank"
                leftIcon={<FaGithub />}
                variant="outline"
                size="md"
                key="Github">
                Github
              </Button>
              <Button
                as={Link}
                href="https://www.linkedin.com/in/henh/"
                leftIcon={<FaLinkedin />}
                variant="outline"
                target="_blank"
                size="md"
                key="Linkedin">
                LinkedIn
              </Button>
            </Stack>
          </Center>
          <SpeechBox
            phrase="Want to connect? You can find me in these places!"
            leftButton={() => counterCtx.setCounter(counterCtx.counter - 1)}
            active={counterCtx.counter == 4}
          />
        </CustomSlide>
        <CustomSlide active={counterCtx.counter == 5}>
          <Container maxW="container.xl" overflowY="scroll">
            <Flex flexDir="column" h="100%" w="100%" align="center">
              <LinkBox
                maxW="xl"
                _hover={{
                  transform: 'scale(1.05)',
                  transition: 'all .4s ease'
                }}>
                <LinkOverlay
                  href="https://discord.com/invite/zcNwQT4r9w"
                  isExternal>
                  <Image
                    border="2px"
                    src="/projects/monitor.gif"
                    alt="GIF of gpu bot monitor"
                    shadow="2xl"
                    borderRadius="lg"
                    my="16px"
                  />
                </LinkOverlay>
              </LinkBox>
              <Flex
                flexDir="column"
                border="2px"
                bgColor={colorMode === 'light' ? 'white' : 'black'}
                shadow="2xl"
                p="15px">
                <Heading>About</Heading>
                <Text>
                  I built this bot in order to monitor the availability of
                  graphic cards during the shortage in early 2021. All cards
                  were constantly sold out due to miners buying them up. I
                  originally built this using web scapers but found it was too
                  slow, so I switched to a request based system by
                  reverse-engineering network calls made by the website. I also
                  built a discord bot to notify users when a card was available.
                </Text>
                <Heading>Technologies Used</Heading>
                <Wrap>
                  {restockBot.tech.map((tech, index) => (
                    <Tag key={index} mr="4px" mb="4px" variant="outline">
                      {tech}
                    </Tag>
                  ))}
                </Wrap>
                <Heading>Challenges</Heading>
                <Text>
                  The biggest challenge was figuring out how to get past
                  anti-bot protection on the websites. I found out quickly that
                  the website would block my IP if I made too many requests in a
                  short period of time. I had to figure out how to make the
                  requests look like they were coming from different people, so
                  I used multiple proxies to make the requests look like they
                  were coming from different locations. After a while, they
                  implemented Google&apos;s reCaptcha system, which added
                  another layer of complexity. I figured out how to bypass this
                  by researching how the system worked, and managed to
                  consistently get around it.
                </Text>
              </Flex>
            </Flex>
          </Container>
          <SpeechBox
            phrase={restockBot.desc}
            subNote={<Heading>{restockBot.name}</Heading>}
            leftButton={() => counterCtx.setCounter(3)}
            active={counterCtx.counter == 5}
          />
        </CustomSlide>
        <CustomSlide active={counterCtx.counter == 6}>
          <Container maxW="container.xl" overflowY="scroll">
            <Flex flexDir="column" h="100%" w="100%" align="center">
              <LinkBox
                maxW="xl"
                _hover={{
                  transform: 'scale(1.05)',
                  transition: 'all .4s ease'
                }}>
                <LinkOverlay
                  href="https://hhenryhho.github.io/PathfindingVisualJS/"
                  isExternal
                />
                <Image
                  border="2px"
                  src="/projects/pathfinder.gif"
                  alt="GIF of pathfinder visualizer"
                  borderRadius="lg"
                  shadow="2xl"
                  my="16px"
                />
              </LinkBox>
              <Flex
                flexDir="column"
                border="2px"
                bgColor={colorMode === 'light' ? 'white' : 'black'}
                shadow="2xl"
                p="15px">
                <Heading>About</Heading>
                <Text>
                  I built this project to teach myself basic HTML/CSS/JS. I had
                  just decided to add a major into Computer Science after 2
                  years of studying Finance, and wanted to learn some basic web
                  development. Additionally, I was also taking my intro to Data
                  Structures and Algorithms course, so I wanted to build
                  something that would help me visualize the algorithms I was
                  learning.
                </Text>
                <Heading>Technologies Used</Heading>
                <Wrap>
                  {pathfinder.tech.map((tech, index) => (
                    <Tag key={index} mr="4px" mb="4px" variant="outline">
                      {tech}
                    </Tag>
                  ))}
                </Wrap>
                <Heading>Challenges</Heading>
                <Text>
                  Looking back, this project was a bit of a mess. I had no idea
                  what I was doing, and I was just trying to get something
                  working. I only had experience with Python at this point, so
                  figuring out how HTML/CSS/JS worked together was a challenge
                  in itself.
                </Text>
              </Flex>
            </Flex>
          </Container>
          <SpeechBox
            phrase={pathfinder.desc}
            subNote={<Heading>{pathfinder.name}</Heading>}
            leftButton={() => counterCtx.setCounter(3)}
            active={counterCtx.counter == 6}
          />
        </CustomSlide>
        <CustomSlide active={counterCtx.counter == 7}>
          <Container maxW="container.xl" overflowY="scroll">
            <Flex flexDir="column" h="100%" w="100%" align="center">
              <LinkBox
                maxW="xl"
                _hover={{
                  transform: 'scale(1.05)',
                  transition: 'all .4s ease'
                }}>
                <LinkOverlay
                  href="https://spacestagram-woad.vercel.app/"
                  isExternal
                />
                <Image
                  border="2px"
                  src="/projects/shopify.gif"
                  alt="GIF of Shopify Instagram Clone"
                  shadow="2xl"
                  borderRadius="lg"
                  my="16px"
                />
              </LinkBox>
              <Flex
                flexDir="column"
                border="2px"
                bgColor={colorMode === 'light' ? 'white' : 'black'}
                shadow="2xl"
                p="15px">
                <Heading>About</Heading>
                <Text>
                  This was my take-home assignment for the Shopify Front End
                  Developer position in early 2022. The assignment was to build
                  a web app that would allow users to browse through the
                  NASA&apos;s Astronomy Picture of the Day API. I decided to
                  make it look like an instagram clone, because I thought that
                  it would be a fun challenge. I ended up making it to the final
                  round of the interview process, but unfortunately did not get
                  the job.
                </Text>
                <Heading>Technologies Used</Heading>
                <Wrap>
                  {shopify.tech.map((tech, index) => (
                    <Tag key={index} mr="4px" mb="4px" variant="outline">
                      {tech}
                    </Tag>
                  ))}
                </Wrap>
                <Heading>Challenges</Heading>
                <Text>
                  NASA has an extremely slow API, and figuring out how to make
                  the web app load quickly without making too many requests was
                  a challenge. I also self-imposed a limit of a day to work on
                  it, as I was also studying for my exams during this time.
                </Text>
              </Flex>
            </Flex>
          </Container>
          <SpeechBox
            phrase={shopify.desc}
            subNote={<Heading>{shopify.name}</Heading>}
            leftButton={() => counterCtx.setCounter(3)}
            active={counterCtx.counter == 7}
          />
        </CustomSlide>
        <CustomSlide active={counterCtx.counter == 8}>
          <Container maxW="container.xl" overflowY="scroll">
            <Flex flexDir="column" h="100%" w="100%" align="center">
              <LinkBox
                maxW="xl"
                _hover={{
                  transform: 'scale(1.05)',
                  transition: 'all .4s ease'
                }}>
                <LinkOverlay
                  href="https://capitalonetechnical.vercel.app/"
                  isExternal
                />
                <Image
                  border="2px"
                  src="/projects/c1tech.png"
                  alt="GIF of the Capital One Technical Assessment"
                  shadow="2xl"
                  borderRadius="lg"
                  my="16px"
                />
              </LinkBox>
              <Flex
                flexDir="column"
                border="2px"
                bgColor={colorMode === 'light' ? 'white' : 'black'}
                shadow="2xl"
                p="15px">
                <Heading>About</Heading>
                <Text>
                  This was my take-home assignment for the Capital One Software
                  Developer position in Summer 2022. The assignment was to build
                  a program that would calculate the max amount of points a
                  person could attain using a list of rules. A terminal based
                  program would&apos;ve sufficed, but to add more complexity, I
                  added an account and authentication system, working database
                  for storying transactions and connected it all to a visually
                  appealing front-end. I had to use dynamic programming to
                  calculate the max amount of points a person could attain, as
                  many of the rules conflicted with each other.
                </Text>
                <Heading>Technologies Used</Heading>
                <Wrap>
                  {capitalone.tech.map((tech, index) => (
                    <Tag key={index} mr="4px" mb="4px" variant="outline">
                      {tech}
                    </Tag>
                  ))}
                </Wrap>
                <Heading>Challenges</Heading>
                <Text>
                  Figuring out how to create user accounts was definitely
                  challenging. I had to design a database schema that would
                  allow me to keep track of users, and also store their
                  transaction history. Additionally, the problem itself was
                  hard, because the list of rules to calculate the points
                  conflicted with each other and required either linear
                  programming or dynamic programming to solve.
                </Text>
              </Flex>
            </Flex>
          </Container>
          <SpeechBox
            phrase={capitalone.desc}
            subNote={<Heading>{capitalone.name}</Heading>}
            leftButton={() => counterCtx.setCounter(3)}
            active={counterCtx.counter == 8}
          />
        </CustomSlide>
      </ChakraBox>
    </>
  )
}

export default Draft
