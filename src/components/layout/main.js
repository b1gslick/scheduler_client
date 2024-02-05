import Head from 'next/head'
import Navbar from '../navbar'
import { Box, Container } from '@chakra-ui/react'

const Main = ({ children, router }) => {
  return (
    <Box as='main' pt={8}>
      <Head>
        <meta name='viewport' content='width=device-width, initials-scale=1' />
        <title>Scheduler App</title>
      </Head>
      <Navbar path={router.asPath} />
      <Container maxW='container.md' pt={15}>
        {children}
      </Container>
    </Box>
  )
}

export default Main
