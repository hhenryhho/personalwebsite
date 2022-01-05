/** @format */
import { Stack, Text, Heading, Box, Flex } from '@chakra-ui/layout'
import { Button, Link } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { FaLinkedin, FaGithub, FaFilePdf } from 'react-icons/fa'
import { useMediaQuery } from '@chakra-ui/media-query'
import { EmailIcon } from '@chakra-ui/icons'

import BlobSVG from './BlobSVG'
import Typewriter from 'typewriter-effect'
import FadeInSection from './FadeInSection'

const Intro = () => {
	const [isLargerThan768] = useMediaQuery('(min-width: 600px)')
	const [isLargeScreen, setIsLargeScreen] = useState(false)

	useEffect(() => {
		if (isLargerThan768 !== isLargeScreen) {
			setIsLargeScreen(isLargerThan768)
		}
	}, [isLargerThan768, isLargeScreen])
	const contactButtonGroupItems = [
		<Button
			as={Link}
			href='https://resume.creddle.io/resume/3hnt1dw8xkg'
			target='_blank'
			leftIcon={<FaFilePdf />}
			size={isLargeScreen ? 'md' : 'sm'}
			key='Resume'>
			Resume
		</Button>,
		<Button
			as={Link}
			href='mailto:henryho73@hotmail.com'
			target='_blank'
			leftIcon={<EmailIcon />}
			size={isLargeScreen ? 'md' : 'sm'}
			key='Email'>
			Email
		</Button>,
		<Button
			as={Link}
			href='https://github.com/hhenryhho'
			target='_blank'
			leftIcon={<FaGithub />}
			size={isLargeScreen ? 'md' : 'sm'}
			key='Github'>
			Github
		</Button>,
		<Button
			as={Link}
			href='https://www.linkedin.com/in/henh/'
			leftIcon={<FaLinkedin />}
			target='_blank'
			size={isLargeScreen ? 'md' : 'sm'}
			key='Linkedin'>
			LinkedIn
		</Button>,
	]

	return (
		<Flex
			flexDir='column'
			h='100vh'
			pt={[50, 150]}
			pb={[50, 50]}
			id='intro'>
			<Box>
				<Heading fontSize={['3xl', '4xl']}>
					<Typewriter
						options={{
							delay: 100,
							skipAddStyles: true,
						}}
						onInit={(typewriter) => {
							typewriter
								.typeString('Hi, my name is Henry Ho')
								.start()
						}}></Typewriter>
				</Heading>
			</Box>
			<Box position='relative'>
				<Box
					position='absolute'
					left={['-80px', '-250px']}
					w={['400px', '500px']}>
					<BlobSVG />
				</Box>
				<Stack mt={['150px', '190px']} spacing='15px'>
					{contactButtonGroupItems.map((item, index) => (
						<Box
							key={index}
							align={
								isLargeScreen ? 'start' : 'center'
							}>
							{item}
						</Box>
					))}
				</Stack>
			</Box>
		</Flex>
	)
}

export default Intro
