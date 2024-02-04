import * as React from 'react'
import { Container, Box, Heading } from '@chakra-ui/react'

const Page = () => {
  return (
    <Container>
      <Box display={{ md: 'flex' }}>
        <Heading as='h2' variant='page=title'></Heading>
      </Box>
    </Container>
  )
}

export default Page
