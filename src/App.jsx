import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { TextBox, DropDown, MultipleAnswerQuestions } from './FormGenerator'
import './App.css'
import { GetLanguages } from './LanguagesDropDown'
import  {questions} from "./SampleForm.json"
import {FormParser} from "./FormParser"

function App() {
  const [count, setCount] = useState(0)
  
  return (
    <>
      <FormParser/>
    </>
  )
}

export default App
