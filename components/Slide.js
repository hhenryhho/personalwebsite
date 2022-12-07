import { Flex, chakra, shouldForwardProp } from '@chakra-ui/react'
import { motion, isValidMotionProp } from 'framer-motion'
const ChakraBox = chakra(motion.div, {
  shouldForwardProp: prop => isValidMotionProp(prop) || shouldForwardProp(prop)
})

const CustomSlide = ({ active, children }) => {
  return (
    <ChakraBox
      position="fixed"
      h="100%"
      w="100vw"
      initial={{ x: '120vw' }}
      animate={{ x: !active ? '100vw' : 0 }}
      transition={{ ease: 'easeOut', duration: 0.3 }}
      overflow="auto"
      overscrollBehaviorY="contain">
      <Flex
        position="absolute"
        flexDir="column"
        justify="end"
        align="center"
        h="100vh"
        w="100%"
        pb={['0px', '0px', '0px', '80px']}>
        {children}
      </Flex>
    </ChakraBox>
  )
}

export default CustomSlide
