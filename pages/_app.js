import { useState, createContext } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../theme/theme'
import Head from 'next/head'
import Fonts from '../util/activateFonts'

export const CounterContext = createContext()

function MyApp({ Component, pageProps }) {
  const [counter, setCounter] = useState(1)
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>Hen&aposs Farmhouse</title>
        <link rel="icon" href="hen.png" />
      </Head>
      <CounterContext.Provider value={{ counter, setCounter }}>
        <Fonts />
        <Component {...pageProps} />
      </CounterContext.Provider>
    </ChakraProvider>
  )
}

export default MyApp
