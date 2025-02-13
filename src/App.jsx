import FormSelector from './FormSelector'
import "./styles/styles.css";
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';






function App() {


  
  
  return (
    <div>
      
  

    

    <MantineProvider withGlobalStyles withNormalizeCSS>
    
      <FormSelector />
    </MantineProvider>
    
     
    </div>
   
    
  )
}

export default App
