import { Flex, Text, Link, useColorModeValue } from '@chakra-ui/react'
import { useEffect, useRef } from 'react'
import Typewriter from 'typewriter-effect'

/**
 * React component used to create a RPG styled speech box.
 *
 * @param {string}           phrases       an string to be typed inside the box
 * @param {string}           subNote       a string to be displayed below the box
 * @param {Function}         leftButton    a function to be called when the left button is clicked
 * @param {Function}         rightButton   a function to be called when the right button is clicked
 * @param {boolean}          active      a boolean to determine if the typewriter should be typing
 */
const SpeechBox = ({ phrase, subNote, leftButton, rightButton, active }) => {
  const colorMode = useColorModeValue('white', 'black')
  const typewriterRef = useRef(null)
  useEffect(() => {
    if (active && typewriterRef.current) {
      typewriterRef.current.start()
    }
  }, [active, typewriterRef.current])
  return (
    <Flex flexDir="column">
      <Flex
        w={['100vw', '100vw', '500px']}
        justify="center"
        visibility={['hidden', 'hidden', 'visible']}>
        {subNote}
      </Flex>
      <Flex
        position="relative"
        h={['130px', '130px', '130px']}
        w={['100vw', '100vw', '500px']}
        justify="center"
        align="center"
        border="2px"
        bgColor={colorMode}
        shadow="2xl"
        p="15px">
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
        {leftButton && (
          <Link
            position="absolute"
            bottom="0"
            left="0"
            onClick={() => {
              leftButton()
            }}>
            Back
          </Link>
        )}
        {rightButton && (
          <Link
            position="absolute"
            bottom="0"
            right="0"
            onClick={() => {
              rightButton()
            }}>
            Continue
          </Link>
        )}
      </Flex>
    </Flex>
  )
}

export default SpeechBox
