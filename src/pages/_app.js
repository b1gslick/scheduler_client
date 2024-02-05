import { ChakraProvider } from '@chakra-ui/react'
import Layout from '../components/layout/main'

const Scheduler = ({ Component, pageProps, router }) => {
  return (
    <ChakraProvider>
      <Layout router={router}>
        <Component {...pageProps} key={router.router} />
      </Layout>
    </ChakraProvider>
  )
}

export default Scheduler
