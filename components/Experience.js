/** @format */

import {
	Flex,
	Heading,
	Text,
	Tabs,
	TabList,
	TabPanels,
	Tab,
	TabPanel,
	Stack,
	Divider,
} from '@chakra-ui/react'
import { chakra } from '@chakra-ui/react'
import { FaAngleRight } from 'react-icons/fa'
import { useMediaQuery } from '@chakra-ui/media-query'
import FadeInSection from './FadeInSection'

const Experience = () => {
	const [isLargerThan992] = useMediaQuery('(min-width: 992px)')

	function DataTabs({ data }) {
		return (
			<Tabs
				variant='soft-rounded'
				orientation={
					isLargerThan992 ? 'vertical' : 'horizontal'
				}
				pt='15px'>
				<TabList>
					{data.map((tab, index) => (
						<Tab my={5} mr={5} id={index} key={index}>
							{tab.company}
						</Tab>
					))}
				</TabList>

				<TabPanels h='200px'>
					{data.map((tab, index) => (
						<TabPanel id={index} key={index}>
							<Stack pb='15px'>
								<Heading size='md'>
									{tab.jobTitle} @ {tab.company}
								</Heading>
								<Text>{tab.duration}</Text>
							</Stack>
							<Stack spacing='15px'>
								{tab.description.map(
									(line, index) => (
										<Flex key={index}>
											<chakra.p pt='4px'>
												<FaAngleRight></FaAngleRight>
											</chakra.p>
											<Text>{line}</Text>
										</Flex>
									)
								)}
							</Stack>
						</TabPanel>
					))}
				</TabPanels>
			</Tabs>
		)
	}

	const experienceObjects = [
		{
			company: 'Western',
			jobTitle: 'Front-End Developer',
			duration: 'SEPTEMBER 2021 - APRIL 2022',
			description: [
				'Did stuff using PARN stack, utilized knowledge from courses',
				'Combined a lot of stuff from courses',
			],
		},
		{
			company: 'Celestica',
			jobTitle: 'Finance Intern',
			duration: 'MAY 2020 - AUGUST 2021',
			description: [
				'Did finance stuff for 16 months, worked with a team to do finance',
			],
		},
	]

	return (
		<FadeInSection id='experience' direction='fromBottom'>
			<Flex h={['70vh', '60vh']} flexDir='column'>
				<Heading size='3xl'>Experience</Heading>
				<Divider my='15px'></Divider>
				<Flex flexDir='column' maxW='700px'>
					<DataTabs data={experienceObjects} />
				</Flex>
			</Flex>
		</FadeInSection>
	)
}

export default Experience
