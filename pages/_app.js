import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../theme/theme'
import Fonts from '../util/activateFonts'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
