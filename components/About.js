/** @format */

import {
	Flex,
	Divider,
	Heading,
	Stack,
	Image,
	Text,
} from '@chakra-ui/react'
import FadeInSection from './FadeInSection'

const About = () => {
	return (
		<FadeInSection id='about' direction='fromBottom'>
			<Flex h={['100vh', '60vh']} flexDir='column'>
				<Heading size='3xl'>About me</Heading>
				<Divider my='15px'></Divider>
				<Flex flexDir={['column', 'row']}>
					<Stack
						m='auto'
						py='15px'
						spacing='15px'
						maxW='500px'>
						<Text fontSize='lg'>
							I am an upcoming graduate at{' '}
							<b>Western University</b> pursuing a
							dual-degree in{' '}
							<b>Finance & Computer Science</b>. I was
							originally only a Finance student, however
							I discovered my passion for development
							after competing in a hackathon during my
							third year. I am currently working as an{' '}
							<b>App/Web developer</b> for the
							department of Earth Sciences / Physics and
							Astronomy at my University.
						</Text>
						<Text fontSize='lg'>
							I love to learn, and I'm interested in all
							facets of software development.
						</Text>
						<Text fontSize='lg'>
							In my spare time, I like to cook and play
							video games (I am Diamond in Valorant).
						</Text>
					</Stack>
					<Image
						m='auto'
						borderRadius='full'
						src='headshot.jpeg'
						objectFit='cover'
						boxSize='300px'
					/>
				</Flex>
			</Flex>
		</FadeInSection>
	)
}

export default About
