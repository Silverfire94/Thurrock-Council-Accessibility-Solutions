import { useState } from 'react'
import './App.css'
import FormSelector from './FormSelector'

import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';

function App() {
  const [count, setCount] = useState(0)
  
  return (
    <MantineProvider>
      {/* <GetLanguages/>  */}
      <FormSelector />
    </MantineProvider>
  )
}

export default App
