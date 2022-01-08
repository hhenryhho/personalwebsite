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
								<Heading variant='reverse' size='md'>
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
				'Developed full stack solutions for web/desktop version of iOS application using AngularJS, Node.js, PostgreSQL, and Express',
				'Utilized APIs to process, analyze, and render user data for web application',
				'Presented weekly status reports and discussed future project requirements with team members',
			],
		},
		{
			company: 'Celestica',
			jobTitle: 'Finance Intern',
			duration: 'MAY 2020 - AUGUST 2021',
			description: [
				'Re-engineered financial analytical files by learning VBA to implement file specific macros which resulted in an overall efficiency improvement of over 90%',
				"Assisted in creating monthly and quarterly reports, presentations, and resources for managerial use for meetings with Celestica's executive leadership team",
			],
		},
	]

	return (
		<FadeInSection id='experience' direction='fromBottom'>
			<Flex mb={[225, 100]} flexDir='column'>
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
