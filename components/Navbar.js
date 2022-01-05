/** @format */

import { Avatar } from '@chakra-ui/avatar'
import { IconButton } from '@chakra-ui/button'
import { Link, useColorMode } from '@chakra-ui/react'
import { Divider, Flex } from '@chakra-ui/layout'
import { WiMoonAltFirstQuarter } from 'react-icons/wi'

const Navbar = () => {
	const { colorMode, toggleColorMode } = useColorMode()
	return (
		<Flex
			pos='fixed'
			right='1'
			bottom='10'
			h='95vh'
			marginTop='2.5vh'
			borderRadius='30px'
			w='125px'
			flexDir='column'
			justifyContent='space-between'>
			<Flex
				p='5'
				flexDir='column'
				w='100%'
				alignItems='flex-end'
				as='nav'>
				<IconButton
					onClick={toggleColorMode}
					icon={<WiMoonAltFirstQuarter />}>
					Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
				</IconButton>
			</Flex>

			<Flex flexDir='column' h='14%' w='100%'>
				<Link href='#intro'>Intro</Link>
				<Link href='#about'>About</Link>
				<Link href='#experience'>Experience</Link>
				<Divider my={4} display='flex' />
				<Flex justify='center'>
					<Avatar size='sm' src='hen.png' />
				</Flex>
			</Flex>
		</Flex>
	)
}

export default Navbar
