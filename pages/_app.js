import { useState, createContext } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../theme/theme'
import Head from 'next/head'
import Fonts from '../util/activateFonts'
import { Analytics } from '@vercel/analytics/react'

export const CounterContext = createContext()

function MyApp({ Component, pageProps }) {
  const [counter, setCounter] = useState(1)
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>Hen&apos;s Farmhouse</title>
        <link rel="icon" href="hen.png" />
        <meta property="og:title" content="Hen's Farmhouse" />
        <meta
          property="og:image"
          content="https://cdn.discordapp.com/attachments/940143076188508241/1049389626676232212/image.png"
        />
        <meta property="og:image:type" content="image/png" />
        <meta
          property="og:description"
          content="Portfolio website for Henry Ho"
        />
        <meta property="og:url" content="https://www.henryho.dev/" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="627" />
        <meta property="og:type" content="website" />
      </Head>
      <CounterContext.Provider value={{ counter, setCounter }}>
        <Fonts />
        <Analytics />
        <Component {...pageProps} />
      </CounterContext.Provider>
    </ChakraProvider>
  )
}

export default MyApp
