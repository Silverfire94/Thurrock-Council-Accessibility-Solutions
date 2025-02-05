import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { TextBox, DropDown, MultipleAnswerQuestions } from './FormGenerator'
import './App.css'
import { GetLanguages } from './LanguagesDropDown'
import {questions} from "./SampleForm.json"
import Container from 'react-bootstrap/Container'


export function FormParser() {
    const [items, setItems] = useState([])


    useEffect(()=>{
      setItems(questions)
    },[])

  return (
    <Container className = "p-3">
    {
       items.map((item, index) => {
            if(item.type === "textbox"){
                return (
                    <TextBox key={item.id || index} question={item.question}/>
                )
            }
            if(item.type === "checkbox"){
                return (
                    <MultipleAnswerQuestions key={item.id || index}  question={item.question} answers={item.answers} type="checkbox"/>
                )
            }
            if(item.type === "radio"){
                return (
                    <MultipleAnswerQuestions key={item.id || index}  question={item.question} answers={item.answers} type="radio"/>
                )
            }
       })
    }
    </Container>
  )
}
