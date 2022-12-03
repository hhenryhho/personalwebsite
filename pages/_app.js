import { useState, createContext } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../theme/theme'
import Fonts from '../util/activateFonts'

export const CounterContext = createContext()

function MyApp({ Component, pageProps }) {
  const [counter, setCounter] = useState(1)
  return (
    <ChakraProvider theme={theme}>
      <CounterContext.Provider value={{ counter, setCounter }}>
        <Fonts />
        <Component {...pageProps} />
      </CounterContext.Provider>
    </ChakraProvider>
  )
}

export default MyApp
