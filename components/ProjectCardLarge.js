/** @format */

import {
	Flex,
	Stack,
	Box,
	Heading,
	Text,
	Link,
} from '@chakra-ui/layout'
import { Image } from '@chakra-ui/image'
import { Tag } from '@chakra-ui/tag'
import BlobSVG from './BlobSVG'

const ProjectCardLarge = ({ project }) => {
	const Tags = project.techStack.map((item) => (
		<Tag
			bgColor='brand.325'
			color='brand.100'
			key={item}
			size='sm'
			p={2}
			mr={1}
			mb={1}>
			{item}
		</Tag>
	))
	console.log('ProjectLarge')

	return (
		<Flex flexDir='row'>
			<Image
				borderRadius='xl'
				objectFit='cover'
				w={500}
				src={project.previewImage}
				alt={project.title}
			/>
			<Box position='relative' w='100%'>
				<Heading textAlign='right' size='lg'>
					<Link
						href={project.siteLink}
						isExternal
						rel='noreferrer'
						target='_blank'
						aria-label='link to live project website'>
						{project.title}
					</Link>
				</Heading>
				<Box position='absolute' top={10} w={500}>
					<Box
						position='absolute'
						w='315px'
						top={120}
						left={150}>
						<Stack>
							<Text color='brand.100'>
								{project.description}
							</Text>
							<Flex flexWrap='wrap'>{Tags}</Flex>
						</Stack>
					</Box>
					<BlobSVG />
				</Box>
			</Box>
		</Flex>
	)
}

export default ProjectCardLarge
