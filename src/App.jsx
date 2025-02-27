import NavLayout from './NavLayout'
import "./styles/styles.css";
import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';

function App() {
  
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <NavLayout />
    </MantineProvider>
  )
}

export default App
