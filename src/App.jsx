import FormSelector from './FormSelector'
import "./styles/styles.css";
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';






function App() {
  const callLambdaFunction = async (promptText) => {
    try {
        const response = await fetch("https://w1x9sft0lg.execute-api.eu-west-2.amazonaws.com/dev/simplify", {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ prompt: promptText }) // ✅ Send dynamic text
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Lambda Response:", data);
        return data; // ✅ Return response for further processing
    } catch (error) {
        console.error("Error calling Lambda:", error);
    }
};



const handleClick = () => {
  callLambdaFunction("What language do they speak in shrilanka");
};



// Call this function when needed, e.g., on a button click



  
  
  return (
    <div>
      <h1>Form Selector</h1>
    
           
      

    

    <MantineProvider withGlobalStyles withNormalizeCSS>
    <button onClick={handleClick}>Call AWS xwaguyxdweguyswqdguqswgyuisqw2gyuidw3qgidwqgiyqdwhidwqhgidwqghiqwdugidwqgiyqdgwhigwuiq</button>
      <FormSelector />
    </MantineProvider>

    
     
    </div>
   
    
  )
}

export default App
