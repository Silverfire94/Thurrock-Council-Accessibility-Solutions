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
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
{/* 
      <form>
        {}
        <TextBox question="What is your name?" />
        <DropDown question="What is your favorite color?" options={["Red", "Blue", "Green", "Yellow"]} /> 
        <MultipleAnswerQuestions question="What is your favorite color?" answers={["Red", "Blue", "Green", "Yellow"]} type="radio" />

        <input type = "submit"/>
      </form>

      <GetLanguages /> */}

      <FormParser/>
    </>
  )
}

export default App
