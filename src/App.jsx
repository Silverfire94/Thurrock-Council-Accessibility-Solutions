import FormSelector from './FormSelector'
import "./styles/styles.css";
import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';

function App() {
  
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <FormSelector />
    </MantineProvider>
  )
}

export default App
