import { Avatar } from '@chakra-ui/avatar'
import { IconButton } from '@chakra-ui/button'
import { Divider, Flex, Heading, Text } from '@chakra-ui/layout'
import { FiMenu } from 'react-icons/fi'
import React, { useState } from 'react'

const links = [
  <a href='/'>/home</a>,
  <a href='#about'>/about</a>,
  <a href='#experience'>/experience</a>,
  <a href='#projects'>/projects</a>,
]

const Navbar = () => {
  const [navSize, changeNavSize] = useState('large')
  return (
    <Flex
      pos='fixed'
      right='5'
      bottom='5'
      h='95vh'
      marginTop='2.5vh'
      boxShadow='0 4px 12px 0 rgba(0,0,0,0.2)'
      borderRadius='30px'
      w={navSize == 'small' ? '75px' : '200px'}
      flexDir='column'
      justifyContent='space-between'>
      <Flex
        p='5'
        flexDir='column'
        w='100%'
        alignItems={navSize == 'small' ? 'center' : 'flex-end'}
        as='nav'>
        <IconButton
          background='none'
          mt={5}
          _hover={{
            background: 'none',
          }}
          icon={<FiMenu />}
          onClick={() => {
            if (navSize == 'small') changeNavSize('large')
            else changeNavSize('small')
          }}></IconButton>
      </Flex>
      <Flex
        p='5'
        flexDir='column'
        h='70px'
        w='100%'
        alignItems={navSize == 'small' ? 'center' : 'flex-center'}
        mb={6}>
        <Divider display={navSize == 'small' ? 'flex' : 'flex'} />
        <Flex mt={4} align='center'>
          <Avatar size='sm' src='hen.png' />
          <Flex
            flexDir='column'
            ml={4}
            display={navSize == 'small' ? 'none' : 'flex'}>
            <Heading as='h3' size='sm'>
              Henry Ho
            </Heading>
            <Text color='grey'>Developer</Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Navbar
