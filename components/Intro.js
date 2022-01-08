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
	const [isLargerThan992] = useMediaQuery('(min-width: 992px)')
	const [isLargeScreen, setIsLargeScreen] = useState(false)

	useEffect(() => {
		if (isLargerThan992 !== isLargeScreen) {
			setIsLargeScreen(isLargerThan992)
		}
	}, [isLargerThan992, isLargeScreen])
	const contactButtonGroupItems = [
		<Button
			as={Link}
			href='https://resume.creddle.io/resume/3hnt1dw8xkg'
			target='_blank'
			leftIcon={<FaFilePdf />}
			size='md'
			key='Resume'>
			Resume
		</Button>,
		<Button
			as={Link}
			href='mailto:henryho73@hotmail.com'
			target='_blank'
			leftIcon={<EmailIcon />}
			size='md'
			key='Email'>
			Email
		</Button>,
		<Button
			as={Link}
			href='https://github.com/hhenryhho'
			target='_blank'
			leftIcon={<FaGithub />}
			size='md'
			key='Github'>
			Github
		</Button>,
		<Button
			as={Link}
			href='https://www.linkedin.com/in/henh/'
			leftIcon={<FaLinkedin />}
			target='_blank'
			size='md'
			key='Linkedin'>
			LinkedIn
		</Button>,
	]

	return (
		<Flex
			flexDir='column'
			pt={[50, 150]}
			pb={[100, 300]}
			id='intro'>
			<Flex
				m='auto'
				w='90%'
				flexDir='column'
				alignItems='center'>
				<Text fontSize={['md', 'lg']}>Hi, my name is </Text>
				<Heading fontSize={['3xl', '4.3rem']}>
					Henry Ho.
				</Heading>
				<Text textAlign='center' fontSize={['md', 'lg']}>
					I am a software developer with a passion for
					full-stack development.
				</Text>
				<Text textAlign='center' fontSize={['md', 'lg']}>
					I love to learn new things and I am constantly
					exploring new technology.
				</Text>
			</Flex>
			<Flex m='auto' position='relative'>
				<Stack
					direction={isLargeScreen ? 'row' : 'column'}
					mt={['50px', '100px']}
					spacing='15px'>
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
			</Flex>
		</Flex>
	)
}

export default Intro
