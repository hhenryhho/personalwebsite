import { Flex, Spinner, Text } from '@chakra-ui/react'
// https://github.com/vercel/next.js/discussions/35773
import Typewriter from 'typewriter-effect'

const SpeechBox = ({ typewriterRef, phrase, children }, props) => {
  return (
    <Flex
      h="100%"
      w="100%"
      position="absolute"
      justify="center"
      align="end"
      scrollSnapAlign="start">
      <Flex
        h="100px"
        w={['200px', '300px', '500px']}
        justify="center"
        align="center"
        border="3px solid black"
        color="black"
        bgColor="white"
        shadow="2xl"
        px="20px"
        mb="150px"
        zIndex={2}>
        <Text as="div" textAlign="center">
          {phrase && typewriterRef ? (
            <Typewriter
              options={{
                delay: 50
              }}
              onInit={typewriter => {
                typewriterRef.current = typewriter
                typewriter.typeString(phrase)
              }}
            />
          ) : (
            <Spinner />
          )}
        </Text>
        {children}
      </Flex>
    </Flex>
  )
}

export default SpeechBox
