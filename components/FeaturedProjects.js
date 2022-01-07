/** @format */

import { Flex, Stack, Heading, Text } from '@chakra-ui/layout'
import { useMediaQuery } from '@chakra-ui/media-query'
import { useEffect, useState } from 'react'

import ProjectCard from './ProjectCard'
import ProjectCardLarge from './ProjectCardLarge'
import FadeInSection from './FadeInSection'
import { Divider } from '@chakra-ui/react'

const FeaturedProjects = ({ projects }) => {
	const [isLargerThan992] = useMediaQuery('(min-width: 992px)')
	const [isLargeScreen, setIsLargeScreen] = useState(false)

	useEffect(() => {
		if (isLargerThan992 !== isLargeScreen) {
			setIsLargeScreen(isLargerThan992)
		}
	}, [isLargerThan992, isLargeScreen])
	return (
		<FadeInSection id='projects' direction='fromBottom'>
			<Flex flexDir='column'>
				<Heading size='3xl'>Projects</Heading>
				<Divider my='15px'></Divider>
				<Flex flexDir='column' pt='15px'>
					<Stack spacing={[50, 200]}>
						{projects.map((project) =>
							isLargeScreen ? (
								<ProjectCardLarge
									key={project.title}
									project={project}
								/>
							) : (
								<ProjectCard
									key={project.title}
									project={project}
								/>
							)
						)}
					</Stack>
				</Flex>
			</Flex>
		</FadeInSection>
	)
}

export default FeaturedProjects
