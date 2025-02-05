import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { TextBox, DropDown, MultipleAnswerQuestions } from './FormGenerator'
import './App.css'
import { GetLanguages } from './LanguagesDropDown'
import  {questions} from "./SampleForm.json"
import {FormParser} from "./FormParser"
// import "bootstrap/dist/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container'


function App() {
  const [count, setCount] = useState(0)
  



  return (
    <>
    {/* <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" integrity="sha256-2TnSHycBDAm2wpZmgdi0z81kykGPJAkiUY+Wf97RbvY=" crossorigin="anonymous"></link>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.min.js" integrity="sha256-gOQJIa9+K/XdfAuBkg2ONAdw5EnQbokw/s2b8BqsRFg=" crossorigin="anonymous"></script> */}

   
     

      <FormParser/>
    </>
  )
}

export default App
