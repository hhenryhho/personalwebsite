import { chakra, shouldForwardProp, Text } from '@chakra-ui/react'
import { motion, isValidMotionProp } from 'framer-motion'
const ChakraBox = chakra(motion.div, {
  shouldForwardProp: prop => isValidMotionProp(prop) || shouldForwardProp(prop)
})

const CustomSlide = ({ active, children }) => {
  return (
    <ChakraBox
      position="fixed"
      bottom="0"
      left="50%"
      initial={{ x: '120vw' }}
      animate={{ x: !active ? '100vw' : 0 }}
      transition={{ ease: 'easeOut', duration: 0.3 }}
      zIndex={9999}>
      {children}
    </ChakraBox>
  )
}

export default CustomSlide
