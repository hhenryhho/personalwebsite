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
      siteLink: 'https://discord.gg/zcNwQT4r9w',
      previewImage: '/monitor.gif',
      techStack: ['Python', 'Heroku'],
      description: [
        'A script that would notify users when certain products were restocked, and automatically buy them. ',
        'Generated over $10,000 in revenue and a userbase of 50 clients. '
      ]
    },
    {
      title: 'Shopify Front End Challenge',
      siteLink: 'https://spacestagram-woad.vercel.app/',
      previewImage: '/shopify.gif',
      techStack: ['ReactJS', 'NextJS', 'Chakra UI', 'Vercel'],
      description: [
        'This project was created for the Shopify Front End Developer Intern Challenge - Summer 2022 ',
        'This website shares photos from NASA Open API. '
      ]
    },
    {
      title: 'Pathfinding Visualizer',
      siteLink: 'https://hhenryhho.github.io/PathfindingVisualJS/',
      previewImage: '/pathfinder.gif',
      techStack: ['HTML', 'CSS', 'Javscript'],
      description:
        'A simple pathfinding visualizer that demonstrates the breadth first traversal.'
    }
  ]
  const [isLargerThan992] = useMediaQuery('(min-width: 992px)')
  return (
    <Flex>
      <Container maxW="container.lg">
        <Head>
          <title>Hen</title>
        </Head>
        <Intro></Intro>
        <About></About>
        <Experience></Experience>
        <FeaturedProjects projects={workingProjects}></FeaturedProjects>
        <Footer></Footer>
        {isLargerThan992 ? <Navbar /> : ''}
      </Container>
    </Flex>
  )
}

export default Home
