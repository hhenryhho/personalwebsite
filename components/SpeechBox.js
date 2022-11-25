import { Flex, Text } from '@chakra-ui/react'
import Typewriter from 'typewriter-effect'

const SpeechBox = ({ typewriterRef, phrase, children }) => {
  return (
    <Flex
      position="absolute"
      h={['160px', '130px', '130px']}
      w={['100vw', '100vw', '500px']}
      left="50%"
      transform="translateX(-50%)"
      bottom="0"
      justify="center"
      align="center"
      border="1px solid black"
      color="black"
      bgColor="white"
      shadow="2xl"
      p="15px"
      mb={['0px', '0px', '150px']}
      zIndex="999">
      <Text as="div" textAlign="center">
        {phrase && typewriterRef && (
          <Typewriter
            options={{
              delay: 50
            }}
            onInit={typewriter => {
              typewriterRef.current = typewriter
              typewriter.typeString(phrase)
            }}
          />
        )}
      </Text>
      {children}
    </Flex>
  )
}

export default SpeechBox
