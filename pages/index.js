import { Flex, Container } from '@chakra-ui/layout'
import Head from 'next/head'
import Intro from '../components/Intro'
import Navbar from '../components/Navbar'
import Projects from '../components/Projects'

function Home() {
  return (
    <>
      <Container>
        <Head>
          <title>Hen</title>
        </Head>
        <Intro></Intro>
        <Projects></Projects>
      </Container>
      <Navbar />
    </>
  )
}

export default Home
