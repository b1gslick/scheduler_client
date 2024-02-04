import React from 'react'
import { Container, Box, Menu, Heading, Flex, MenuButton, IconButton, useColorModeValue } from '@chakra-ui/react'
import ThemeToggleButton from './theme-toggle-button'
import { HamburgerIcon } from '@chakra-ui/icons'

const Navbar = (props) => {
  return (
    <Box
      position='fixed'
      as='nav'
      w='100%'
      bg={useColorModeValue('#ffffff40', '#20202380')}
      style={{ backdropFilter: 'blur(10px' }}
      zIndex={1}
      {...props}
    >
      <Container display='flex' p={2} maxW='container.md' wrap='wrap' align='center' justify='space-between'>
        <Box flex={1} align='right'>
          <ThemeToggleButton />
        </Box>
      </Container>
    </Box>
  )
}

export default Navbar
