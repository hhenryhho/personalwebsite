/** @format */

import {
	Flex,
	Stack,
	Box,
	Heading,
	Text,
	Divider,
	Link,
} from '@chakra-ui/layout'
import { Tag } from '@chakra-ui/tag'
import NextImage from 'next/image'

const ProjectCard = ({ project }) => {
	const Tags = project.techStack.map((item) => (
		<Tag key={item} size='sm' p={2} mr={1} mb={1}>
			{item}
		</Tag>
	))
	console.log('ProjectSmall')
	return (
		<Box>
			<Flex
				direction='column'
				position='relative'
				transition='all 0.5s ease'>
				<Box flex={1} position='relative' m='auto'>
					<NextImage
						src={project.previewImage}
						alt={project.title}
						height={220}
						width={350}
						objectFit='contain'
					/>
				</Box>
				<Box position='relative'>
					<Stack p={2}>
						<Flex
							direction='row'
							alignItems='center'></Flex>
						<Stack>
							<Flex flexWrap='wrap'>{Tags}</Flex>
							<Divider />
							<Text variant='lead'>
								{project.description}
							</Text>
						</Stack>
					</Stack>
				</Box>
			</Flex>
		</Box>
	)
}

export default ProjectCard
