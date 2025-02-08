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
      <FormSelector />
    </MantineProvider>
  )
}

export default App
