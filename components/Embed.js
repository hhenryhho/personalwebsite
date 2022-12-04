import { ExternalLinkIcon } from '@chakra-ui/icons'
import {
  Flex,
  Text,
  Center,
  Image,
  LinkOverlay,
  LinkBox
} from '@chakra-ui/react'

const Embed = ({ colorMode, context }) => {
  const phoneBgColor = colorMode === 'light' ? '#FFFFFF' : '#202124'
  const searchBarColor = colorMode === 'light' ? '#DBDBDB' : '#303134'
  const homebarColor = colorMode === 'light' ? 'black' : 'white'

  return (
    <Flex
      position="relative"
      id="phone-wrapper"
      flexDir="column"
      h="480px"
      w="220px"
      borderRadius="20px"
      bg={phoneBgColor}>
      <Flex id="search-bar" boxShadow=" 0px 1px 1px -1px gray" p="10px">
        <Flex
          position="relative"
          h="30px"
          w="200px"
          bg={searchBarColor}
          borderRadius="20px">
          <Center h="100%" w="100%">
            <Text fontSize="14px">henryho.dev/projects</Text>
          </Center>
          <Flex
            position="absolute"
            top="50%"
            right="5px"
            transform="translateY(-50%)">
            <ExternalLinkIcon />
          </Flex>
        </Flex>
      </Flex>
      <Flex
        id="website-content"
        flexDir="column"
        h="100%"
        borderBottomRadius="20px"
        overflowY="scroll"
        sx={{
          '::-webkit-scrollbar': {
            width: '4px'
          },
          '::-webkit-scrollbar-track': {
            borderRadius: '10px',
            background: '#f1f1f1',
            margin: '0px 10px 20px 0px'
          },
          '::-webkit-scrollbar-thumb': {
            borderRadius: '10px',
            background: '#888'
          },
          '::-webkit-scrollbar-thumb:hover': {
            background: '#555'
          }
        }}>
        <Flex h="100%" w="100%" flexDir="column" p="5px" mb="200px">
          <Flex flexDir="column" align="center">
            <Text fontSize="20px" textAlign="center">
              Scroll through this phone and click on projects to learn more!
            </Text>
            <LinkBox as="article">
              <LinkOverlay
                onClick={() => context.setCounter(5)}
                cursor="pointer"
              />
              <Text as="u">Graphic Card Bot</Text>
              <Image
                h="150px"
                w="200px"
                src="/projects/monitor.gif"
                alt="breaking bot gif"
              />
            </LinkBox>
          </Flex>
          <Flex flexDir="column" align="center">
            <LinkBox>
              <LinkOverlay
                onClick={() => context.setCounter(6)}
                cursor="pointer"
              />
              <Text as="u">Pathfinding Visualizer</Text>
              <Image
                h="150px"
                w="200px"
                src="/projects/pathfinder.gif"
                alt="pathfinder gif"
              />
            </LinkBox>
          </Flex>
          <Flex flexDir="column" align="center">
            <LinkBox>
              <LinkOverlay
                onClick={() => context.setCounter(7)}
                cursor="pointer"
              />
              <Text as="u">Instagram Clone</Text>
              <Image
                h="150px"
                w="200px"
                src="/projects/shopify.gif"
                alt="shopify gif"
              />
            </LinkBox>
          </Flex>
          <Flex flexDir="column" align="center">
            <LinkBox>
              <LinkOverlay
                onClick={() => context.setCounter(8)}
                cursor="pointer"
              />
              <Text as="u">Capital One Challenge</Text>
              <Image
                h="150px"
                w="200px"
                src="/projects/c1tech.png"
                alt="shopify gif"
              />
            </LinkBox>
          </Flex>
        </Flex>
      </Flex>
      <Flex
        id="home-bar"
        h="4px"
        w="100px"
        position="fixed"
        bottom="3px"
        left="50%"
        bg={homebarColor}
        transform="translateX(-50%)"
        borderRadius="20px"
      />
    </Flex>
  )
}

export default Embed
