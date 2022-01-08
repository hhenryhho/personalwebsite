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
			right='30'
			bottom='10'
			h='95vh'
			marginTop='2.5vh'
			borderRadius='30px'
			w='50px'
			flexDir='column'
			justifyContent='space-between'>
			<Flex
				p='5'
				flexDir='column'
				w='100%'
				alignItems='center'
				as='nav'>
				<IconButton
					onClick={toggleColorMode}
					icon={<WiMoonAltFirstQuarter />}>
					Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
				</IconButton>
			</Flex>

			<Flex flexDir='column' w='100%'>
				<Divider my={4} display='flex' />
				<Flex justify='center'>
					<Avatar size='sm' src='hen.png' />
				</Flex>
			</Flex>
		</Flex>
	)
}

export default Navbar
