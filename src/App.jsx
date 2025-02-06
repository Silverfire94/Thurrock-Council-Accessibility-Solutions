import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { GetLanguages } from './LanguagesDropDown'

import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';

function App() {
  const [count, setCount] = useState(0)
  
  return (
    <MantineProvider>
      <GetLanguages/> 
    </MantineProvider>
  )
}

export default App
