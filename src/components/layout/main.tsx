import React from 'react'
import Head from 'next/head'
import Navbar from '../navbar'
import { Box, Container } from '@chakra-ui/react'

const Main = ({ children, router }) => {
  return (
    <Box as='main' pb={8}>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>Scheduler App</title>
        <Navbar />

        <Container maxW='container.md' pt={14}>
          {children}
        </Container>
      </Head>
    </Box>
  )
}

export default Main
