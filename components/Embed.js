import { ExternalLinkIcon } from '@chakra-ui/icons'
import { Flex, Text, Center, Image, chakra } from '@chakra-ui/react'
import React from 'react'
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
const Embed = () => {
  return (
    <Flex
      id="phone-wrapper"
      flexDir="column"
      h="480px"
      w="220px"
      borderRadius="20px"
      bg="white">
      <Flex id="search-bar" boxShadow=" 0px 1px 1px -1px gray" p="10px">
        <Flex
          position="relative"
          h="30px"
          w="200px"
          bg="#DBDBDB"
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
            'border-radius': '10px',
            background: '#f1f1f1',
            margin: '0px 10px 20px 0px'
          },
          '::-webkit-scrollbar-thumb': {
            'border-radius': '10px',
            background: '#888'
          },
          '::-webkit-scrollbar-thumb:hover': {
            background: '#555'
          }
        }}>
        <Flex h="100%" w="100%" flexDir="column" p="5px" mb="200px">
          <Text fontSize="14px" textAlign="center">
            I try to use different tech stacks for each project. Hover over each
            card to see the tech stack used.
          </Text>
          <Text as="u">First Project</Text>
          <Image
            h="150px"
            w="200px"
            src="/projects/monitor.gif"
            alt="breaking bot gif"
          />
          <Text as="u">Second Project</Text>
          <Image
            h="150px"
            w="200px"
            src="/projects/pathfinder.gif"
            alt="pathfinder gif"
          />
          <Text as="u">Third Project</Text>
          <Image
            h="150px"
            w="200px"
            src="/projects/shopify.gif"
            alt="shopify gif"
          />
        </Flex>
      </Flex>
      <Flex></Flex>
      <Flex
        id="home-bar"
        h="4px"
        w="100px"
        position="fixed"
        bottom="3px"
        left="50%"
        bg="black"
        transform="translateX(-50%)"
        borderRadius="20px"
      />
    </Flex>
  )
}

export default Embed
