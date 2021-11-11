import { Flex, Heading, Box } from '@chakra-ui/react'

const Intro = ({ children }) => {
  return (
    <Flex
      h='100vh'
      borderRadius='30px'
      w='80%'
      flexDir='column'
      alignItems='left'
      justifyContent='space-between'>
      <Heading size='4xl'>Hi, my name is Henry</Heading>
    </Flex>
  )
}

export default Intro
