/** @format */

import { Flex, Container } from '@chakra-ui/layout'
import Head from 'next/head'
import Intro from '../components/Intro'
import About from '../components/About'
import Navbar from '../components/Navbar'
import Experience from '../components/Experience'
import { useMediaQuery } from '@chakra-ui/media-query'
import FeaturedProjects from '../components/FeaturedProjects'
import Footer from '../components/Footer'

const Home = () => {
	const workingProjects = [
		{
			title: 'Restock Bot',
			siteLink: 'Website1',
			previewImage: 'monitor.gif',
			techStack: ['Python', 'Heroku'],
			description:
				'A script that would notify users when certain products were restocked, and automatically buy them.',
		},
	]
	const [isLargerThan600] = useMediaQuery('(min-width: 600px)')
	return (
		<Flex>
			<Container maxW='container.lg'>
				<Head>
					<title>Hen</title>
				</Head>
				<Intro></Intro>
				<About></About>
				<Experience></Experience>
				<FeaturedProjects
					projects={workingProjects}></FeaturedProjects>
				{isLargerThan600 ? <Navbar /> : ''}
				<Footer></Footer>
			</Container>
		</Flex>
	)
}

export default Home
