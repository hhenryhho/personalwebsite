import { Flex, Text, Kbd } from '@chakra-ui/react'
import { useEffect } from 'react'
import Typewriter from 'typewriter-effect'

const SpeechBox = ({ typewriterRef, phrase, subNote, children }) => {
  return (
    <Flex
      position="absolute"
      left="50%"
      transform="translateX(-50%)"
      bottom="0"
      flexDir="column"
      mb={['0px', '0px', '10vh']}>
      <Flex w={['100vw', '100vw', '500px']} justify="center">
        {subNote}
      </Flex>
      <Flex
        h={['160px', '130px', '130px']}
        w={['100vw', '100vw', '500px']}
        justify="center"
        align="center"
        border="1px solid black"
        color="black"
        bgColor="white"
        shadow="2xl"
        p="15px"
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
    </Flex>
  )
}

export default SpeechBox
