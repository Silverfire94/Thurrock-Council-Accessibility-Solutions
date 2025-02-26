import FormSelector from './FormSelector'
import "./styles/styles.css";
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';






function App() {






// Call this function when needed, e.g., on a button click



  
  
  return (
    <div>
      <h1>Form Selector</h1>
    
           
      

    

    <MantineProvider withGlobalStyles withNormalizeCSS>

      <FormSelector />
    </MantineProvider>

    
     
    </div>
   
    
  )
}

export default App
