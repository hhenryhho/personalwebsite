/** @format */
import { Stack, Text, Heading, Box, Flex } from '@chakra-ui/layout'
import { Button, Link } from '@chakra-ui/react'
import { FaLinkedin, FaGithub, FaFilePdf } from 'react-icons/fa'
import { useMediaQuery } from '@chakra-ui/media-query'
import { EmailIcon } from '@chakra-ui/icons'

import BlobSVG from './BlobSVG'
import Typewriter from 'typewriter-effect'
import FadeInSection from './FadeInSection'

const Intro = () => {
	const [isLargerThan768] = useMediaQuery('(min-width: 600px)')
	const contactButtonGroupItems = [
		<Button
			as={Link}
			href='https://resume.creddle.io/resume/3hnt1dw8xkg'
			target='_blank'
			leftIcon={<FaFilePdf />}
			size={isLargerThan768 ? 'md' : 'sm'}>
			Resume
		</Button>,
		<Button
			as={Link}
			href='mailto:henryho73@hotmail.com'
			target='_blank'
			leftIcon={<EmailIcon />}
			size={isLargerThan768 ? 'md' : 'sm'}>
			Email
		</Button>,
		<Button
			as={Link}
			href='https://github.com/hhenryhho'
			target='_blank'
			leftIcon={<FaGithub />}
			size={isLargerThan768 ? 'md' : 'sm'}>
			Github
		</Button>,
		<Button
			as={Link}
			href='https://www.linkedin.com/in/henh/'
			leftIcon={<FaLinkedin />}
			target='_blank'
			size={isLargerThan768 ? 'md' : 'sm'}>
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
				<Heading fontSize='4xl'>
					<Typewriter
						options={{
							delay: 100,
							skipAddStyles: true,
							loop: true,
						}}
						onInit={(typewriter) => {
							typewriter
								.typeString('Hi, my name is Henry Ho')
								.start()
						}}></Typewriter>
				</Heading>
			</Box>
			<Stack mt='100px' spacing='15px' zIndex={2}>
				{contactButtonGroupItems.map((item, index) => (
					<Box key={index}>{item}</Box>
				))}
			</Stack>
			<Box position='absolute' left={10} w='500px' zIndex={1}>
				<BlobSVG />
			</Box>
		</Flex>
	)
}

export default Intro
