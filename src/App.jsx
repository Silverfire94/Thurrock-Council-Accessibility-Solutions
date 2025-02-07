import { useState } from 'react'
import './App.css'
import FormSelector from './FormSelector'
import { Container } from '@mantine/core';

import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';

function App() {
  const [count, setCount] = useState(0)
  
  return (
    <MantineProvider>
      <Container size="xs" pt={60} pb={60}>
        <FormSelector />
      </Container>
    </MantineProvider>
  )
}

export default App
