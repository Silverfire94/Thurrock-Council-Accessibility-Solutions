import FormSelector from './FormSelector'
import "./styles/styles.css";
import '@mantine/core/styles.css';
import Test from './Test'

import { MantineProvider } from '@mantine/core';

function App() {
  
  return (
    <>
      {/* <MantineProvider withGlobalStyles withNormalizeCSS>
        <FormSelector />
      </MantineProvider> */}
      <Test/>
    </>
  )
}

export default App
