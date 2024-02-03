import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '../libs/theme'
import ThemeToggleButton from '../components/theme-toggle-button'

import Layout from '../components/layout/main'
const SchedulerApp = ({ Component, pageProps, router }) => {
  return (
    <ChakraProvider theme={theme}>
      <Layout router={router}>
        <Component {...pageProps} key={router.route} />
      </Layout>
    </ChakraProvider>
  )
}

export default SchedulerApp
