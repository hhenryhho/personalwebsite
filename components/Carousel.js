import { Box, Flex, HStack } from '@chakra-ui/react'
import React from 'react'

const cardLength = { height: '200px', width: '300px' }

const defaultValues = {
  images: null,
  captions: null,
  index: 0,
  prevIndex: -1
}

const CardWithShadow = props => {
  return (
    <Flex position="relative" {...props}>
      <Box
        className="card-shadow"
        position="relative"
        h={cardLength.height}
        w={cardLength.width}
        left="2"
        bottom="-2"
        bgColor="gray.800"
        shadow="xl"></Box>
      <Box
        className="card-main"
        position="absolute"
        h={cardLength.height}
        w={cardLength.width}
        bgColor="brand.200"
        shadow="xl"></Box>
    </Flex>
  )
}

const Carousel = () => {
  return (
    <HStack spacing="15px" w="100%" pb="15px" zIndex="1" overflowY="hidden">
      <CardWithShadow />
      <CardWithShadow />
      <CardWithShadow />
      <CardWithShadow />
      <CardWithShadow />
    </HStack>
  )
}

export default Carousel
